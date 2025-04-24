import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { updateBookmark } from "../../reducers/bookmarks";

export default function Article(props) {
  const [bookmarkedColor, setBookmarkedColor] = useState(false);
  const [userId, setUserId] = useState(null);
  const isFocused = useIsFocused();
  const user = useSelector((state) => state.user.value);
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;
  const dispatch = useDispatch();

  let title = "";
  if (props.titre && props.titre.length > 20) {
    title = props.titre.substring(0, 20) + "...";
  } else {
    title = props.titre;
  }

  let photo = props.photoUrl[0];
  if (props.photoUrl.length === 0 || props.photoUrl === undefined) {
    photo =
      "https://img.freepik.com/vecteurs-libre/illustration-icone-galerie_53876-27002.jpg";
  }

  useEffect(() => {
    (async () => {
      // Fetch useurId from the backend -------------------------------
      const userIdResponse = await fetch(
        `${BACKEND_ADDRESS}:3000/users/findUserIdByToken`,
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
      //Fetch les articlesID des bookmarks de l'utilisateur
      const articlesIdResponse = await fetch(
        `${BACKEND_ADDRESS}:3000/users/getBookmarks/${userIdData.userId}`
      );
      const articlesIdData = await articlesIdResponse.json();
      dispatch(updateBookmark(articlesIdData.bookmarks));
      //check if the article is bookmarked
      const isBookmarked = articlesIdData.bookmarks.some(
        (article) => article === props._id
      );
      if (isBookmarked) {
        setBookmarkedColor(true);
      } else {
        setBookmarkedColor(false);
      }
    })();
  }, [isFocused, bookmarkedColor]);

  let bookmarkIcon = (
    <FontAwesome name={"bookmark-o"} size={25} color={"#753742"} />
  );
  // Style for the bookmark icon
  // If the article is bookmarked, change the icon and style
  let bookmarkStyle = styles.notBookmarked;
  if (bookmarkedColor) {
    bookmarkIcon = <FontAwesome name={"bookmark"} size={20} color={"white"} />;
    bookmarkStyle = styles.bookmarked;
  }

  // If the screen is "Mes Publications", change the bookmark icon to a trash can
  let icon = (
    <TouchableOpacity style={bookmarkStyle} onPress={() => handleBookmark()}>
      {bookmarkIcon}
    </TouchableOpacity>
  );
  if (props.isPublication) {
    icon = (
      <TouchableOpacity onPress={() => alertSuppresion()} style={styles.trash}>
        <FontAwesome name={"trash"} size={20} color={"#753742"} />
      </TouchableOpacity>
    );
  }

  const handleBookmark = async () => {
    if (user.token) {
      setBookmarkedColor(!bookmarkedColor);

      const bookmarkResponse = await fetch(
        `${BACKEND_ADDRESS}:3000/users/updateBookmark/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            articleId: props._id,
          }),
        }
      );
      await bookmarkResponse.json();

      dispatch(updateBookmark(props._id));
    } else {
      Alert.alert(
        "Attention",
        "Veuillez vous connecter pour ajouter un article aux favoris."
      );
    }
    props.refreshOnBookmark(props._id);
  };

  const alertSuppresion = () => {
    Alert.alert("Suppression", "Voulez vous vraiment supprimer cet article ?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteOnClick() },
    ]);
  };

  const deleteOnClick = async () => {
    await fetch(`${BACKEND_ADDRESS}:3000/articles/deleteArticle/${props._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    props.refresherOnDelete(props._id);
  };

  return (
    <TouchableOpacity
      title="Annonce"
      style={styles.annonce}
      onPress={() => {
        props.navigation.navigate("Annonce", props);
      }}
    >
      <View style={styles.topContainer}>
        <Image style={styles.picture} source={{ uri: photo }} />
      </View>
      <View style={styles.botContainer}>
        <View style={styles.iconContainer}>{icon}</View>
        <View style={styles.information}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.description}>
            <Text style={styles.descriptionText}>{props.auteur.name}</Text>
              <Text style={styles.descriptionTextGrey}>{props.categorie.name}</Text>
            <View style={styles.bookStatus}>
            <Text style={styles.descriptionTextGrey}>{props.etat.condition}</Text>
              <Text style={styles.descriptionText}>{props.currentPrice} €</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  annonce: {
    height: 350,
    width: 170,
    borderRadius: 25,
    borderTopLeftRadius: 25,
    alignItems: "center",
    marginHorizontal: 5,
    marginBottom: 20,
  },
  topContainer: {
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  picture: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  botContainer: {
    width: "100%",
    height: "30%",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#DCDEDF",
    backgroundColor: "white",
  },
  iconContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: -35,
    marginRight: 10,
  },
  notBookmarked: {
    borderWidth: 1,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#753742",
    backgroundColor: "white",
  },
  bookmarked: {
    borderWidth: 1,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#753742",
    backgroundColor: "#753742",
  },
  information: {
    width: "100%",
    height: "90%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginLeft: 10,
    marginTop: -20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "35%",
    width: "72%",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
    width: "80%",
  },
  trash: {
    borderWidth: 1,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#753742",
    backgroundColor: "white",
  },
  description: {
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  bookStatus: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  descriptionText: {
    fontSize: 11,
    color: "#753742",
    fontWeight: "bold",
    marginBottom: 5,
  },
  descriptionTextGrey: {
    fontSize: 11,
    color: "#753742",
    marginBottom: 5,
  }
});
