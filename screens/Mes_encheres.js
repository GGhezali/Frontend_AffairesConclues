import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Headers from "./components/Headers";
import Enchere from "./components/Enchere";

export default function MesEncheresScreen({ navigation }) {
  const [userId, setUserId] = useState(null);
  const [ongletActif, setOngletActif] = useState("enCours");
  const [allArticles, setAllArticles] = useState([]);
  const [nbArticles, setNbArticles] = useState(0);
  const [total, setTotal] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;
  const user = useSelector((state) => state.user.value);
  const isFocused = useIsFocused();

  const handleEnCours = () => {
    setOngletActif("enCours");

    fetch(`${BACKEND_ADDRESS}:3000/mes-encheres/open/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setAllArticles(data.articles);
      })
      .catch((error) => console.error("Error fetching open articles:", error));
  };

  const handleTerminees = () => {
    setOngletActif("terminees");

    fetch(`${BACKEND_ADDRESS}:3000/mes-encheres/closed/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setAllArticles(data.articles);
      })
      .catch((error) =>
        console.error("Error fetching closed articles:", error)
      );
  };

  useEffect(() => {
    if (!user.token) {
      navigation.navigate("ConnexionInscription");
    }

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
        setUserId(data.userId);

        fetch(`${BACKEND_ADDRESS}:3000/mes-encheres/open/${data.userId}`)
          .then((response) => response.json())
          .then((data) => {
            setAllArticles(data.articles);
          })
          .catch((error) =>
            console.error("Error fetching open articles:", error)
          );
      });
  }, [refreshing, isFocused]);

  useEffect(() => {
    if (!user.token) {
      navigation.navigate("ConnexionInscription");
    }

    if (allArticles.length > 0) {
      setNbArticles(allArticles.length);

      let totalPrix = 0;
      for (let i = 0; i < allArticles.length; i++) {
        totalPrix += Number(allArticles[i].currentPrice);
      }

      setTotal(totalPrix.toFixed(2));
    } else {
      setNbArticles(0);
      setTotal("0.00");
    }
  }, [allArticles]);

  // Placeholder ou enchères
  let encheres;

  if (allArticles.length === 0) {
    encheres = (
      <View style={styles.placeholderContainer}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/4076/4076503.png",
          }}
          style={styles.placeholderImage}
        />
        <Text style={styles.placeholderText}>
          Aucune enchère {ongletActif === "enCours" ? "en cours" : "terminée"}{" "}
          📦
        </Text>
      </View>
    );
  } else {
    encheres = allArticles.map((data, i) => (
      <Enchere
        key={i}
        navigation={navigation}
        {...data}
        ongletActif={ongletActif}
      />
    ));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
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

        <View style={styles.content} />

        <ScrollView
          style={styles.scrollview}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
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
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },

  placeholderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
    marginBottom: 60,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
    opacity: 0.8,
  },
  placeholderText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
