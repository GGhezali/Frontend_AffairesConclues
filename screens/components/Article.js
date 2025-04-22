import React from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
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
  const [articleBookmark, setArticleBookmark] = useState(false);

  const user = useSelector((state) => state.user.value);
  const bookmarks = useSelector((state) => state.bookmarks.value);
  console.log("bookmarks", bookmarks);
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;
  const dispatch = useDispatch();

  let titre = "";
  if (props.titre && props.titre.length > 40) {
    titre = props.titre.substring(0, 40) + "...";
  } else {
    titre = props.titre;
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
      setArticleBookmark(isBookmarked);
      if (isBookmarked) {
        setBookmarkedColor(true);
      } else {
        setBookmarkedColor(false);
      }
    })();
  }, [isFocused, bookmarkedColor]);

  let bookmarkIcon = (
    <FontAwesome name={"bookmark-o"} size={25} color={"#39D996"} />
  );
  let bookmarkStyle = styles.notBookmarked;

  if (bookmarkedColor) {
    bookmarkIcon = <FontAwesome name={"bookmark"} size={20} color={"white"} />;
    bookmarkStyle = styles.bookmarked;
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
      const bookmarkData = await bookmarkResponse.json();

      dispatch(updateBookmark(props._id));
    }
    else {
      alert("Veuillez vous connecter pour ajouter un article aux favoris.");
    }
  };

  return (
    <TouchableOpacity
      title="Annonce"
      style={styles.annonce}
      onPress={() => {
        props.navigation.navigate("Annonce", props);
      }}
    >
      <Text style={styles.titre}>{titre}</Text>
      <Image style={styles.picture} source={{ uri: photo }} />
      <View style={styles.bookmarkContainer}>
        <TouchableOpacity
          style={bookmarkStyle}
          onPress={() => handleBookmark()}
        >
          {bookmarkIcon}
        </TouchableOpacity>
      </View>
      <View style={styles.description}>
        <Text>{props.categorie.name}</Text>
        <Text>{props.etat.condition}</Text>
        <Text>{props.currentPrice} €</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  annonce: {
    height: 280,
    width: 170,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#dcdedf",
    padding: 10,
    alignItems: "center",
    margin: 8,
  },
  titre: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "bold",
    height: "15%",
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "left",
  },
  picture: {
    width: "90%",
    height: "55%",
    resizeMode: "contain",
  },
  bookmarkContainer: {
    width: "100%",
    alignItems: "flex-end",
    margin: -20,
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
  description: {
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 5,
  },
  information: {
    width: "50%",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
});
