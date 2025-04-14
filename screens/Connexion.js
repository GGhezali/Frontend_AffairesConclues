import React from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { useState, useEffect } from "react";

export default function ConnexionScreen({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSumbit = () => {
    
    fetch('h')

    navigation.navigate("TabNavigator", { screen: "Acceuil" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <TextInput
          onChangeText={(value) => setEmail(value)}
          value={email}
          placeholder="Email"
        />
      </View>
      <View style={styles.password}>
        <TextInput
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
          value={password}
          placeholder="password"
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
    backgroundColor: "beige",
  },
  title: {
    fontSize: 20,
    backgroundColor: "white",
    width: "80%",
    height: 40,
    marginBottom: 20,
  },
  password: {
    fontSize: 20,
    backgroundColor: "white",
    width: "80%",
    height: 40,
    marginBottom: 20,
  },
  connexion: {
    backgroundColor: "green",
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
    marginTop:7,
  },
});
