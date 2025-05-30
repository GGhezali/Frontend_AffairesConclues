import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  Alert,
} from "react-native";
import Headers from "./components/Headers";
import Modals from "./components/Modals";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ImageSlider from "react-native-image-slider";
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { addBookmark, removeBookmark } from "../reducers/bookmarks";

export default function AnnonceScreen({ route }) {
  const routeParams = route.params;
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [bidModalVisible, setBidModalVisible] = useState(false);
  const [price, setPrice] = useState(routeParams.currentPrice);
  const [buyer, setBuyer] = useState(null);
  const [userId, setUserId] = useState(null);
  const isFocused = useIsFocused();
  const user = useSelector((state) => state.user.value);
  const bookmarks = useSelector((state) => state.bookmarks.value);
  const dispatch = useDispatch();
  const [timeRemaining, setTimeRemaining] = useState("");
  const [timeLeftMs, setTimeLeftMs] = useState("");

  let photo = routeParams.photoUrl;
  if (routeParams.photoUrl.length === 0 || routeParams.photoUrl === undefined) {
    photo = [
      "https://img.freepik.com/vecteurs-libre/illustration-icone-galerie_53876-27002.jpg",
    ];
  }

  const toggleVendor = () => {
    if (!user.token) {
      Alert.alert("", "Veuillez vous connecter pour contacter le vendeur !");
    } else {
      setContactModalVisible(true);
    }
  };
  const toggleCloseVendor = () => {
    setContactModalVisible(false);
  };
  const toggleBid = () => {
    if (routeParams.isDone) {
      Alert.alert(
        "",
        "Cette annonce est terminée, vous ne pouvez plus enchérir !"
      );
      return;
    }

    if (!user.token) {
      Alert.alert("", "Veuillez vous connecter pour enchérir !");
    } else {
      setBidModalVisible(true);
    }
  };
  const toggleCloseBid = () => {
    setBidModalVisible(false);
  };

  const calculateTimeRemaining = () => {
    const now = new Date();
    const endTime = new Date(
      new Date(routeParams.timer).getTime() + 24 * 60 * 60 * 1000
    ); // Add 24 hours to creation date
    const timeLeft = endTime.getTime() - now.getTime();
    setTimeLeftMs(timeLeft);

    if (timeLeft <= 0) {
      setTimeRemaining("Vente terminée");
      return;
    }

    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

    setTimeRemaining(`${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`);
  };

  useEffect(() => {
    calculateTimeRemaining(); // Initial calculation
    const interval = setInterval(calculateTimeRemaining, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [routeParams.timer]);

  useEffect(() => {
    //------- fetch articles from the backend---------------------------
    fetch(`${BACKEND_ADDRESS}/articles/`)
      .then((response) => response.json())
      .then((articlesData) => {
        const articles = articlesData.data.find(
          (article) => article._id === routeParams._id
        );

        setPrice(articles.currentPrice);
        if (articles.acheteur.length > 0) {
          setBuyer(articles.acheteur[articles.acheteur.length - 1].username);
        }
      });
  }, [!bidModalVisible]);

  let bookmarkIcon = (
    <FontAwesome name={"bookmark-o"} size={25} color={"#753742"} />
  );
  let bookmarkStyle = styles.notBookmarked;

  if (bookmarks && bookmarks.some((article) => article === routeParams._id)) {
    bookmarkIcon = <FontAwesome name={"bookmark"} size={20} color={"white"} />;
    bookmarkStyle = styles.bookmarked;
  }

  useEffect(() => {
    (async () => {
      // Fetch useurId from the backend -------------------------------
      const userIdResponse = await fetch(
        `${BACKEND_ADDRESS}/users/findUserIdByToken`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: user.token,
          }),
        }
      );
      const userIdData = await userIdResponse.json();
      setUserId(userIdData.userId);
      // --------------------------------------------------------------
    })();
  }, [isFocused]);

  const handleBookmark = async () => {
    if (user.token) {
      const bookmarkResponse = await fetch(
        `${BACKEND_ADDRESS}/users/updateBookmark/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            articleId: routeParams._id,
          }),
        }
      );
      const bookmarkData = await bookmarkResponse.json();
      if (bookmarkData.result) {
        if (bookmarkData.message === "Article ajouté aux favoris.") {
          dispatch(addBookmark(routeParams._id));
        } else if (bookmarkData.message === "Article retiré des favoris.") {
          dispatch(removeBookmark(routeParams._id));
        }
      } else {
        Alert.alert("Attention", bookmarkData.error);
      }
    } else {
      Alert.alert(
        "Notification",
        "Veuillez vous connecter pour ajouter un article aux favoris."
      );
    }
  };

  let timerStyle = styles.timer;

  if (timeLeftMs < 3600000) {
    timerStyle = { ...styles.timer, color: "red" };
  }

  return (
    <SafeAreaView style={styles.safeareaview}>
      {/* Ajout d'un header qui envoie vers le component "Header" les routeParams navigation, isReturn et title */}
      <Headers
        navigation={route.params.navigation}
        isReturn={true}
        title={"Annonce"}
      />
      <ScrollView style={styles.scrollview}>
        <View style={styles.container}>
          <Text style={styles.title}>{routeParams.titre}</Text>
          <View style={styles.pictureContainer}>
            <ImageSlider
              images={photo}
              style={styles.slider}
              customSlide={({ index, item, style, width }) => (
                // It's important to put style here because it's got offset inside
                <View key={index} style={[style, styles.pictureSlider]}>
                  <Image source={{ uri: item }} style={styles.picture} />
                </View>
              )}
              customButtons={(position, move) => (
                <View style={styles.buttons}>
                  {photo.map((photo, index) => {
                    return (
                      <TouchableHighlight
                        key={index}
                        underlayColor="#ccc"
                        onPress={() => move(index)}
                        style={styles.button}
                      >
                        <Text
                          style={position === index && styles.buttonSelected}
                        ></Text>
                      </TouchableHighlight>
                    );
                  })}
                </View>
              )}
            />
            <View style={styles.iconContainer}>
              <TouchableOpacity style={styles.icon}>
                <FontAwesome
                  name={"map"}
                  size={25}
                  color={"#753742"}
                  onPress={() =>
                    route.params.navigation.navigate(
                      "Carte",
                      routeParams.localisation
                    )
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={bookmarkStyle}
                onPress={() => handleBookmark()}
              >
                {bookmarkIcon}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.informationContainer}>
            <View style={styles.textInfo}>
              <Text style={styles.textParams}>Auteur:</Text>
              <Text style={styles.description}> {routeParams.auteur.name}</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textParams}>Editeur:</Text>
              <Text style={styles.description}>
                
                {routeParams.editeur.name}
              </Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textParams}>Categorie:</Text>
              <Text style={styles.description}>
                
                {routeParams.categorie.name}
              </Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textParams}>Etat:</Text>
              <Text style={styles.description}>
                
                {routeParams.etat.condition}
              </Text>
            </View>

            <View style={styles.textInfoDescription}>
              <Text style={styles.textParams}>Description:</Text>
              <Text style={styles.description}>{routeParams.description}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceInfoLeft}>Prix de départ:</Text>
              <Text style={styles.priceInfo}> {routeParams.startPrice} €</Text>
              <Text style={styles.priceInfoRight}>
                <Text style={styles.priceInfoLeft}>Vendu par:</Text>
                {routeParams.annonceur.username}
              </Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceInfoLeft}>Prix actuel:</Text>
              <Text style={styles.priceInfo}> {price} €</Text>
              <Text style={styles.priceInfoRight}>
                <Text style={styles.priceInfoLeft}>Dernière mise:</Text> {buyer}
              </Text>
            </View>
          </View>
          <View style={styles.timerContainer}>
            <Text style={timerStyle}>Temps restant</Text>
            <Text style={timerStyle}>{timeRemaining}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonContact}
              onPress={() => toggleVendor()}
            >
              <Text style={styles.buttonTextContact}>Contacter le vendeur</Text>
            </TouchableOpacity>
            <Modals
              contactVendor={true}
              visibleContact={contactModalVisible}
              onCloseContact={toggleCloseVendor}
              announceurInfo={routeParams.annonceur}
            />
            <TouchableOpacity
              style={styles.buttonBid}
              onPress={() => toggleBid()}
            >
              <Text style={styles.buttonTextBid}>Faire une enchère</Text>
            </TouchableOpacity>
            <Modals
              bid={true}
              visibleBid={bidModalVisible}
              toggleCloseBid={toggleCloseBid}
              onCloseBid={toggleCloseBid}
              articleId={routeParams._id}
              price={routeParams.currentPrice}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    backgroundColor: "#FFF8EF",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollview: {
    flex: 1,
  },
  container: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  slider: {
    width: "100%",
    backgroundColor: "#EDE1D4",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginHorizontal: 10,
    marginVertical: 20,
    height: 10,
    width: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
  },
  buttonSelected: {
    backgroundColor: "#753742",
    height: 10,
    width: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  pictureContainer: {
    width: "100%",
    height: 500,
    alignItems: "center",
    justifyContent: "center",
  },
  pictureSlider: {
    height: "100%",
    resizeMode: "center",
    justifyContent: "center",
  },
  picture: {
    height: "88%",
    resizeMode: "center",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "90%",
    marginTop: -55,
    marginBottom: 20,
  },
  icon: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#753742",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  informationContainer: {
    width: "90%",
    marginBottom: 20,
  },
  textInfo: {
    flexDirection: "row",
    marginBottom: 5,
  },
  textInfoDescription: {
    marginBottom: 5,
  },
  textParams: {
    fontWeight: 500,
    textDecorationLine: "underline",
  },
  description: {
    fontSize: 14,
    color: "grey",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginBottom: 5,
  },
  priceInfoLeft: {
    width: 100,
    textAlign: "left",
    fontWeight: 500,
    textDecorationLine: "underline",
  },
  priceInfo: {
    width: 70,
    textAlign: "center",
  },
  priceInfoRight: {
    width: 200,
    textAlign: "left",
    marginLeft: 20,
  },
  timerContainer: {
    width: "65%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  timer: {
    color: "#AA5042",
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 50,
  },
  buttonContact: {
    width: "45%",
    height: 50,
    backgroundColor: "#AA5042",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#dcdedf",
  },
  buttonBid: {
    width: "45%",
    height: 50,
    backgroundColor: "#AA5042",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#dcdedf",
  },
  buttonTextContact: {
    color: "white",
  },
  buttonTextBid: {
    color: "white",
  },
  notBookmarked: {
    borderWidth: 1,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#753742",
    backgroundColor: "white",
  },
  bookmarked: {
    borderWidth: 1,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#753742",
    backgroundColor: "#753742",
  },
});
