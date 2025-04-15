import React from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Headers from "./Headers";

import { useState, useEffect } from "react";

export default function ConnexionScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSumbit = () => {
    if (!email || !password) {
      return;
    }
    fetch("http://192.168.100.55:3000/users/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        
        if (data.result) {
          alert("Connexion reussie !");
          navigation.navigate("TabNavigator", { screen: "Acceuil" })
        } else {
          alert("Erreur lors de la connexion.");
        }
      });
  };

  return (
    <View style={styles.container}>
      <Headers navigation={navigation} isReturn={true} />
      <View style={styles.topLeft}>
        <Button
          title="Home"
          onPress={() =>
            navigation.navigate("TabNavigator", { screen: "Acceuil" })
          }
        />
      </View>
      <Text style={styles.emailText}>Email</Text>
      <View style={styles.input}>
        <TextInput
          onChangeText={(value) => setEmail(value)}
          value={email}
          placeholder="john.doe@hotmail.com"
        />
      </View>
      <Text style={styles.passwordText}>Password</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCEE",
  },
  topLeft: {
    position: "absolute",
    top: 50,
    left: 20,
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
    backgroundColor: "#1C7C54",
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
    marginTop: 7,
  },
  emailText: {
    display: "flex",
    justifyContent: "flex-start",
  },
});
