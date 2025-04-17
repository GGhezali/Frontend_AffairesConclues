import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Headers from "./components/Headers";
import Enchere from "./components/Enchere";

import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function MesEncheresScreen({ navigation }) {
  //Onglet a selectinné 'enCours'

  const [ongletActif, setOngletActif] = useState("enCours");
  const [nbArticles, setNbArticles] = useState(2);
  const [total, setTotal] = useState(18);

  //Accéder au token dans Redux
  const user = useSelector((state) => state.user.value);
  // Fonction appelée quand on clique sur "Ventes en cours"
  const handleEnCours = () => {
    setOngletActif("enCours");
  };

  // Fonction appelée quand on clique sur "Ventes terminées"
  const handleTerminees = () => {
    setOngletActif("terminees");
  };

  //Rediriger si pas connecté
  useEffect(() => {
    if (!user.token) {
      navigation.navigate("Connexion"); // ou "Connexion/Inscription" selon ton nom de screen
    }
  }, []);

  return (
    <SafeAreaView style={styles.safeareaview}>
      {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title */}

      <Headers navigation={navigation} isReturn={true} title={"Mes Favoris"} />
      <View style={styles.container}>
        

        <View style={styles.content}>
          
        </View>
        <ScrollView style={styles.scrollview}>
          <View style={styles.encheres}>
            <Enchere navigation={navigation} />
          </View>
        </ScrollView>
        <View style={styles.separator} />
        <View style={styles.total}>
          <Text style={styles.text}>Nombre d'articles : {nbArticles}</Text>
        </View>
        <TouchableOpacity
          title="Continuer mes achats"
          onPress={() =>
            navigation.navigate("TabNavigator", { screen: "Acceuil" })
          }
        >
          <Text style={styles.greenButtonText}>Continuer mes achats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#F5FCEE",
    alignItems: "center",
    padding: 20,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 10,
  },
  greenButton: {
    backgroundColor: "#27AE60",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginHorizontal: 8,
    minWidth: 130,
    alignItems: "center",
  },
  greenButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  content: {
    marginTop: 20,
    width: "100%",
  },
  scrollview: {
    flex: 1,
    width: "100%",
  },
  encheres: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: "100%",
    padding: 10,
  },
  separator: {
    height: 4, // épaisseur de la ligne
    backgroundColor: "black", // couleur vive (bleu iOS)
    marginVertical: 50,
    borderRadius: 10, // espace autour de la ligne
    width: "90%", // occupe toute la largeur
  },
  total: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
