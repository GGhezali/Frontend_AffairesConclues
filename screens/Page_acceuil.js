import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Image, // Import nécessaire pour afficher l'image du placeholder
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Article from "./components/Article";
import Headers from "./components/Headers";
import Dropdown from "./components/Dropdowns";

export default function PageAcceuilScreen({ navigation }) {
  const [allArticles, setAllArticles] = useState([]);
  const [categorie, setCategorie] = useState(null);
  const [tri, setTri] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [searchText, setSearchText] = useState("");
  const isFocused = useIsFocused();
  
  const origin = "PageAcceuilScreen";
 

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

  useEffect(() => {
    (async () => {
      const articlesResponse = await fetch(`${BACKEND_ADDRESS}:3000/articles/`);
      const articlesData = await articlesResponse.json();
      setAllArticles(articlesData.data);

      // ✅ Vérifie les articles expirés et met à jour `isDone`
      let listId = articlesData.data
        .map((data) => {
          const now = new Date();
          const end = new Date(
            new Date(data.timer).getTime() + 60 * 60 * 24 * 1000
          );
          if (end.getTime() < now.getTime()) {
            return data._id;
          }
        })
        .filter((e) => e !== undefined);

      for (let id of listId) {
        await fetch(`${BACKEND_ADDRESS}:3000/articles/updateIsDone`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
      }
    })();
  }, [refreshing, isFocused]);

  const handleCategorie = (categorie) => {
    setCategorie(categorie);
    fetch(`${BACKEND_ADDRESS}:3000/articles/searchByCategorie`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categorie, tri }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAllArticles(data.data);
      });
  };

  const handleTri = (tri) => {
    setTri(tri);
    fetch(`${BACKEND_ADDRESS}:3000/articles/searchByTri`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categorie, tri }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAllArticles(data.data);
      });
  };

  const handleSearch = (text) => {
    setSearchText(text);
    fetch(`${BACKEND_ADDRESS}:3000/articles/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: text, author: text, categorie }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAllArticles(data.data);
      })
      .catch((error) => console.error("Erreur lors de la recherche :", error));
  };

  //  Récupère uniquement les articles encore actifs (non terminés)
  let articleList = allArticles
    .filter((a) => !a.isDone)
    .sort((a, b) => b.timer - a.timer);

  let article;

  // Si aucun article actif : afficher un placeholder
  if (articleList.length === 0) {
    article = (
      <View style={styles.placeholderContainer}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/4076/4076549.png",
          }}
          style={styles.placeholderImage}
        />
        <Text style={styles.placeholderText}>
          Aucun article en vente pour le moment 💤
        </Text>
      </View>
    );
  } else {
    // Sinon, afficher les articles normalement
    article = articleList.map((data, i) => (
      <Article key={i} navigation={navigation} origin={origin} {...data} />
    ));
  }

  return (
    <SafeAreaView style={styles.safeareaview}>
      <Headers
        navigation={navigation}
        isHome={true}
        style={styles.header}
        onSearch={handleSearch}
      />
      <View style={styles.container}>
        <View style={styles.dropdownInputs}>
          <Dropdown isCategorie={true} handleCategorie={handleCategorie} />
          <Dropdown isTri={true} handleTri={handleTri} />
        </View>
        <ScrollView
          style={styles.scrollview}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.articles}>{article}</View>
        </ScrollView>
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
    justifyContent: "space-around",
  },
  header: {
    top: 0,
  },
  dropdownInputs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  scrollview: {
    flex: 1,
    padding: 10,
  },
  articles: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 50,
  },

  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
    marginBottom: 80,
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
