import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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

export default function MesEncheresScreen({ navigation }) {
  const [ongletActif, setOngletActif] = useState("enCours");
  const [allArticles, setAllArticles] = useState([]);
  const [nbArticles, setNbArticles] = useState(0);
  const [total, setTotal] = useState(0);

  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;
  const user = useSelector((state) => state.user.value);

  const handleEnCours = () => {
    setOngletActif("enCours");

    fetch(`${BACKEND_ADDRESS}:3000/users/findUserIdByToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("articles =>", data);
        fetch(`${BACKEND_ADDRESS}:3000/mes-encheres/open/${data.userId}`)
          .then((response) => response.json())
          .then((data) => {
            setAllArticles(data.articles);
            //console.log("articles =>", data.articles);
          })
          .catch((error) =>
            console.error("Error fetching open articles:", error)
          );
      });
  };

  const handleTerminees = () => {
    setOngletActif("terminees");

    fetch(`${BACKEND_ADDRESS}:3000/users/findUserIdByToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: user.token }),
    })
      .then((response) => response.json())
      .then((data) => {
        fetch(`${BACKEND_ADDRESS}:3000/mes-encheres/${type}/${data.userId}`)
          .then((response) => response.json())
          .then((data) => {
            setAllArticles(data.articles);
            //console.log("articles =>", data.articles)
          })
          .catch((error) =>
            console.error("Error fetching closed articles:", error)
          );
      });
  };

  useEffect(() => {
    /*
    if (!user.token) {
      navigation.navigate("Connexion");
    }
      */
    fetch(`${BACKEND_ADDRESS}:3000/users/findUserIdByToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("articles =>", data);
        fetch(`${BACKEND_ADDRESS}:3000/mes-encheres/open/${data.userId}`)
          .then((response) => response.json())
          .then((data) => {
            setAllArticles(data.articles);
            //console.log("articles =>", data.articles)
          })
          .catch((error) =>
            console.error("Error fetching open articles:", error)
          );
      });
  }, []);

  const encheres = allArticles.map((data, i) => {
    return (
      <Enchere
        key={i}
        navigation={navigation}
        {...data}
        ongletActif={ongletActif}
      />
    );
  });

  return (
    <SafeAreaView style={styles.safeareaview}>
      <Headers navigation={navigation} isReturn={true} title={"Mes enchères"} />

      <View style={styles.container}>
        {/* Onglets de navigation */}
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

        {/* Espace haut */}
        <View style={styles.content} />

        {/* Liste des enchères */}
        <ScrollView style={styles.scrollview}>
          <View style={styles.encheres}>{encheres}</View>
        </ScrollView>

        {/* Barre de séparation */}
        <View style={styles.separator} />

        {/* Résumé : nombre d’articles et total */}
        <View style={styles.total}>
          <Text style={styles.text}>Nombre d'articles : {nbArticles}</Text>
          <Text style={styles.text}>Total : {total} €</Text>
        </View>

        {/* Bouton "Continuer mes achats" */}
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
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 10,
    width: "90%",
  },
  total: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
