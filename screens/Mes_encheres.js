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
  const [activeTab, setActiveTab] = useState("enCours");
  const [allArticles, setAllArticles] = useState([]);
  const [nbArticles, setNbArticles] = useState(0);
  const [total, setTotal] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;
  const user = useSelector((state) => state.user.value);
  const isFocused = useIsFocused();

  const handleOpen = async () => {
    try {
      setActiveTab("enCours");

      const response = await fetch(
        `${BACKEND_ADDRESS}/mes-encheres/open/${userId}`
      );
      const data = await response.json();
      setAllArticles(data.articles);
    } catch (error) {
      console.error("Error fetching open articles:", error);
    }
  };

  const handleClosed = async () => {
    try {
      setActiveTab("terminees");

      const response = await fetch(
        `${BACKEND_ADDRESS}/mes-encheres/closed/${userId}`
      );
      const data = await response.json();
      setAllArticles(data.articles);
    } catch (error) {
      console.error("Error fetching closed articles:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user.token) {
          navigation.navigate("ConnexionInscription");
          return;
        }

        // Récupérer l'userId à partir du token
        const userIdResponse = await fetch(
          `${BACKEND_ADDRESS}/users/findUserIdByToken`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: user.token,
            }),
          }
        );
        const userIdData = await userIdResponse.json();
        setUserId(userIdData.userId);

        // Récupérer les enchères en cours pour cet userId
        const articlesResponse = await fetch(
          `${BACKEND_ADDRESS}/mes-encheres/open/${userIdData.userId}`
        );
        const articlesData = await articlesResponse.json();
        setAllArticles(articlesData.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [refreshing, isFocused]);

  useEffect(() => {
    if (!user.token) {
      navigation.navigate("ConnexionInscription");
    }

    if (allArticles.length > 0) {
      setNbArticles(allArticles.length);

      let totalPrice = 0;
      for (let i = 0; i < allArticles.length; i++) {
        totalPrice += Number(allArticles[i].currentPrice);
      }

      setTotal(totalPrice.toFixed(2));
    } else {
      setNbArticles(0);
      setTotal("0.00");
    }
  }, [allArticles]);

  // Placeholder ou enchères
  let bid;

  if (allArticles.length === 0) {
    bid = (
      <View style={styles.placeholderContainer}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/4076/4076503.png",
          }}
          style={styles.placeholderImage}
        />
        <Text style={styles.placeholderText}>
          Aucune enchère {activeTab === "enCours" ? "en cours" : "terminée"} 📦
        </Text>
      </View>
    );
  } else {
    bid = allArticles.map((data, i) => (
      <Enchere
        key={i}
        navigation={navigation}
        {...data}
        activeTab={activeTab}
      />
    ));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  if (!user.token) {
    return null; // Si l'utilisateur n'est pas connecté, on ne retourne rien
  } else {
    return (
      <SafeAreaView style={styles.safeareaview}>
        <Headers
          navigation={navigation}
          isReturn={true}
          title={"Mes enchères"}
        />

        <View style={styles.container}>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.greenButton,
                activeTab === "enCours" && styles.selectedButton,
              ]}
              onPress={handleOpen}
            >
              <Text
                style={[
                  styles.greenButtonText,
                  activeTab === "enCours" && styles.selectedButtonText,
                ]}
              >
                Ventes en cours
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.greenButton,
                activeTab === "terminees" && styles.selectedButton,
              ]}
              onPress={handleClosed}
            >
              <Text
                style={[
                  styles.greenButtonText,
                  activeTab === "terminees" && styles.selectedButtonText,
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
            <View style={styles.bid}>{bid}</View>
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
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF8EF",
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
    backgroundColor: "#AA5042",
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
    backgroundColor: "#753742",
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
  bid: {
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
