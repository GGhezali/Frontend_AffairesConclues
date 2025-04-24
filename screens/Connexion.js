import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from "react-native";
import Headers from "./components/Headers";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

export default function ConnexionScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

  const handleSumbit = () => {
    if (!email || !password) {
      return;
    }
    fetch(`${BACKEND_ADDRESS}/users/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          dispatch(login(data.token));
          Alert.alert("Connexion", "Connexion reussi");
          navigation.navigate("TabNavigator", { screen: "Acceuil" });
        } else {
          Alert.alert("Attention", data.error);
        }
      });
  };

  return (
    <SafeAreaView style={styles.safeareaview}>
      {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title */}

      <Headers navigation={navigation} isReturn={true} title={"Connexion"} />
      <View style={styles.container}>
        <Text style={styles.emailText}>Email</Text>
        <View style={styles.input}>
          <TextInput
            onChangeText={(value) => setEmail(value)}
            value={email}
            placeholder="john.doe@hotmail.com"
          />
        </View>
        <Text>Password</Text>
        <View style={styles.input}>
          <TextInput
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            value={password}
            placeholder="********"
          />
        </View>

        <View style={styles.connexion}>
          <TouchableOpacity title="Connexion" onPress={() => handleSumbit()}>
            <Text style={styles.textConnexion}>Connexion</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8EF",
  },
  emailText: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: -100,
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
    width: "80%",
  },
  connexion: {
    backgroundColor: "#753742",
    borderRadius: 30,
    width: "80%",
    height: 40,
  },
  textConnexion: {
    justifyContent: "center",
    textAlign: "center",
    fontStyle: "bold",
    fontSize: 20,
    color: "white",
    marginTop: 8,
  },
});
