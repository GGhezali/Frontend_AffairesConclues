import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";

// On reçoit les données de l'enchère via la prop `data`
export default function Enchere({ navigation, data }) {
  return (
    <TouchableOpacity
      style={styles.enchere}
      onPress={() => navigation.navigate("Annonce", { article: data })} // On envoie les infos à la page Annonce
    >
      <View style={styles.leftContent}>
        {/* Image du livre (ou image grise par défaut si absente) */}
        <Image
          alt="photo du livre"
          style={styles.picture}
          source={{ uri: data.photo || "https://via.placeholder.com/110x130" }}
        />
        {/* Titre du livre */}
        <Text>{data.titre}</Text>
      </View>

      <View style={styles.rightContent}>
        <View style={styles.sellContent}>
          <View style={styles.sellState}>
            {/* Vente en cours ou terminée */}
            <Text style={{ fontWeight: "bold" }}>
              {data.isDone ? "Vente terminée" : "Vente en cours"}
            </Text>
            {/* Affiche "Temps restant" seulement si la vente est en cours */}
            {!data.isDone && <Text>Temps restant : à calculer</Text>}
          </View>
          {/*  Icône verte de validation */}
          <FontAwesome name={"check"} size={20} color={"#39D996"} />
        </View>

        <View style={styles.priceContent}>
          {/* Prix de départ */}
          <Text>Prix de départ : {data.prixDepart} €</Text>
          {/*  Prix actuel + pseudo du dernier acheteur (ou "aucun" si personne) */}
          <Text>
            Prix actuel : {data.prixActuel} € -{" "}
            {data.dernierAcheteur ? data.dernierAcheteur.pseudo : "aucun"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  enchere: {
    height: 200,
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#dcdedf",
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },
  leftContent: {
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  picture: {
    backgroundColor: "grey",
    width: 110,
    height: 130,
    borderRadius: 10,
  },
  rightContent: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  sellContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
