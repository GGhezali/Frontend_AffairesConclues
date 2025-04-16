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
  // on stocke un tableau d'enchères ici
  const [mesEncheres, setMesEncheres] = useState([]);

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

  useEffect(() => {
    if (user.token) {
      fetchEncheres(); // Appel de la fonction quand on change d’onglet
    }
  }, [ongletActif]); // déclenché quand ongletActif change

  // Fonction qui va chercher les enchères de l'utilisateur selon l'onglet sélectionné
  const fetchEncheres = () => {
    // URL de base vers  backend
    const baseUrl = "http://<TON_IP>:3000/articles";

    // Choix de la route selon l'onglet actif
    let route = "";
    if (ongletActif === "enCours") {
      route = `/open/${user._id}`;
    } else {
      route = `/closed/${user._id}`;
    }

    // Appel à l'API
    fetch(baseUrl + route)
      .then((response) => response.json()) // conversion de la réponse en JSON
      .then((data) => {
        if (data.result) {
          setMesEncheres(data.articles); // on stocke les articles dans le state
        } else {
          console.log("Erreur dans les données :", data.error);
        }
      })
      .catch((error) => {
        console.log("Erreur de connexion au serveur :", error);
      });
  };

  return (
    <SafeAreaView style={styles.safeareaview}>
      {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title */}

      <Headers navigation={navigation} isReturn={true} title={"Mes enchères"} />
      <View style={styles.container}>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[
              styles.greenButton,
              ongletActif === "enCours" && styles.activeButton,
            ]}
            onPress={handleEnCours}
          >
            <Text
              style={[
                styles.greenButtonText,
                ongletActif === "enCours" && styles.activeButtonText,
              ]}
            >
              Ventes en cours
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.greenButton,
              ongletActif === "terminees" && styles.activeButton,
            ]}
            onPress={handleTerminees}
          >
            <Text
              style={[
                styles.greenButtonText,
                ongletActif === "terminees" && styles.activeButtonText,
              ]}
            >
              Ventes terminées
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {ongletActif === "enCours" ? (
            <View
              style={{
                backgroundColor: "#D0F0C0",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: 16 }}>Enchères en cours</Text>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: "#FADBD8",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: 16 }}>Enchères terminées</Text>
            </View>
          )}
        </View>

        <ScrollView style={styles.scrollview}>
          <View style={styles.encheres}>
            {mesEncheres.length > 0 ? (
              // Si on a reçu des enchères depuis l'API, on les affiche
              mesEncheres.map((enchere, index) => (
                // On crée un composant Enchere pour chaque article du tableau
                <Enchere
                  key={index} // Clé unique nécessaire pour chaque élément d'une liste
                  navigation={navigation} // On transmet la navigation au composant
                  data={enchere} // On envoie les infos de l'enchère
                />
              ))
            ) : (
              // Si le tableau est vide, on affiche un petit message
              <Text>Aucune enchère à afficher.</Text>
            )}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[styles.greenButton, { marginTop: 20 }]}
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
  activeButton: {
    backgroundColor: "#1E8449", // un vert plus foncé
  },
  activeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
