import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Article from "./components/Article";
import Headers from "./components/Headers";
import Dropdown from "./components/Dropdowns";

export default function PageAcceuilScreen({ navigation }) {
  const [allArticles, setAllArticles] = useState([]);  // Contient la liste de tous les articles
  const [category, setCategory] = useState(null);       // Catégorie sélectionnée pour filtrer les articles
  const [sort, setSort] = useState(null);               // Critère de tri pour les articles
  const [refreshing, setRefreshing] = React.useState(false); 
  const isFocused = useIsFocused();                     // Détecte si la page est actuellement visible

  // Fonction qui sera appelée pour rafraîchir les articles
  const onRefresh = React.useCallback(() => {
    setRefreshing(true); // Active le rafraîchissement
    setTimeout(() => {
      setRefreshing(false); // Désactive le rafraîchissement après 2 secondes
    }, 2000);
  }, []);

  // Adresse du backend (où les articles sont stockés)
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

  // useEffect : Un effet secondaire qui s'exécute lorsque le composant est monté ou lorsque l'état `refreshing` ou `isFocused` change
  useEffect(() => {
    (async () => {
      // Récupère les articles depuis le serveur backend
      const articlesResponse = await fetch(`${BACKEND_ADDRESS}/articles/`);
      const articlesData = await articlesResponse.json();
      setAllArticles(articlesData.data);

      // Vérifie les articles expirés et met à jour leur état "isDone" pour marquer les articles terminés
      let listId = articlesData.data
        .map((data) => {
          const now = new Date(); 
          const end = new Date(
            new Date(data.timer).getTime() + 60 * 60 * 24 * 1000 // Ajoute 24h à l'heure de l'article
          );
          if (end.getTime() < now.getTime()) { // Si la date de fin de l'article est passée
            return data._id; // Retourne l'ID de l'article expiré
          }
        })
        .filter((e) => e !== undefined); // Filtre les articles pour ne garder que ceux qui sont expirés

      // Met à jour l'état de ces articles expirés dans le backend
      for (let id of listId) {
        await fetch(`${BACKEND_ADDRESS}/articles/updateIsDone`, {
          method: "POST", // Utilise la méthode POST pour envoyer les données au serveur
          headers: { "Content-Type": "application/json" }, // Spécifie que les données envoyées sont au format JSON
          body: JSON.stringify({ id }), // Envoie l'ID de l'article expiré
        });
      }
    })();
  }, [refreshing, isFocused]); // Cela s'exécute chaque fois que `refreshing` ou `isFocused` change

  // Fonction qui gère le changement de catégorie et récupère les articles associés à cette catégorie
  const handleCategory = (category) => {
    setCategory(category); // Met à jour l'état de la catégorie sélectionnée
    // Récupère les articles filtrés par catégorie et tri
    fetch(`${BACKEND_ADDRESS}/articles/searchByCategory`, {
      method: "POST", // Envoie une requête POST
      headers: { "Content-Type": "application/json" }, // Envoie des données en JSON
      body: JSON.stringify({ category, sort }), // Envoie la catégorie et le tri au serveur
    })
      .then((response) => response.json()) // Attend la réponse du serveur en format JSON
      .then((data) => {
        setAllArticles(data.data); // Met à jour la liste des articles avec les nouveaux articles filtrés
      });
  };

  // Fonction qui gère le tri des articles
  const handleSort = (sort) => {
    setSort(sort); // Met à jour l'état du critère de tri sélectionné
    // Récupère les articles triés selon le critère choisi
    fetch(`${BACKEND_ADDRESS}/articles/searchBySort`, {
      method: "POST", // Envoie une requête POST
      headers: { "Content-Type": "application/json" }, // Envoie des données en JSON
      body: JSON.stringify({ category, sort }), // Envoie la catégorie et le critère de tri
    })
      .then((response) => response.json()) // Attend la réponse du serveur en format JSON
      .then((data) => {
        setAllArticles(data.data); // Met à jour la liste des articles avec les articles triés
      });
  };

  // Fonction pour effectuer une recherche d'articles par titre, auteur ou catégorie
  const handleSearch = (text) => {
    fetch(`${BACKEND_ADDRESS}/articles/search`, {
      method: "POST", // Envoie une requête POST
      headers: { "Content-Type": "application/json" }, // Envoie des données en JSON
      body: JSON.stringify({ title: text, author: text, category }), // Envoie les informations de recherche
    })
      .then((response) => response.json()) // Attend la réponse du serveur en format JSON
      .then((data) => {
        setAllArticles(data.data); // Met à jour la liste des articles avec les résultats de la recherche
      })
      .catch((error) => console.error("Erreur lors de la recherche :", error)); // En cas d'erreur
  };

  // Filtre les articles pour ne récupérer que ceux qui sont encore actifs (non terminés)
  let articleList = allArticles
    .filter((a) => !a.isDone) // Garder les articles qui ne sont pas terminés
    .sort((a, b) => b.timer - a.timer); // Trier les articles par date (du plus récent au plus ancien)

  let article;

  // Si aucun article actif n'est trouvé, afficher un message de "placeholder" indiquant qu'aucun article n'est disponible
  if (articleList.length === 0) {
    article = (
      <View style={styles.placeholderContainer}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/4076/4076503.png", // Image de placeholder (icône)
          }}
          style={styles.placeholderImage} // Style de l'image
        />
        <Text style={styles.placeholderText}>
          Aucun article en vente pour le moment 💤
        </Text>
      </View>
    );
  } else {
    // Si des articles actifs sont trouvés, les afficher normalement
    article = articleList.map((data, i) => (
      <Article key={i} navigation={navigation} {...data} />
    ));
  }

  return (
    <SafeAreaView style={styles.safeareaview}>
      {/* Composant Header avec barre de recherche */}
      <Headers
        navigation={navigation}
        isHome={true}
        style={styles.header}
        onSearch={handleSearch}
      />
      <View style={styles.container}>
        <View style={styles.dropdownInputs}>
          {/* Dropdown pour sélectionner la catégorie des articles */}
          <Dropdown isCategory={true} handleCategory={handleCategory} />
          {/* Dropdown pour sélectionner le critère de tri */}
          <Dropdown isSorting={true} handleSort={handleSort} />
        </View>
        {/* Liste d'articles avec fonction de rafraîchissement */}
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
  header: {
    top: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF8EF",
    justifyContent: "space-around",
  },
  dropdownInputs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 10,
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
    padding: 20,
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
