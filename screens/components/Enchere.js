import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

// Composant principal "Enchere" qui représente une enchère spécifique
export default function Enchere(props) {
  // On récupère les données de l'utilisateur actuel depuis le store (gestion d'état globale)
  const user = useSelector((state) => state.user.value);

  // Déclaration de l'état "timeRemaining" qui indiquera le temps restant de l'enchère
  const [timeRemaining, setTimeRemaining] = useState("");

  // Variable pour savoir qui a acheté l'objet (le dernier acheteur)
  let lastBuyer = "";
  if (props.acheteur && props.acheteur.length > 0) {
    // Si la liste des acheteurs n'est pas vide, on prend le dernier acheteur
    lastBuyer = props.acheteur[props.acheteur.length - 1];
  }

  // On prépare le titre de l'enchère. Si le titre est trop long, on le tronque.
  let titre = "";
  if (props.titre.length > 46) {
    // Si le titre est plus long que 46 caractères, on le tronque et on ajoute des points de suspension
    titre = props.titre.substring(0, 46) + "...";
  } else {
    // Sinon, on garde le titre tel quel
    titre = props.titre;
  }

  // On prend la première photo de l'enchère (photoUrl est un tableau)
  let photo = props.photoUrl[0];
  // Si aucune photo n'est présente, on met une image par défaut
  if (props.photoUrl.length === 0 || props.photoUrl === undefined) {
    photo = "https://img.freepik.com/vecteurs-libre/illustration-icone-galerie_53876-27002.jpg";
  }

  // Par défaut, l'icône indiquant l'état de l'enchère est une horloge
  let iconName = "clock-rotate-left";
  let iconeColor = "grey";
  let stateSale = "Enchère en cours";

  // Si l'enchère est terminée et que l'utilisateur actuel est l'acheteur, on met l'icône "check" (gagnée)
  if (
    props.activeTab === "terminees" &&
    props.isDone === true &&
    lastBuyer.token === user.token
  ) {
    iconName = "check"; // Icône pour une enchère gagnée
    iconeColor = "#39D996"; // Couleur verte pour signaler la victoire
    stateSale = "Enchère gagnée"; // Texte pour indiquer que l'utilisateur a gagné
  }
  // Si l'enchère est terminée et que l'utilisateur actuel n'est pas l'acheteur, on met l'icône "xmark" (perdue)
  if (
    props.activeTab === "terminees" &&
    props.isDone === true &&
    lastBuyer.token !== user.token
  ) {
    iconName = "xmark"; // Icône pour une enchère perdue
    iconeColor = "red"; // Couleur rouge pour signaler la défaite
    stateSale = "Enchère perdue"; // Texte pour indiquer que l'utilisateur a perdu
  }

  // Fonction pour calculer le temps restant avant la fin de l'enchère
  const calculateTimeRemaining = () => {
    const now = new Date(); // Heure actuelle
    const endTime = new Date(
      new Date(props.timer).getTime() + 24 * 60 * 60 * 1000
    ); // On ajoute 24 heures à la date de début de l'enchère (props.timer)
    const timeLeft = endTime.getTime() - now.getTime(); // Différence entre la fin et l'heure actuelle

    // Si le temps restant est inférieur ou égal à 0, cela signifie que l'enchère est terminée
    if (timeLeft <= 0) {
      setTimeRemaining("Vente terminée");
      return;
    }

    // Sinon, on calcule les heures, minutes et secondes restantes
    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // On met à jour l'état avec le temps restant sous la forme "Xh Ym Zs"
    setTimeRemaining(`${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`);
  };

  // useEffect est utilisé pour mettre à jour le temps restant toutes les secondes
  useEffect(() => {
    calculateTimeRemaining(); // Calcul initial du temps restant
    const interval = setInterval(calculateTimeRemaining, 1000); // On met à jour chaque seconde

    // Cleanup de l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, [props.timer]); // Cette fonction sera appelée à chaque changement de la prop "timer"

  // Le rendu du composant Enchere
  return (
    <TouchableOpacity
      style={styles.enchere} // Style pour l'enchère
      onPress={() => props.navigation.navigate("Annonce", props)} // Quand l'utilisateur clique, il est redirigé vers l'annonce
    >
      <View style={styles.leftContent}> {/* Contenu à gauche de l'enchère (image) */}
        <Image style={styles.picture} source={{ uri: photo }} /> {/* Affichage de l'image de l'enchère */}
      </View>
      <View style={styles.rightContent}> {/* Contenu à droite de l'enchère (texte et détails) */}
        <View style={styles.icon}> {/* Icône de l'état de l'enchère */}
          <View style={styles.iconTextContainer}> {/* Conteneur pour le texte et l'icône */}
            <Text style={styles.iconText}>{stateSale} </Text>
            <FontAwesome6 name={iconName} size={15} color={iconeColor} /> {/* Icône dynamique (check, xmark, etc.) */}
          </View>
        </View>
        <Text style={styles.titre}>{titre}</Text> {/* Titre de l'enchère */}
        <View style={styles.sellContent}> {/* Contenu de la vente */}
          <Text style={styles.timer}>{timeRemaining}</Text> {/* Temps restant de l'enchère */}
        </View>
        <View style={styles.priceContent}> {/* Contenu des prix */}
          <View style={styles.priceRow}> {/* Ligne de prix */}
            <Text style={styles.textTitle}>Prix de départ : </Text>
            <Text style={styles.text}>{props.startPrice} €</Text> {/* Prix de départ de l'enchère */}
          </View>
          <View style={styles.priceRow}> {/* Ligne de prix actuel */}
            <Text style={styles.textTitle}>Prix en cours : </Text>
            <Text style={styles.text}>{props.currentPrice} €</Text> {/* Prix actuel de l'enchère */}
          </View>
          <View style={styles.priceRow}> {/* Dernière mise */}
            <Text style={styles.textTitle}>Dernière mise : </Text>
            <Text style={styles.text}>{lastBuyer.username}</Text> {/* Nom du dernier acheteur */}
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
