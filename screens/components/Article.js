import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { updateBookmark } from "../../reducers/bookmarks";

export default function Article(props) {
  // Utilisation du hook useState pour gérer l'état des éléments locaux.
  const [bookmarkedColor, setBookmarkedColor] = useState(false);  // Gère l'état si l'article est marqué comme favori ou non.
  const [userId, setUserId] = useState(null);  // Gère l'ID de l'utilisateur récupéré depuis le backend.
  const isFocused = useIsFocused();  // Vérifie si l'écran est actif (utile pour les effets à chaque changement d'écran).
  const user = useSelector((state) => state.user.value);  // Récupère l'utilisateur connecté depuis le Redux store.
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;  // L'URL de l'API backend, récupérée depuis les variables d'environnement.
  const dispatch = useDispatch();  // Utilise dispatch pour envoyer des actions au store Redux.

  // Initialisation du titre à afficher. Si le titre est trop long, on le tronque.
  let title = "";
  if (props.titre && props.titre.length > 20) {
    title = props.titre.substring(0, 20) + "...";  // Tronque le titre à 20 caractères + "..."
  } else {
    title = props.titre;  // Si le titre est court, il reste inchangé.
  }

  // Initialisation de l'image, si pas d'URL fournie, utilise une image par défaut.
  let photo = props.photoUrl[0];
  if (props.photoUrl.length === 0 || props.photoUrl === undefined) {
    photo =
      "https://img.freepik.com/vecteurs-libre/illustration-icone-galerie_53876-27002.jpg";  // Image par défaut si photoUrl est vide ou non défini.
  }

  // useEffect est utilisé pour effectuer des actions lors de la montée du composant.
  useEffect(() => {
    (async () => {
      // 1. Récupérer l'ID utilisateur depuis le backend en envoyant le token d'utilisateur.
      const userIdResponse = await fetch(
        `${BACKEND_ADDRESS}/users/findUserIdByToken`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: user.token,  // On envoie le token de l'utilisateur pour récupérer son ID.
          }),
        }
      );
      const userIdData = await userIdResponse.json();
      setUserId(userIdData.userId);  // Sauvegarde l'ID utilisateur dans l'état.

      // 2. Récupérer les articles sauvegardés (favoris) de l'utilisateur.
      const articlesIdResponse = await fetch(
        `${BACKEND_ADDRESS}/users/getBookmarks/${userIdData.userId}`
      );
      const articlesIdData = await articlesIdResponse.json();
      dispatch(updateBookmark(articlesIdData.bookmarks));  // Met à jour les favoris dans Redux.

      // 3. Vérifier si l'article actuel est dans les favoris de l'utilisateur.
      const isBookmarked = articlesIdData.bookmarks.some(
        (article) => article === props._id  // Vérifie si l'ID de cet article est dans les favoris.
      );
      if (isBookmarked) {
        setBookmarkedColor(true);  // Si l'article est marqué comme favori, on change l'état.
      } else {
        setBookmarkedColor(false);  // Sinon, on garde l'état à faux.
      }
    })();
  }, [isFocused, bookmarkedColor]);  // Effet déclenché à chaque fois que l'écran est focalisé ou que le statut de favori change.

  // Définir l'icône de favori.
  let bookmarkIcon = (
    <FontAwesome name={"bookmark-o"} size={25} color={"#753742"} />  // Icône de favoris non sélectionné (bookmark-o).
  );

  // Si l'article est marqué comme favori, on change l'icône et son style.
  let bookmarkStyle = styles.notBookmarked;
  if (bookmarkedColor) {
    bookmarkIcon = <FontAwesome name={"bookmark"} size={20} color={"white"} />;  // Icône de favoris sélectionné (bookmark).
    bookmarkStyle = styles.bookmarked;  // Style appliqué si l'article est favori.
  }

  // Définir l'icône à afficher dans la vue.
  let icon = (
    <TouchableOpacity style={bookmarkStyle} onPress={() => handleBookmark()}>
      {bookmarkIcon}  // Lorsque l'icône est cliquée, on change son état via handleBookmark.
    </TouchableOpacity>
  );

  // Si l'écran est "Mes Publications", on change l'icône de favori en une icône de poubelle pour la suppression.
  if (props.isPublication) {
    icon = (
      <TouchableOpacity onPress={() => alertSuppresion()} style={styles.trash}>
        <FontAwesome name={"trash"} size={20} color={"#753742"} />  // Icône de suppression (poubelle).
      </TouchableOpacity>
    );
  }

  // Fonction de gestion des favoris.
  const handleBookmark = async () => {
    if (user.token) {
      setBookmarkedColor(!bookmarkedColor);  // Alterne l'état de la couleur des favoris.

      // Envoie une requête pour ajouter ou retirer l'article des favoris.
      const bookmarkResponse = await fetch(
        `${BACKEND_ADDRESS}/users/updateBookmark/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            articleId: props._id,  // ID de l'article à ajouter ou retirer des favoris.
          }),
        }
      );
      await bookmarkResponse.json();

      // Met à jour les favoris dans le Redux store.
      dispatch(updateBookmark(props._id));
    } else {
      // Si l'utilisateur n'est pas connecté, on lui demande de se connecter.
      Alert.alert(
        "Attention",
        "Veuillez vous connecter pour ajouter un article aux favoris."
      );
    }
    props.refreshOnBookmark(props._id);  // Rafraîchit la liste des favoris après une modification.
  };

  // Fonction pour afficher un alert de confirmation avant la suppression.
  const alertSuppresion = () => {
    Alert.alert("Suppression", "Voulez vous vraiment supprimer cet article ?", [
      {
        text: "Cancel",  // Annuler la suppression.
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteOnClick() },  // Confirmer la suppression.
    ]);
  };

  // Fonction de suppression d'un article.
  const deleteOnClick = async () => {
     // Envoie une requête pour supprimer l'article.
    await fetch(`${BACKEND_ADDRESS}/articles/deleteArticle/${props._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    props.refresherOnDelete(props._id);  // Rafraîchit la liste après suppression de l'article.
  };

  return (
    <TouchableOpacity
      title="Annonce"
      style={styles.annonce}
      onPress={() => {
        // Lorsque l'utilisateur appuie sur l'article, on navigue vers la page de détails de l'annonce.
        props.navigation.navigate("Annonce", props);
      }}
    >
      <View style={styles.topContainer}>
        <Image style={styles.picture} source={{ uri: photo }} />  // Affiche l'image de l'article.
      </View>
      <View style={styles.botContainer}>
        <View style={styles.iconContainer}>{icon}</View>  // Affiche l'icône (favori ou poubelle selon le contexte).
        <View style={styles.information}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>  // Affiche le titre de l'article.
          </View>
          <View style={styles.description}>
            <Text style={styles.descriptionText}>{props.auteur.name}</Text>  // Affiche le nom de l'auteur.
            <Text style={styles.descriptionTextGrey}>{props.categorie.name}</Text>  // Affiche la catégorie de l'article.
            <View style={styles.bookStatus}>
              <Text style={styles.descriptionTextGrey}>{props.etat.condition}</Text>  // Affiche l'état de l'article.
              <Text style={styles.descriptionText}>{props.currentPrice} €</Text>  // Affiche le prix actuel de l'article.
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  annonce: {
    height: 350,
    width: 170,
    borderRadius: 25,
    borderTopLeftRadius: 25,
    alignItems: "center",
    marginHorizontal: 5,
    marginBottom: 20,
  },
  topContainer: {
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  picture: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  botContainer: {
    width: "100%",
    height: "30%",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#DCDEDF",
    backgroundColor: "white",
  },
  iconContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: -35,
    marginRight: 10,
  },
  notBookmarked: {
    borderWidth: 1,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#753742",
    backgroundColor: "white",
  },
  bookmarked: {
    borderWidth: 1,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#753742",
    backgroundColor: "#753742",
  },
  information: {
    width: "100%",
    height: "90%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginLeft: 10,
    marginTop: -20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "35%",
    width: "72%",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
    width: "80%",
  },
  trash: {
    borderWidth: 1,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#753742",
    backgroundColor: "white",
  },
  description: {
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  bookStatus: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  descriptionText: {
    fontSize: 11,
    color: "#753742",
    fontWeight: "bold",
    marginBottom: 5,
  },
  descriptionTextGrey: {
    fontSize: 11,
    color: "#753742",
    marginBottom: 5,
  }
});
