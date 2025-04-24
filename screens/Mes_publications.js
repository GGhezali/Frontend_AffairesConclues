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

export default function MesPublicationsScreen({ navigation }) {
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;
  const user = useSelector((state) => state.user.value);
  const [allArticles, setAllArticles] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [refresher, setRefresher] = useState("");
  const isFocused = useIsFocused();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    (async () => {
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

      const articlesResponse = await fetch(
        `${BACKEND_ADDRESS}/articles/findVendorArticles/${userIdData.userId}`
      );
      const articlesData = await articlesResponse.json();
      setAllArticles(articlesData.articles);
    })();
  }, [refreshing, isFocused, refresher]);

const refresherOnDelete = (name) => {
  setRefresher(name);
}

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
          Tu n’as encore rien publié 📚
        </Text>
      </View>
    );
  } else {
    article = allArticles
      .sort((a, b) => b.timer - a.timer)
      .map((data, i) => {
        return <Article key={i} navigation={navigation} isPublication={true} refresherOnDelete={refresherOnDelete} {...data} />;
      });
  }

  return (
    <SafeAreaView style={styles.safeareaview}>
      <Headers
        navigation={navigation}
        isReturn={true}
        title={"Mes Publications"}
      />
      <View style={styles.container}>
        {/* <Dropdown isTri={true} handleTri={handleTri} /> */}

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
    backgroundColor: "#FFF8EF",
    justifyContent: "space-around",
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
