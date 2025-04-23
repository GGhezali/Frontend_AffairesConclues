import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { useSelector } from "react-redux";

export default function Enchere(props) {
  const user = useSelector((state) => state.user.value);

  let lastBuyer = "";
  if (props.acheteur && props.acheteur.length > 0) {
    lastBuyer = props.acheteur[props.acheteur.length - 1];
  }

  let titre = "";
  if (props.titre.length > 25) {
    titre = props.titre.substring(0, 25) + "...";
  } else {
    titre = props.titre;
  }

  let photo = props.photoUrl[0];
  if (props.photoUrl.length === 0 || props.photoUrl === undefined) {
    photo =
      "https://img.freepik.com/vecteurs-libre/illustration-icone-galerie_53876-27002.jpg";
  }

  let iconName = "clock-rotate-left";
  let iconeColor = "grey";
  let stateSale = "Enchère en cours";

  if (
    props.activeTab === "terminees" &&
    props.isDone === true &&
    lastBuyer.token === user.token
  ) {
    iconName = "check";
    iconeColor = "#39D996";
    stateSale = "Enchère gagnée";
  }
  if (
    props.activeTab === "terminees" &&
    props.isDone === true &&
    lastBuyer.token !== user.token
  ) {
    iconName = "xmark";
    iconeColor = "red";
    stateSale = "Enchère perdue";
  }

  const convertTime = (time) => {
    const date = new Date(time);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleString("fr-FR", options);
  };

  return (
    <TouchableOpacity
      style={styles.enchere}
      onPress={() => props.navigation.navigate("Annonce", props)}
    >
      <View style={styles.leftContent}>
        <Text style={styles.titre}>{titre}</Text>
        <Image style={styles.picture} source={{ uri: photo }} />
      </View>
      <View style={styles.rightContent}>
        <View style={styles.icon}>
          <Text>{stateSale} </Text>
          <FontAwesome6 name={iconName} size={20} color={iconeColor} />
        </View>
        <View style={styles.sellContent}>
          <Text style={styles.text}>{convertTime(props.timer)}</Text>
        </View>
        <View style={styles.priceContent}>
          <Text style={styles.text}>Prix de départ - {props.startPrice} €</Text>
          <Text style={styles.text}>
            Prix en cours - {props.currentPrice} € Dernière mise -{" "}
            {lastBuyer.username}
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
  text: {
    fontSize: 13,
  },
});
