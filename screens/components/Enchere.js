import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Enchere(props) {
  const user = useSelector((state) => state.user.value);
console.log(user)
console.log(props.acheteur.token)

  let titre = ""
  if (props.titre.length > 20) {
    titre = props.titre.substring(0, 20) + "...";
  } else {
    titre = props.titre;
  }

let iconName = "clock-rotate-left"

if (props.ongletActif === "terminees" && props.isDone === true && props.acheteur.token === user.token) {
  iconName = "check"
}
else {
  iconName = "xmark"
}

  return (
    <TouchableOpacity
      style={styles.enchere}
      onPress={() => props.navigation.navigate("Annonce")}
    >
      <View style={styles.leftContent}>
        <Image alt="picture" style={styles.picture} />
        <Text style={styles.titre}>{titre}</Text>
      </View>
      <View style={styles.rightContent}>
        <View style={styles.sellContent}>
          <View style={styles.sellState}>
            <Text>Vente en cours</Text>
            <Text>{props.timer}</Text>
          </View>
          <FontAwesome6 name={iconName} size={20} color={"#39D996"} />
        </View>
        <View style={styles.priceContent}>
          <Text>{props.startPrice} €</Text>
          <Text>{props.currentPrice} € - {props.acheteur.username}</Text>
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
    alignItems: "flex-start",
  },
  picture: {
    backgroundColor: "grey",
    width: 110,
    height: 130,
    borderRadius: 10,
  },
  titre: {
    textAlign: "left",
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
