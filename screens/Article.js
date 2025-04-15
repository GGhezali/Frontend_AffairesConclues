import React from "react";
import { Button, StyleSheet, View, Text, Image, TouchableOpacity, Platform, StatusBar  } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Article({ navigation }) {
  return (
    <TouchableOpacity
      title="Annonce"
      style={styles.annonce}
      onPress={() => navigation.navigate("Annonce")}
    >
      <Text style={styles.titre}>Titre de l'annonce</Text>
      <Image style={styles.picture} />
      <View style={styles.bookmarkContainer}>
        <View style={styles.bookmark}>
          <FontAwesome name={"bookmark-o"} size={25} color={"#39D996"}/>
        </View>
      </View>
      <View style={styles.description}>
        <Text>Prix €</Text>
        <View>
          <Text>Categorie</Text>
          <Text>Lieu de vente</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  annonce: {
    height: 300,
    width: 170,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#dcdedf",
    padding: 10,
    alignItems: "center",
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
  bookmark: {
    borderWidth: 1,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#39D996",
    backgroundColor: "white",
  },
  description: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 35,
  },
});
