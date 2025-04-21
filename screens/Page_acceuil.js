import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  RefreshControl
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
  //const BACKEND_ADDRESS = "http://192.168.100.65";

  useEffect(() => {
    (async () => {
      //------- fetch articles from the backend---------------------------
      const articlesResponse = await fetch(`${BACKEND_ADDRESS}:3000/articles/`);
      // get all articles
      const articlesData = await articlesResponse.json();
      // set all articles in the state
      setAllArticles(articlesData.data);

      // create list of articles' _id to be updated
      let listId = articlesData.data.map((data) => {
        const now = new Date();
        const end = new Date(
          new Date(data.timer).getTime() + 60 * 60 * 24 * 1000
        );

        // Select articles id whose isDone will be uddated to true
        if (end.getTime() < now.getTime()) {
          return data._id;
        }
      });
      // clean listId
      listId = listId.filter((e) => {
        return e !== undefined;
      });

      // For each articles' id selected fetch the backend to update its isDone property to true
      for (let id of listId) {

        const updateIdResponse = await fetch(
          `${BACKEND_ADDRESS}:3000/articles/updateIsDone`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
          }
        );
        const updateIdData = await updateIdResponse.json();
      }
    })();

  }, [refreshing, isFocused]);

  const handleCategorie = (categorie) => {
    setCategorie(categorie);
    fetch(`${BACKEND_ADDRESS}:3000/articles/searchByCategorie`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categorie, tri }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setAllArticles(data.data);
      });
  };

  const handleTri = (tri) => {
    setTri(tri);
    fetch(`${BACKEND_ADDRESS}:3000/articles/searchByTri`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categorie, tri }),
      }
    )
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
        setAllArticles(data.data); // Met à jour les articles affichés
      })
      .catch((error) => console.error("Erreur lors de la recherche :", error));
  };

  const article = allArticles.sort((a, b) => b.timer - a.timer).map((data, i) => {
    if (!data.isDone) {

      return (
        <Article key={i} navigation={navigation} origin={origin} {...data} />
      )
    }
  })

  return (
    <SafeAreaView style={styles.safeareaview}>
      {/* Ajout d'un header qui envoie vers le component "Header" les props navigation et isReturn*/}
      <Headers navigation={navigation} isHome={true} style={styles.header} onSearch={handleSearch} />
      <View style={styles.container}>
        <View style={styles.dropdownInputs}>
          <Dropdown isCategorie={true} handleCategorie={handleCategorie} />
          <Dropdown isTri={true} handleTri={handleTri} />
        </View>
        <ScrollView style={styles.scrollview} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View style={styles.articles}>
            {article}
          </View>
        </ScrollView>
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
  dropdown: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 160,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#dcdedf",
  },
  dropdownList: {
    backgroundColor: "#ffffff",
    position: "absolute",
    top: 45,
    width: "100%",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dcdedf",
    maxHeight: 150,
    zIndex: 1,
  },
  dropdownItem: {
    paddingVertical: 10,
  },
  categorieContainer: {
    position: "relative",
    width: 160,
  },
  triContainer: {
    position: "relative",
    width: 160,
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
  }
});
