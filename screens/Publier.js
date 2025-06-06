import React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Image,
} from "react-native";
import Headers from "./components/Headers";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Dropdowns from "./components/Dropdowns";
import {
  AutocompleteDropdownContextProvider,
  AutocompleteDropdown,
} from "react-native-autocomplete-dropdown";
import { useIsFocused } from "@react-navigation/native";
import { removeAllPhoto } from "../reducers/article";
import { removePhoto } from "../reducers/article";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ImageModal from "react-native-image-modal";

export default function PublierScreen({ navigation }) {
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;
  const user = useSelector((state) => state.user.value);
  const article = useSelector((state) => state.article.value); // article.photos = [image_url] A transmettre à la route publish //
  const [title, setTitle] = useState(""); // TITLE A transmettre à la route publish //
  const [description, setDescription] = useState(""); // DESCRIPTION A transmettre à la route publish //
  const [price, setPrice] = useState(0); // PRIX A transmettre à la route publish //
  const [author, setAuthor] = useState(""); // AUTEUR A transmettre à la route publish //
  const [editor, setEditor] = useState(""); // EDITEUR A transmettre à la route publish //
  const [categorie, setCategorie] = useState(""); // CATEGORIE A transmettre à la route publish //
  const [state, setState] = useState(""); // ETAT A transmettre à la route publish //
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(""); // LOCALISATION A transmettre à la route publish // output example: {"context": "75, Paris, Île-de-France", "coordinates": [2.309977, 48.825993], "title": "8 Rue Maurice Bouchor 75014 Paris"}
  const [places, setPlaces] = useState([]);
  const [userId, setUserId] = useState(""); // ANNONCEUR A transmettre à la route publish //
  const isFocused = useIsFocused(); // Permet de savoir si la page est focus ou non
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.token) {
      navigation.navigate("ConnexionInscription");
    }
    (async () => {
      // Fetch du backend pour obtenir le UseurId à partir du Token stocké dans le reducer user
      fetch(`${BACKEND_ADDRESS}/users/findUserIdByToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: user.token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setUserId(data.userId);
        });
      // --------------------------------------------------------------
    })();
  }, [isFocused]);

  useEffect(() => {
    // Fetch de l'API data.gouv avec l'input localisation de l'AutocompleteDropdown pour obtenir les données de geolocalisation
    fetch(`https://api-adresse.data.gouv.fr/search/?q=${input}`)
      .then((response) => response.json())
      .then((data) => {
        let table = [];
        for (let i = 0; i < data.features.length; i++) {
          table.push({
            id: i,
            title: data.features[i].properties.label,
            context: data.features[i].properties.context,
            coordinates: data.features[i].geometry.coordinates,
          });
        }
        setPlaces(table);
      });
  }, [input]);
  // ----------------------------------------------------------------------

  // fonction appelée lorsque l'utilisateur appuie sur le bouton "Publier"
  const handlePublish = () => {
    if (user.token) {
      // fetch du backend pour envoyer les données de l'annonce à publier
      fetch(`${BACKEND_ADDRESS}/articles/publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titre: title,
          description: description,
          prix: price,
          auteur: author,
          editeur: editor,
          categorie: categorie,
          etat: state,
          localisation: output,
          photoUrl: article.photos,
          annonceur: userId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            // Si la publication a réussi, on affiche une alerte de succès
            Alert.alert("", "Votre annonce a été publiée avec succès.");
            // Redirection vers la page de mes publications
            navigation.navigate("MesPublications");
          } else {
            throw new Error(data.error);
          }
        })
        .catch((error) => {
          // Si la publication a échoué, on affiche une alerte d'erreur
          Alert.alert("Attention", error.message);
          // Redirection vers la page de publication
          navigation.navigate("Publier");
        });
      // Si la publication a réussi, on vide le tableau des photos du reducer article
      dispatch(removeAllPhoto());
    } else {
      navigation.navigate("Connexion");
    }
  };

  // Fonctions d'inverse data flow pour récupérer les données des dropdowns
  const handleCategory = (categorie) => {
    setCategorie(categorie);
  };
  const handleState = (state) => {
    setState(state);
  };
  const handleAuthor = (author) => {
    setAuthor(author);
  };
  const handleEditor = (editor) => {
    setEditor(editor);
  };

  if (!user.token) {
    return null; // Si l'utilisateur n'est pas connecté, on ne retourne rien
  } else {
    // Si l'utilisateur est connecté, on retourne le composant de publication
    return (
      <SafeAreaView style={styles.safeareaview}>
        <KeyboardAvoidingView style={{ width: "100%", height: "100%" }}>
          {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title*/}
          <Headers
            navigation={navigation}
            isNavigation={true}
            title={"Publier"}
          />

          <View style={styles.alignButtons}>
            <TouchableOpacity
              title="Gallerie"
              style={styles.button1}
              onPress={() => navigation.navigate("Gallerie")}
            >
              <Text style={styles.textButton}>Gallerie</Text>
            </TouchableOpacity>

            <TouchableOpacity
              title="Photo"
              style={styles.button1}
              onPress={() => navigation.navigate("Photo")}
            >
              <Text style={styles.textButton}>Photo</Text>
            </TouchableOpacity>
          </View>
          <View>
            <ScrollView horizontal={true}>
              {article.photos.map((data, i) => {
                return (
                  <View key={i} style={styles.pictureContainer}>
                    <View style={styles.deleteIconContainer}>
                      <TouchableOpacity
                        onPress={() => dispatch(removePhoto(data))}
                        style={styles.deleteIconButton}
                      >
                        <FontAwesome
                          name="trash-o"
                          size={20}
                          color="#000000"
                          style={styles.deleteIcon}
                        />
                      </TouchableOpacity>
                    </View>
                    <ImageModal
                      resizeMode="cover"
                      imageBackgroundColor="#000000"
                      modalImageResizeMode="contain"
                      isTranslucent={true}
                      style={{
                        width: 100,
                        height: 100,
                      }}
                      source={{
                        uri: `${data}`,
                      }}
                    />
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.alignDropdowns}>
            <Dropdowns
              key={0}
              isCategory={true}
              handleCategory={handleCategory}
            />
            <Dropdowns key={1} isState={true} handleState={handleState} />
          </View>

          <View style={styles.alignDropdowns}>
            <Dropdowns key={2} isAuthor={true} handleAuthor={handleAuthor} />
            <Dropdowns key={3} isEditor={true} handleEditor={handleEditor} />
          </View>

          <ScrollView style={styles.container}>
            <Text style={styles.inputText}>Titre</Text>
            <View style={styles.input}>
              <TextInput
                onChangeText={(value) => setTitle(value)}
                value={title}
                placeholder="Titre"
              />
            </View>

            <Text style={styles.inputText}>Description</Text>
            <View style={styles.input}>
              <TextInput
                editable
                textAlignVertical="top"
                multiline={true}
                numberOfLines={4}
                maxLength={600}
                onChangeText={(value) => setDescription(value)}
                value={description}
                placeholder="Description"
              />
            </View>

            <Text style={styles.inputText}>Prix de départ</Text>
            <View style={styles.input}>
              <TextInput
                onChangeText={(value) => setPrice(value)}
                value={price}
                placeholder="Prix de départ"
              />
            </View>

            <Text style={styles.inputText}>Localisation</Text>
            <AutocompleteDropdownContextProvider>
              <AutocompleteDropdown
                flatListProps={{ scrollEnabled: false }}
                clearOnFocus={false}
                closeOnBlur={true}
                closeOnSubmit={true}
                onChangeText={(value) => setInput(value)}
                onSelectItem={(value) => setOutput(value)}
                dataSet={places}
                inputContainerStyle={{
                  borderWidth: 1,
                  borderColor: "#888",
                  backgroundColor: "#fff",
                  padding: 12,
                  borderRadius: 8,
                  marginBottom: 15,
                  fontSize: 16,
                  borderColor: "#dcdedf",
                  width: "100%",
                }}
                textInputProps={{
                  placeholder: "Localisation",
                }}
              />
            </AutocompleteDropdownContextProvider>

            <TouchableOpacity
              title="Publier"
              style={styles.button2}
              onPress={() => handlePublish()}
            >
              <Text style={styles.textButton}>Publier</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#FFF8EF",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderColor: "#dcdedf",
    width: "100%",
  },
  inputText: {
    display: "flex",
    justifyContent: "flex-start",
  },
  categorie: {
    margin: 10,
  },
  alignButtons: {
    width: "100%",
    height: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  pictureContainer: {
    margin: 10,
    alignItems: "flex-end",
  },
  deleteIconContainer: {
    position: "absolute",
    borderRadius: 15,
    zIndex: 1,
    backgroundColor: "white",
  },
  deleteIconButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 25,
    width: 25,
    borderRadius: 50,
  },
  alignDropdowns: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 13,
  },
  button1: {
    backgroundColor: "#AA5042",
    borderRadius: 30,
    width: "42%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  button2: {
    backgroundColor: "#753742",
    padding: 3,
    borderRadius: 30,
    width: "100%",
    height: 50,
    marginBottom: 30,
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    justifyContent: "center",
    textAlign: "center",
    fontStyle: "bold",
    fontSize: 20,
    color: "white",
  },
  datalistInput: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#888",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderColor: "#dcdedf",
    width: "100%",
    height: 70,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
