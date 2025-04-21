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

export default function Article(props) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  let titre = ""
  if (props.titre && props.titre.length > 40) {
    titre = props.titre.substring(0, 40) + "...";
  } else {
    titre = props.titre;
  }

  let photo = props.photoUrl[0];
  if (props.photoUrl.length === 0) {
    photo = "https://img.freepik.com/vecteurs-libre/illustration-icone-galerie_53876-27002.jpg"
  }

  let bookmarkIcon = (
    <FontAwesome
      name={"bookmark-o"}
      size={25}
      color={"#39D996"}
      onPress={() => setIsBookmarked(!isBookmarked)}
    />
  );
  let bookmarkStyle = styles.notBookmarked;

  if (isBookmarked) {
    bookmarkIcon = (
      <FontAwesome
        name={"bookmark"}
        size={20}
        color={"white"}
        onPress={() => setIsBookmarked(!isBookmarked)}
      />
    );
    bookmarkStyle = styles.bookmarked;
  }

  return (
    <TouchableOpacity
      title="Annonce"
      style={styles.annonce}
      onPress={() => {
        props.navigation.navigate("Annonce", props);
      }}
    >
      <Text style={styles.titre}>{titre}</Text>
      <Image style={styles.picture} source={{uri: photo}} />
      <View style={styles.bookmarkContainer}>
        <TouchableOpacity style={bookmarkStyle}>
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
    margin: 5,
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
