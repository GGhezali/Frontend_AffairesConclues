import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import Headers from "./components/Headers";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import Article from "./components/Article";

export default function MesFavorisScreen({ navigation }) {
  const [userId, setUserId] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [allArticles, setAllArticles] = useState([]);
  const [refreshControl, setRefreshControl] = useState(false);
  const isFocused = useIsFocused();
  const user = useSelector((state) => state.user.value);
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (!user.token) {
      navigation.navigate("ConnexionInscription");
    }

    (async () => {
      // Fetch useurId from the backend -------------------------------
      const userIdResponse = await fetch(
        `${BACKEND_ADDRESS}:3000/users/findUserIdByToken`,
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
      // --------------------------------------------------------------
      const articlesIdResponse = await fetch(
        `${BACKEND_ADDRESS}:3000/users/getBookmarks/${userId}`
      );
      const articlesIdData = await articlesIdResponse.json();
      let articleInfo = [];
      for (let article of articlesIdData.bookmarks) {
        const articleResponse = await fetch(
          `${BACKEND_ADDRESS}:3000/articles/findArticleById/${article}`
        );
        const articleData = await articleResponse.json();
        articleInfo.push(articleData.data);
      }
      setAllArticles(articleInfo);
    })();
  }, [refreshing, isFocused]);

  const refresherFromBookmark = () => {
    setRefreshControl(!refreshControl);
  };

  let article;
  if (allArticles.length === 0) {
    article = (
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
    article = allArticles
      .sort((a, b) => b.timer - a.timer)
      .map((data, i) => {
        if (!data.isDone) {
          return (
            <Article
              key={i}
              refresherFromBookmark={refresherFromBookmark}
              navigation={navigation}
              {...data}
            />
          );
        }
      });
  }

  //Rediriger si pas connecté
  useEffect(() => {
    if (!user.token) {
      navigation.navigate("Connexion"); // ou "Connexion/Inscription" selon ton nom de screen
    }
  }, []);

  if (!user.token) {
    return null; // Si l'utilisateur n'est pas connecté, on ne retourne rien
  } else {
    return (
      <SafeAreaView style={styles.safeareaview}>
        {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title */}

        <Headers
          navigation={navigation}
          isReturn={true}
          title={"Mes Favoris"}
        />
        <View style={styles.container}>
          <View style={styles.content}></View>
          <ScrollView
            style={styles.scrollview}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.encheres}>{article}</View>
            {/* <View style={styles.articles}>{favorisContent}</View> */}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF8EF",
    alignItems: "center",
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
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    width: "100%",
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
