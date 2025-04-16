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

export default function PublierScreen({ navigation }) {
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;
  const user = useSelector((state) => state.user.value);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [auteur, setAuteur] = useState("");
  const [editeur, setEditeur] = useState("");
  const [auteurList, setAuteurList] = useState([]);
  const [editeurList, setEditeurList] = useState([]);

  useEffect(() => {
    
    // Fetch auteurs from the backend ---------------------------------
    (async () => {
      const auteursResponse = await fetch(
        `${BACKEND_ADDRESS}:3000/auteurs`
      );
      const auteursData = await auteursResponse.json();

      setAuteurList(auteursData.sort((a, b) => a.name.localeCompare(b.name)));
      console.log(auteurList)
     // --------------------------------------------------------------

    // Fetch editeurs from the backend ---------------------------------  
     const editeursResponse = await fetch(
      `${BACKEND_ADDRESS}:3000/editeurs`
    );
    const editeursData = await editeursResponse.json();
    setEditeurList(editeursData.sort((a, b) => a.name.localeCompare(b.name)));
    console.log(editeurList)
   // --------------------------------------------------------------

    })();
  }, []);

  const handlePublish = () => {
    if (user.token) {
      navigation.navigate("Annonce");
    } else {
      navigation.navigate("Connexion");
    }
  };

  return (
    <SafeAreaView style={styles.safeareaview}>
      <KeyboardAvoidingView style={{width: "100%", height: "100%"}}> 
        {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title*/}
        <Headers navigation={navigation} isReturn={true} title={"Publier"} />
        <ScrollView style={styles.container}>
          <Text style={styles.inputText}>Titre</Text>
          <View style={styles.input}>
            <TextInput
              secureTextEntry={true}
              onChangeText={(value) => setTitle(value)}
              value={title}
              placeholder="Titre"
            />
          </View>
          <View style={styles.alignDropdowns}>
            <Dropdowns isCategorie={true} />
            <Dropdowns isState={true} />
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
