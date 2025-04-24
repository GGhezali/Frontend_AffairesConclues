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
  const [allArticles, setAllArticles] = useState([]); // Contient la liste des articles favoris
  const [refresher, setRefresher] = useState("");     // Sert à forcer le rafraîchissement de la page

  // useIsFocused : Vérifie si la page est actuellement visible
  const isFocused = useIsFocused();
  // Récupère l'utilisateur depuis le store (données globales de l'application)
  const user = useSelector((state) => state.user.value);
  // Adresse du backend pour récupérer les données
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

  // Fonction qui sera appelée pour rafraîchir la page
  const onRefresh = React.useCallback(() => {
    setRefreshing(true); // Active le rafraîchissement
    setTimeout(() => {
      setRefreshing(false); // Désactive le rafraîchissement après 1 seconde
    }, 1000);
  }, [isFocused]);

  // useEffect : Un effet secondaire qui s'exécute lorsque le composant est monté ou lorsque l'état `refreshing` ou `isFocused` change
  useEffect(() => {
    // Vérifie si l'utilisateur est connecté. Si ce n'est pas le cas, redirige vers la page de connexion
    if (!user.token) {
      navigation.navigate("ConnexionInscription"); // Redirige vers la page de connexion
    }

    (async () => {
      // 1. Récupère l'ID de l'utilisateur à partir du backend en utilisant son token
      const userIdResponse = await fetch(
        `${BACKEND_ADDRESS}/users/findUserIdByToken`,
        {
          method: "POST", // Méthode POST pour envoyer des données
          headers: {
            "Content-Type": "application/json", // Spécifie que les données sont envoyées en JSON
          },
          body: JSON.stringify({
            token: user.token, // Envoie le token de l'utilisateur pour retrouver son ID
          }),
        }
      );
      const userIdData = await userIdResponse.json(); // Parse la réponse du serveur en JSON
      setUserId(userIdData.userId); // Met à jour l'ID de l'utilisateur dans l'état

      // 2. Récupère les articles favoris de l'utilisateur depuis le backend
      const articlesIdResponse = await fetch(
        `${BACKEND_ADDRESS}/users/getBookmarks/${userIdData.userId}`
      );
      const articlesIdData = await articlesIdResponse.json(); // Parse la réponse du serveur

      // 3. Pour chaque ID d'article, récupère les informations complètes de cet article
      let articleInfo = [];
      for (let article of articlesIdData.bookmarks) {
        const articleResponse = await fetch(
          `${BACKEND_ADDRESS}/articles/findArticleById/${article}`
        );
        const articleData = await articleResponse.json(); // Récupère les données de l'article
        articleInfo.push(articleData.data); // Ajoute l'article récupéré à la liste
      }

      setAllArticles(articleInfo); // Met à jour la liste des articles favoris
    })();
  }, [refreshing, isFocused, refresher]); // Ce code se réexécute à chaque changement de `refreshing`, `isFocused`, ou `refresher`

  // Fonction pour forcer le rafraîchissement de la liste des favoris lorsque l'article est supprimé des favoris
  const refreshOnBookmark = (name) => {
    setRefresher(name); // Met à jour l'état `refresher` pour déclencher un rafraîchissement
  };

  // Condition pour afficher un message si aucun article n'est présent
  let article;
  if (allArticles.length === 0) {
    // Si la liste des articles favoris est vide, afficher un message de placeholder
    article = (
      <View style={styles.placeholderContainer}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/4076/4076503.png", // Image de placeholder
          }}
          style={styles.placeholderImage} // Style de l'image de placeholder
        />
        <Text style={styles.placeholderText}>
          Tu n’as encore rien ajouté en favoris 🔖
        </Text>
      </View>
    );
  } else {
    // Si des articles sont présents, les trier par date (du plus récent au plus ancien) et les afficher
    article = allArticles
      .sort((a, b) => b.timer - a.timer)
      .map((data) => {
        if (!data.isDone) {
          return (
            <Article
              key={data._id}
              navigation={navigation}
              {...data}
              refreshOnBookmark={refreshOnBookmark} // Passe la fonction de rafraîchissement à l'article
            />
          );
        }
      });
  }

  // useEffect qui redirige l'utilisateur vers la page de connexion s'il n'est pas connecté
  useEffect(() => {
    if (!user.token) {
      navigation.navigate("Connexion"); // Si l'utilisateur n'est pas connecté, le rediriger vers la page de connexion
    }
  }, []);

  // Si l'utilisateur n'est pas connecté, on ne rend rien (null)
  if (!user.token) {
    return null;
  } else {
    // Si l'utilisateur est connecté, afficher la page "Mes Favoris"
    return (
      <SafeAreaView style={styles.safeareaview}>
        {/* Header qui affiche un titre et un bouton de retour */}
        <Headers
          navigation={navigation}
          isReturn={true} // Permet de revenir à l'écran précédent
          title={"Mes Favoris"} // Titre affiché dans le header
        />
        <View style={styles.container}>
          <View style={styles.content}></View>
          {/* ScrollView permet de faire défiler les articles */}
          <ScrollView
            style={styles.scrollview}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // Rafraîchissement de la liste
            }
          >
            <View style={styles.encheres}>{article}</View> {/* Affiche les articles */}
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
