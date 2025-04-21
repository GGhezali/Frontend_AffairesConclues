import {
  Button,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Platform,
  ScrollView,
  RefreshControl,
} from "react-native";
import Headers from "./components/Headers";
import Article from "./components/Article";
import Dropdown from "./components/Dropdowns";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function MesPublicationsScreen({ navigation }) {
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;
  const user = useSelector((state) => state.user.value);
  const [allArticles, setAllArticles] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
      //setUserId(userIdData.userId);
      // --------------------------------------------------------------

      //------- fetch articles with vendorID from the backend---------------------------
      const articlesResponse = await fetch(
        `${BACKEND_ADDRESS}:3000/articles/findVendorArticles/${userIdData.userId}`
      );
      // get all articles
      const articlesData = await articlesResponse.json();
      // set all articles in the state
      setAllArticles(articlesData.articles);
    })();
  }, [refreshing]);

  let article;

  if (allArticles.length === 0) {
    article = (
      <View style={styles.articles}>
        <Text style={styles.title}>Aucun article trouvé</Text>
      </View>
    );
  } else {
    article = allArticles
      .sort((a, b) => b.timer - a.timer)
      .map((data, i) => {
        return <Article key={i} navigation={navigation} {...data} />;
      });
  }

  return (
    <SafeAreaView style={styles.safeareaview}>
      {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title */}

      <Headers
        navigation={navigation}
        isReturn={true}
        title={"Mes Publications"}
      />
      <View style={styles.container}>
        {/*}
        <View style={styles.dropdownInputs}>
          <Dropdown isTri={true} handleTri={handleTri} />
        </View>
       */}

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
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#F5FCEE",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 20,
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
});
