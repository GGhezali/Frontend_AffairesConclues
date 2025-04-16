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
  KeyboardAvoidingView
} from "react-native";
import Article from "./components/Article";
import Headers from "./components/Headers";
import Dropdown from "./components/Dropdowns";

export default function PageAcceuilScreen({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);

  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;
  //const BACKEND_ADDRESS = "http://192.168.100.65";

  useEffect(() => {
    // Fetch categories from the backend ---------------------------------
    (async () => {
      //------- fetch articles from the backend---------------------------
      const articlesResponse = await fetch(`${BACKEND_ADDRESS}:3000/articles/`);
      // get all articles
      const articlesData = await articlesResponse.json();
      
      setAllArticles(articlesData.data);

      // create list of articles' _id to be updated
      let listId = articlesData.data.map((data) => {
        const now = new Date();
        const end = new Date(
          new Date(data.timer).getTime() + 60 * 60 * 24 * 1000
        );

        if (end.getTime() < now.getTime()) {
          // Select articles id whose isDone will be uddated to true
          //console.log("data._id =>", data._id);
          return data._id;
        }
      });

      listId = listId.filter((e) => {
        return e !== undefined;
      });
      // console.log("listId =>", listId);

      // For each articles' id selected fetch the backend to update its isDone property to true
      for (let id of listId) {
        // console.log(id);

        const updateIdResponse = await fetch(
          `${BACKEND_ADDRESS}:3000/articles/updateIsDone`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
          }
        );

        const updateIdData = await updateIdResponse.json();

        // console.log(updateIdData);
      }
    })();
    //--------------------------------------------------------------------

    // Update articles' isDone category ---------------------------------

    //--------------------------------------------------------------------
  }, []);

  const article = allArticles.map((data, i) => {
    return (
      <Article key={i} navigation={navigation} {...data} />
    )})
  
  
  return (
    <SafeAreaView style={styles.safeareaview}>
      {/* Ajout d'un header qui envoie vers le component "Header" les props navigation et isReturn*/}
      <Headers navigation={navigation} isHome={true} style={styles.header} />
      <View style={styles.container}>
        <View style={styles.dropdownInputs}>
          <Dropdown isCategorie={true} />
          <Dropdown isTri={true} />
        </View>
        <ScrollView style={styles.scrollview}>
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
  }
});
