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
} from "react-native";
import Headers from "./components/Headers";

export default function MesEncheresScreen({ navigation }) {
  //Onglet a selectinné 'enCours'

  const [ongletActif, setOngletActif] = useState("");

  // Fonction appelée quand on clique sur "Ventes en cours"
  const handleEnCours = () => {
    setOngletActif("enCours");
  };

  // Fonction appelée quand on clique sur "Ventes terminées"
  const handleTerminees = () => {
    setOngletActif("terminees");
  };
  return (
    <SafeAreaView style={styles.safeareaview}>
      {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title */}

      <Headers navigation={navigation} isReturn={true} title={"Mes enchères"} />
      <View style={styles.container}>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.greenButton} onPress={handleEnCours}>
            <Text style={styles.greenButtonText}>Ventes en cours</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.greenButton}
            onPress={handleTerminees}
          >
            <Text style={styles.greenButtonText}>Ventes terminées</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Continuer mes achats"
          onPress={() =>
            navigation.navigate("TabNavigator", { screen: "Acceuil" })
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
    paddingHorizontal: 12, // ⬅️ légèrement réduit
    borderRadius: 10,
    marginHorizontal: 8, // ⬅️ espace entre les deux boutons
    minWidth: 130, // ⬅️ largeur mini uniforme (optionnel)
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
});
