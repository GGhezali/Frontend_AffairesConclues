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
} from "react-native";
import Headers from "./components/Headers";
import { useSelector } from "react-redux";
import { useState } from "react";
import Dropdowns from "./components/Dropdowns";

export default function PublierScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const handlePublish = () => {
    if (user.token) {
      navigation.navigate("Annonce");
    } else {
      navigation.navigate("Connexion");
    }
  };

  return (
    <SafeAreaView style={styles.safeareaview}>
      {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title*/}

      <Headers navigation={navigation} isReturn={true} title={"Publier"} />
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.inputText}>Titre</Text>
          <View style={styles.input}>
            <TextInput
              secureTextEntry={true}
              onChangeText={(value) => setTitle(value)}
              value={title}
              placeholder="Titre"
            />
          </View>

          <Dropdowns isCategorie={true} />

          <Dropdowns isState={true} />

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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#F5FCEE",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    height: "100%",

    backgroundColor: "white",
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

  alignButtons: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button1: {
    backgroundColor: "#A0D9C1",
    borderRadius: 30,
    width: "40%",
    height: "40",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  button2: {
    backgroundColor: "#1C7C54",
    borderRadius: 30,
    width: "100%",
    height: "40",
    marginBottom: 30,
  },
  textButton: {
    justifyContent: "center",
    textAlign: "center",
    fontStyle: "bold",
    fontSize: 20,
    color: "white",
    marginTop: 7,
  },
});
