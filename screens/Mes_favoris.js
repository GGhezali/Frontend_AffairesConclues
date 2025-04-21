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
  RefreshControl,
} from "react-native";
import Headers from "./components/Headers";
import Enchere from "./components/Enchere";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import Article from "./components/Article";



export default function MesFavorisScreen({ navigation }) {

  // ✅ 1. Initialisation d'un tableau vide pour éviter l'erreur .length sur undefined
  const [mesFavoris, setMesFavoris] = useState([]);

  //Onglet a selectinné 'enCours'

  const [nbArticles, setNbArticles] = useState(2);
  const [total, setTotal] = useState(18);
  const [userId, setUserId] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [allArticles, setAllArticles] = useState([]);
  const [refreshControl, setRefreshControl] = useState(false);

  const isFocused = useIsFocused();
  const origin = "MesFavorisScreen";
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  //Accéder au token dans Redux
  const user = useSelector((state) => state.user.value);
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

  // const fetchFavoris = async () => {
  //   try {
  //     const response = await fetch(
  //       `${BACKEND_ADDRESS}:3000/users/getBookmarks/${user.token}`
  //     );
  //     const data = await response.json();
  //     console.log("Favoris récupérés :", data); // Log pour vérif des données reçues
  //     setMesFavoris(data.bookmarks); // Stocke les favoris dans le state
  //   } catch (error) {
  //     console.error("Erreur fetch favoris :", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchFavoris();
  // }, [refreshing, isFocused]);

  // let favorisContent;

    // // Condition sécurisée pour éviter l'erreur si mesFavoris est undefined
    // if (!mesFavoris || mesFavoris.length === 0) {
    //   favorisContent = (
    //     <View style={styles.placeholderContainer}>
    //       <Image
    //         source={{
    //           uri: "https://cdn-icons-png.flaticon.com/512/4076/4076503.png",
    //         }}
    //         style={styles.placeholderImage}
    //       />
    //       <Text style={styles.placeholderText}>
    //         Tu n’as encore rien ajouté en favoris 🔖
    //       </Text>
    //     </View>
    //   );
    // } else {
    //   favorisContent = mesFavoris.map((favori, i) => (
    //     <Article key={i} navigation={navigation} {...favori} />
    //   ));
    // }

  useEffect(() => {
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
      let articleInfo = []
      for (let article of articlesIdData.bookmarks) {
        const articleResponse = await fetch(
          `${BACKEND_ADDRESS}:3000/articles/findArticleById/${article}`
        );
        const articleData = await articleResponse.json();
        articleInfo.push(articleData.data);
      }
      setAllArticles(articleInfo);
    })();
  }, [refreshing, isFocused, refreshControl]);

  const refresherFromBookmark = () => {
    setRefreshControl(!refreshControl)
  }

  const article = allArticles
    .sort((a, b) => b.timer - a.timer)
    .map((data, i) => {
      if (!data.isDone) {
        return <Article key={i} refresherFromBookmark={refresherFromBookmark} origin={origin} navigation={navigation} {...data} />;
      }
    });

  //Rediriger si pas connecté
  useEffect(() => {
    if (!user.token) {
      navigation.navigate("Connexion"); // ou "Connexion/Inscription" selon ton nom de screen
    }
  }, []);



  return (
    <SafeAreaView style={styles.safeareaview}>
      {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title */}

      <Headers navigation={navigation} isReturn={true} title={"Mes Favoris"} />
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
        <TouchableOpacity
          title="Continuer mes achats"
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
  separator: {
    height: 4, // épaisseur de la ligne
    backgroundColor: "black", // couleur vive (bleu iOS)
    marginVertical: 50,
    borderRadius: 10, // espace autour de la ligne
    width: "90%", // occupe toute la largeur
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
