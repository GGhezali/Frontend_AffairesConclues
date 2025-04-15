import React from "react";
import { Button, StyleSheet, View, Text, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Article({ navigation }) {
  return (
    <View
      title="Annonce"
      style={styles.annonce}
      onPress={() => navigation.navigate("Annonce")}
    >
      <Text style={styles.titre}>Titre de l'annonce</Text>
      <Image style={styles.picture} />
      <View style={styles.bookmarkContainer}>
        <View style={styles.bookmark}>
          <FontAwesome name={"bookmark-o"} size={25} />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  annonce: {
    height: 300,
    width: 170,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 25,
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
  },
});
