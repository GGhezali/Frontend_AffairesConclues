import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Headers from "./components/Headers";
import Article from "./components/Article";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function MesFavorisScreen({ navigation }) {
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;
  const user = useSelector((state) => state.user.value);

  // ✅ 1. Initialisation d'un tableau vide pour éviter l'erreur .length sur undefined
  const [mesFavoris, setMesFavoris] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const onRefresh = () => {
    setRefreshing(true);
    fetchFavoris();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const fetchFavoris = async () => {
    try {
      const response = await fetch(
        `${BACKEND_ADDRESS}:3000/users/getBookmarks/${user.token}`
      );
      const data = await response.json();
      console.log("Favoris récupérés :", data); // Log pour vérif des données reçues
      setMesFavoris(data.bookmarks); // Stocke les favoris dans le state
    } catch (error) {
      console.error("Erreur fetch favoris :", error);
    }
  };

  useEffect(() => {
    fetchFavoris();
  }, [refreshing, isFocused]);

  let favorisContent;

  // Condition sécurisée pour éviter l'erreur si mesFavoris est undefined
  if (!mesFavoris || mesFavoris.length === 0) {
    favorisContent = (
      <View style={styles.placeholderContainer}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/4076/4076503.png",
          }}
          style={styles.placeholderImage}
        />
        <Text style={styles.placeholderText}>
          Tu n’as encore rien ajouté en favoris 🔖
        </Text>
      </View>
    );
  } else {
    favorisContent = mesFavoris.map((favori, i) => (
      <Article key={i} navigation={navigation} {...favori} />
    ));
  }

  return (
    <SafeAreaView style={styles.safeareaview}>
      <Headers navigation={navigation} isReturn={true} title="Mes Favoris" />
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.articles}>{favorisContent}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
    backgroundColor: "#F5FCEE",
  },
  articles: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },

  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
    opacity: 0.7,
  },
  placeholderText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
