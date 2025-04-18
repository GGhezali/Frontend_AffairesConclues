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

  useEffect(() => {
    setNbArticles(allArticles.length);
    let totalPrix = 0;
    for (let i = 0; i < allArticles.length; i++) {
      totalPrix += Number(allArticles[i].prix);
    }
    setTotal(totalPrix.toFixed(2));
  }, [allArticles]);

  const fetchArticles = (type) => {
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
          .then((data) => setAllArticles(data.articles))
          .catch((error) => console.error("Error fetching articles:", error));
      });
  };

  useEffect(() => {
    if (!user.token) {
      navigation.navigate("Connexion");
    } else {
      fetchArticles("open");
    }
  }, []);

  const handleEnCours = () => {
    setOngletActif("enCours");
    fetchArticles("open");
  };

  const handleTerminees = () => {
    setOngletActif("terminees");
    fetchArticles("closed");
  };

  const encheres = allArticles.map((data, i) => (
    <Enchere
      key={i}
      navigation={navigation}
      {...data}
      ongletActif={ongletActif}
    />
  ));

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

        <View style={styles.content} />

        <ScrollView style={styles.scrollview}>
          <View style={styles.encheres}>{encheres}</View>
        </ScrollView>

        <View style={styles.separator} />

        <View style={styles.total}>
          <Text style={styles.text}>Nombre d'articles : {nbArticles}</Text>
          <Text style={styles.text}>Total : {total} €</Text>
        </View>

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
