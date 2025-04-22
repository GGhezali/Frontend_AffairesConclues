import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Headers from "./components/Headers";
import Modals from "./components/Modals";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ImageSlider from 'react-native-image-slider';
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function AnnonceScreen({ route }) {
  const routeParams = route.params;
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;
  
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [miseModalVisible, setMiseModalVisible] = useState(false);
  const [price, setPrice] = useState(routeParams.currentPrice);
  const [buyer, setBuyer] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const isFocused = useIsFocused();
  
  const user = useSelector((state) => state.user.value);
  
  let photo = routeParams.photoUrl;
  if (routeParams.photoUrl.length === 0 || routeParams.photoUrl === undefined) {
    photo = ["https://img.freepik.com/vecteurs-libre/illustration-icone-galerie_53876-27002.jpg"]
  }

  const toggleVendeur = () => {
      setContactModalVisible(true);
  };
  const toggleCloseVendeur = () => {
      setContactModalVisible(false);
  };
  const toggleMise = () => {
    if (routeParams.isDone) {
      alert("Cette annonce est terminée, vous ne pouvez plus enchérir !")
      return;
    }
    setMiseModalVisible(true);
  };
  const toggleCloseMise = () => {
    setMiseModalVisible(false);
  };

  useEffect(() => {
      //------- fetch articles from the backend---------------------------
      fetch(`${BACKEND_ADDRESS}:3000/articles/`)
      .then((response) => response.json())
      .then((articlesData) => {
        const articles = articlesData.data.find(article => article._id === routeParams._id)
        
        setPrice(articles.currentPrice);
        if (articles.acheteur.length > 0) {
          setBuyer(articles.acheteur[articles.acheteur.length - 1].username);
        }
        ;})
  },[!miseModalVisible]);

let bookmarkIcon = (
    <FontAwesome name={"bookmark-o"} size={25} color={"#39D996"} />
  );
let bookmarkStyle = styles.notBookmarked;

  if (isBookmarked) {
    bookmarkIcon = <FontAwesome name={"bookmark"} size={20} color={"white"} />;
    bookmarkStyle = styles.bookmarked;
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
          <ImageSlider images={photo} customSlide={({ index, item, style, width }) => (
            // It's important to put style here because it's got offset inside
            <View key={index} style={[style, styles.pictureSlider]}>
              <Image source={{ uri: item }} style={styles.picture} />
            </View>
          )}/>
            <View style={styles.iconContainer}>
              <TouchableOpacity style={styles.icon}>
                <FontAwesome
                  name={"map"}
                  size={25}
                  color={"#39D996"}
                  onPress={() => route.params.navigation.navigate("Carte", routeParams.localisation)}
                />
              </TouchableOpacity>
              <TouchableOpacity style={bookmarkStyle}>
               {bookmarkIcon}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.informationContainer}>
            <View style={styles.textInfo}>
              <Text style={styles.textParams}>Etat</Text>
              <Text style={styles.description}> : {routeParams.etat.condition}</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textParams}>Categorie</Text>
              <Text style={styles.description}> : {routeParams.categorie.name}</Text>
            </View>
            <View style={styles.textInfoDescription}>
              <Text style={styles.textParams}>Description</Text>
              <Text style={styles.description}>{routeParams.description}</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textParams}>Auteur</Text>
              <Text style={styles.description}> : {routeParams.auteur.name}</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textParams}>Editeur</Text>
              <Text style={styles.description}> : {routeParams.editeur.name}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceInfoLeft}>Prix de départ :</Text>
              <Text style={styles.priceInfo}>{routeParams.startPrice} €</Text>
              <Text style={styles.priceInfoRight}>
                {routeParams.annonceur.username}
              </Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceInfoLeft}>Prix actuel :</Text>
              <Text style={styles.priceInfo}>{price} €</Text>
              <Text style={styles.priceInfoRight}>
                {buyer}
              </Text>
            </View>
          </View>
          <View style={styles.timerContainer}>
            <Text style={styles.timer}>{routeParams.timer}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonContact} onPress={() => toggleVendeur()}>
              <Text style={styles.buttonTextContact}>Contacter le vendeur</Text>
            </TouchableOpacity>
            <Modals contactVendeur={true} visibleContact={contactModalVisible} onCloseContact={toggleCloseVendeur} annonceurInfo={routeParams.annonceur} />
            <TouchableOpacity style={styles.buttonBid} onPress={() => toggleMise()}>
              <Text style={styles.buttonTextBid}>Faire une enchère</Text>
            </TouchableOpacity>
            <Modals mise={true} visibleMise={miseModalVisible} onCloseMise={toggleCloseMise} articleId={routeParams._id} price={routeParams.currentPrice} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollview: {
    flex: 1,
    backgroundColor: "#F5FCEE",
  },
  container: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5FCEE",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  pictureContainer: {
    width: "100%",
    height: 500,
    marginBottom: 20,
    alignItems: "center",
  },
  pictureSlider: {
    height: "100%",
  },
  picture: {
    height: "88%",
    resizeMode: "contain",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  icon: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#39D996",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  informationContainer: {
    width: "100%",
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
    justifyContent: "space-between",
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
    width: 50,
    textAlign: "right"
  },
  priceInfoRight: {
    width: 100,
    textAlign: "right",
  },
  timerContainer: {
    width: "65%",
    height: 50,
    backgroundColor: "#B1CF5F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#dcdedf",
    marginBottom: 20,
  },
  timer: {
    color: "grey",
    fontSize: 18,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 50,
  },
  buttonContact: {
    width: "45%",
    height: 50,
    backgroundColor: "#A0D9C1",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#dcdedf",
  },
  buttonBid: {
    width: "45%",
    height: 50,
    backgroundColor: "#1C7C54",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#dcdedf",
  },
  buttonTextContact: {
    color: "#1B512D",
  },
  buttonTextBid: {
    color: "white",
  },
  notBookmarked: {
    borderWidth: 1,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#39D996",
    backgroundColor: "white",
  },
  bookmarked: {
    borderWidth: 1,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#39D996",
    backgroundColor: "#39D996",
  },
});
