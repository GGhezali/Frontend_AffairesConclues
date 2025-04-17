import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Headers from "./components/Headers";
import Enchere from "./components/Enchere";
import { useSelector } from "react-redux";

export default function MesEncheresScreen({ navigation }) {
  const [ongletActif, setOngletActif] = useState("enCours");
  const [nbArticles, setNbArticles] = useState(2);
  const [total, setTotal] = useState(18);
  const [openArticles, setOpenArticles] = useState([]);
  const [closedArticles, setClosedArticles] = useState([]);
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;
  const user = useSelector((state) => state.user.value);

  const handleEnCours = () => {
    setOngletActif("enCours");
  };

  const handleTerminees = () => {
    setOngletActif("terminees");
  };

  useEffect(() => {
    if (!user.token) {
      navigation.navigate("Connexion");
    }
    fetch(`${BACKEND_ADDRESS}:3000/mes-encheres/open/:userID`)
      .then((response) => response.json())
      .then((data) => setOpenArticles(data.articles))
      .catch((error) => console.error("Error fetching open articles:", error));
  }, []);

  return (
    <SafeAreaView style={styles.safeareaview}>
      <Headers navigation={navigation} isReturn={true} title={"Mes enchères"} />

      <View style={styles.container}>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[
              styles.greenButton,
              ongletActif === "enCours" && styles.selectedButton,
            ]}
            onPress={handleEnCours}
          >
            <Text
              style={[
                styles.greenButtonText,
                ongletActif === "enCours" && styles.selectedButtonText,
              ]}
            >
              Ventes en cours
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.greenButton,
              ongletActif === "terminees" && styles.selectedButton,
            ]}
            onPress={handleTerminees}
          >
            <Text
              style={[
                styles.greenButtonText,
                ongletActif === "terminees" && styles.selectedButtonText,
              ]}
            >
              Ventes terminées
            </Text>
          </TouchableOpacity>
        </View>

        {/* Contenu vide à la place de Enchères en cours/terminées */}
        <View style={styles.content} />

        <ScrollView style={styles.scrollview}>
          <View style={styles.encheres}>
            <Enchere navigation={navigation} />
          </View>
        </ScrollView>

        {/* Barre noire descendue */}
        <View style={styles.separator} />

        <View style={styles.total}>
          <Text style={styles.text}>Nombre d'articles : {nbArticles},</Text>
          <Text style={styles.text}> Total : {total}</Text>
        </View>

        {/* Bouton continuer mes achats */}
        <View style={{ marginTop: 20, marginBottom: 40 }}>
          <TouchableOpacity
            style={styles.greenButton}
            onPress={() =>
              navigation.navigate("TabNavigator", { screen: "Acceuil" })
            }
          >
            <Text style={styles.greenButtonText}>Continuer mes achats</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
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
  selectedButton: {
    backgroundColor: "#145A32",
    transform: [{ scale: 0.98 }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  selectedButtonText: {
    color: "#fff",
    fontWeight: "bold",
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
    height: 4,
    backgroundColor: "black",
    marginTop: 80, // espacement supérieur
    marginBottom: 30, // espacement inférieur
    borderRadius: 10,
    width: "90%",
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
