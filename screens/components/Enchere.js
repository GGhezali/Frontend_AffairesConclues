import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Enchere(props) {
  const user = useSelector((state) => state.user.value);

  let lastAcheteur = "";
    if (props.acheteur && props.acheteur.length > 0) {
      lastAcheteur = props.acheteur[props.acheteur.length - 1];
    }


  let titre = "";
  if (props.titre.length > 25) {
    titre = props.titre.substring(0, 25) + "...";
  } else {
    titre = props.titre;
  }

  let photo = props.photoUrl[0];
  if (props.photoUrl.length === 0 || props.photoUrl === undefined) {
    photo = "https://img.freepik.com/vecteurs-libre/illustration-icone-galerie_53876-27002.jpg"
  }

  let iconName = "clock-rotate-left";
  let iconeColor = "grey";
  let etatVente = "Enchère en cours";

  if (
    props.ongletActif === "terminees" &&
    props.isDone === true &&
    lastAcheteur.token === user.token
  ) {
    console.log(props.ongletActif);
    iconName = "check";
    iconeColor = "#39D996";
    etatVente = "Enchère gagnée";
  }
  if (
    props.ongletActif === "terminees" &&
    props.isDone === true &&
    lastAcheteur.token !== user.token
  ) {
    iconName = "xmark";
    iconeColor = "red";
    etatVente = "Enchère perdue";
  }

  return (
    <TouchableOpacity
      style={styles.enchere}
      onPress={() => props.navigation.navigate("Annonce", props)}
    >
      <View style={styles.leftContent}>
        <Text style={styles.titre}>{titre}</Text>
          <Image style={styles.picture} source={{uri: photo}} />
      </View>
      <View style={styles.rightContent}>
          <View style={styles.icon}>
            <Text>{etatVente} </Text>
            <FontAwesome6 name={iconName} size={20} color={iconeColor} />
          </View>
        <View style={styles.sellContent}>
            <Text>{props.timer}</Text>
        </View>
        <View style={styles.priceContent}>
          <Text>Prix de départ - {props.startPrice} €</Text>
          <Text>
            Prix en cours - {props.currentPrice} € - {lastAcheteur.username}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  enchere: {
    height: 210,
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
    width: "40%",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  picture: {
    width: 110,
    height: 130,
    borderRadius: 10,
    resizeMode: "contain",
  },
  titre: {
    textAlign: "left",
    fontWeight: "600",
    height: 40,
  },
  rightContent: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    width: "60%",
  },
  icon: {
    height: 20,
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
  },
  sellContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
  },

});
