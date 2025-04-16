import React from "react";
import { Button, StyleSheet, View, Text, Image, TouchableOpacity, Platform, StatusBar  } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";

export default function Article(props) {
const [isBookmarked, setIsBookmarked] = useState(false);

let bookmarkIcon = <FontAwesome name={"bookmark-o"} size={25} color={"#39D996"} onPress={() => setIsBookmarked(!isBookmarked)}/>;
let bookmarkStyle = styles.notBookmarked

if (isBookmarked) {
  bookmarkIcon = <FontAwesome name={"bookmark"} size={20} color={"white"} onPress={() => setIsBookmarked(!isBookmarked)}/>;
  bookmarkStyle = styles.bookmarked
}

  return (
    <TouchableOpacity
      title="Annonce"
      style={styles.annonce}
      onPress={() => {props.navigation.navigate("Annonce", props)}}
    >
      <Text style={styles.titre}>{props.titre}</Text>
      <Image style={styles.picture} />
      <View style={styles.bookmarkContainer}>
        <TouchableOpacity style={bookmarkStyle}>
          {bookmarkIcon}
        </TouchableOpacity>
      </View>
      <View style={styles.description}>
        <Text>{props.currentPrice} €</Text>
        <View>
          <Text>{props.categorie.name}</Text>
          <Text>{props.localisation.adresse}</Text>
        </View>
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
    margin: 5
  },
  titre: {
    textAlign: "center",
    marginBottom: 10,
  },
  picture: {
    backgroundColor: "grey",
    width: "100%",
    height: "50%",
  },
  bookmarkContainer: {
    width: "100%",
    alignItems: "flex-end",
    margin: -20
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 35,
  },
});
