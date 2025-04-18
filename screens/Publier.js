import React from "react";
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
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import Headers from "./components/Headers";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Dropdowns from "./components/Dropdowns";
import DatalistInput from "@avul/react-native-datalist-input";
import {
  AutocompleteDropdownContextProvider,
  AutocompleteDropdown,
} from "react-native-autocomplete-dropdown";

export default function PublierScreen({ navigation }) {
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;
  const user = useSelector((state) => state.user.value);
  const article = useSelector((state) => state.article.value); // article.photos = [image_url] A transmettre à la route publish //
  const [title, setTitle] = useState(""); // TITLE A transmettre à la route publish //
  const [description, setDescription] = useState(""); // DESCRIPTION A transmettre à la route publish //
  const [price, setPrice] = useState(0); // PRIX A transmettre à la route publish //
  const [auteur, setAuteur] = useState(""); // AUTEUR A transmettre à la route publish //
  const [editeur, setEditeur] = useState(""); // EDITEUR A transmettre à la route publish //
  const [auteurList, setAuteurList] = useState([]);
  const [editeurList, setEditeurList] = useState([]);
  const [categorie, setCategorie] = useState(""); // CATEGORIE A transmettre à la route publish //
  const [etat, setEtat] = useState(""); // ETAT A transmettre à la route publish //
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(""); // LOCALISATION A transmettre à la route publish // output example: {"context": "75, Paris, Île-de-France", "coordinates": [2.309977, 48.825993], "title": "8 Rue Maurice Bouchor 75014 Paris"}
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // Fetch auteurs from the backend ---------------------------------
    (async () => {
      const auteursResponse = await fetch(`${BACKEND_ADDRESS}:3000/auteurs`);
      const auteursData = await auteursResponse.json();

      const sortedAuteurList = auteursData.auteurs.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      const auteursList = sortedAuteurList.map((data) => {
        return data.name;
      });
      setAuteurList(auteursList);

      // --------------------------------------------------------------

      // Fetch editeurs from the backend ---------------------------------
      const editeursResponse = await fetch(`${BACKEND_ADDRESS}:3000/editeurs`);
      const editeursData = await editeursResponse.json();

      const sortedEditeurList = editeursData.editeurs.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      const editeursList = sortedEditeurList.map((data) => {
        return data.name;
      });
      setEditeurList(editeursList);

      // --------------------------------------------------------------
    })();
  }, []);

  useEffect(() => {
    fetch(`https://api-adresse.data.gouv.fr/search/?q=${input}`)
      .then((response) => response.json())
      .then((data) => {
        let table = [];
        for (let obj of data.features) {
          table.push({
            title: obj.properties.label,
            context: obj.properties.context,
            coordinates: obj.geometry.coordinates,
          });
        }
        setPlaces(table);
      });
  }, [input]);

  const handlePublish = () => {
    if (user.token) {

      fetch(`${BACKEND_ADDRESS}:3000/articles/publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          title: title,
          description: description,
          price: price,
          auteur: auteur,
          editeur: editeur,
          categorie: categorie,
          etat: etat,
          localisation: output,
          photoUrl: article.photos,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            console.log("Article published successfully");
          }})
        .catch((error) => {
          console.error("Error publishing article:", error);
          alert(error);
        });
      alert("Votre annonce a été publiée avec succès.");
      // console.log("Article published successfully");

      navigation.navigate("Annonce");
    } else {
      navigation.navigate("Connexion");
    }
  };

  const handleCategorie = (categorie) => {
    setCategorie(categorie);
    // console.log("categorie ==", categorie);
  };
  const handleEtat = (etat) => {
    setEtat(etat);
    // console.log("etat ==", etat);
  };

  return (
    <SafeAreaView style={styles.safeareaview}>
      <KeyboardAvoidingView style={{ width: "100%", height: "100%" }}>
        {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title*/}
        <Headers navigation={navigation} isReturn={true} title={"Publier"} />

        <View style={styles.alignDropdowns}>
          <Dropdowns isCategorie={true} handleCategorie={handleCategorie} />
          <Dropdowns isState={true} handleEtat={handleEtat} />
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

          <Text style={styles.inputText}>Auteur</Text>
          <DatalistInput
            value={auteur}
            onChangeText={(value) => setAuteur(value)}
            data={auteurList}
            style={styles.datalistInput}
            placeholder="Auteur"
          />

          <Text style={styles.inputText}>Editeur</Text>
          <DatalistInput
            value={editeur}
            onChangeText={(value) => setEditeur(value)}
            data={editeurList}
            style={styles.datalistInput}
            placeholder="Editeur"
          />

          <Text style={styles.inputText}>Prix de départ</Text>
          <View style={styles.input}>
            <TextInput
              keyboardType="numeric"
              secureTextEntry={true}
              onChangeText={(value) => setPrice(value)}
              value={price}
              placeholder="Prix de départ"
            />
          </View>

          <Text style={styles.inputText}>Localisation</Text>
          <AutocompleteDropdownContextProvider>
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              closeOnSubmit={true}
              onChangeText={(value) => setInput(value)}
              onSelectItem={(value) => setOutput(value)}
              dataSet={places}
            />
          </AutocompleteDropdownContextProvider>

          <View style={styles.alignButtons}>
            <View style={styles.button1}>
              <TouchableOpacity
                title="Gallerie"
                onPress={() => navigation.navigate("Gallerie")}
              >
                <Text style={styles.textButton}>Gallerie</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.button1}>
              <TouchableOpacity
                title="Photo"
                onPress={() => navigation.navigate("Photo")}
              >
                <Text style={styles.textButton}>Photo</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.button2}>
            <TouchableOpacity title="Publier" onPress={() => handlePublish()}>
              <Text style={styles.textButton}>Publier</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#F5FCEE",
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
  etat: {},
  alignButtons: {
    width: "100%",
    height: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  alignDropdowns: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  button1: {
    backgroundColor: "#A0D9C1",
    borderRadius: 30,
    width: "40%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  button2: {
    backgroundColor: "#1C7C54",
    padding: 3,
    borderRadius: 30,
    width: "100%",
    height: 50,
    marginBottom: 30,
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
    marginTop: 7,
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
});
