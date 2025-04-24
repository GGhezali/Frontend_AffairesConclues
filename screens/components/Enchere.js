import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function Enchere(props) {
  const user = useSelector((state) => state.user.value);
  const [timeRemaining, setTimeRemaining] = useState("");

  let lastBuyer = "";
  if (props.acheteur && props.acheteur.length > 0) {
    lastBuyer = props.acheteur[props.acheteur.length - 1];
  }

  let titre = "";
  if (props.titre.length > 46) {
    titre = props.titre.substring(0, 46) + "...";
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

  const calculateTimeRemaining = () => {
    const now = new Date();
    const endTime = new Date(
      new Date(props.timer).getTime() + 24 * 60 * 60 * 1000
    ); // Add 24 hours to creation date
    const timeLeft = endTime.getTime() - now.getTime();

    if (timeLeft <= 0) {
      setTimeRemaining("Vente terminée");
      return;
    }

    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

    setTimeRemaining(`${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`);
  };

  useEffect(() => {
    calculateTimeRemaining(); // Initial calculation
    const interval = setInterval(calculateTimeRemaining, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [props.timer]);

  return (
    <TouchableOpacity
      style={styles.enchere}
      onPress={() => props.navigation.navigate("Annonce", props)}
    >
      <View style={styles.leftContent}>
        <Image style={styles.picture} source={{ uri: photo }} />
      </View>
      <View style={styles.rightContent}>
        <View style={styles.icon}>
          <View style={styles.iconTextContainer}>
            <Text style={styles.iconText}>{stateSale} </Text>
            <FontAwesome6 name={iconName} size={15} color={iconeColor} />
          </View>
        </View>
        <Text style={styles.titre}>{titre}</Text>
        <View style={styles.sellContent}>
          <Text style={styles.timer}>{timeRemaining}</Text>
        </View>
        <View style={styles.priceContent}>
          <View style={styles.priceRow}>
            <Text style={styles.textTitle}>Prix de départ : </Text>
            <Text style={styles.text}>{props.startPrice} €</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.textTitle}>Prix en cours : </Text>
            <Text style={styles.text}>{props.currentPrice} €</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.textTitle}>Dernière mise : </Text>
            <Text style={styles.text}>{lastBuyer.username}</Text>
          </View>
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
    borderRadius: 10,
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
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    resizeMode: "cover",
  },
  rightContent: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    width: "60%",
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderLeftWidth: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  icon: {
    height: 21,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginBottom: 5,
  },
  iconTextContainer: {
    backgroundColor: "#E5E5E5",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    
  },
  iconText: {
    fontSize: 10,
    fontWeight: "600",
    color: "grey",
  },
  sellContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "35%",
  },
  titre: {
    marginTop: 5,
    textAlign: "left",
    fontWeight: "600",
    height: 40,
  },
  timer: {
    fontSize: 13,
    fontWeight: "600",
    color: "#AA5042",
  },
  priceContent: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  textTitle: {
    fontSize: 13,
    fontWeight: "500",
    fontStyle: "italic",
  },
  text: {
    fontSize: 13,
    color: "#AA5042",
    fontStyle: "italic",

  },
});
