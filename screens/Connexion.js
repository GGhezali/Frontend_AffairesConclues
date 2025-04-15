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
    fetch('http://localhost:3000/users/sign-in', {

      method: 'POST',
  
      headers: { 'Content-Type': 'application/json' },
  
      body: JSON.stringify(email)
  
  })
   .then(response => response.json())
   .then(data => {
     if(email && password){
      console.log('Conexion reussi ')
      navigation.navigate("TabNavigator", { screen: "Acceuil" });
      console.log(email)
     } else {
      console.log('Email ou mot de passe incorecte');
      console.log(email, password)
      
     }
   });
  };


  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <View style={styles.email}>
        <TextInput
          onChangeText={(value) => setEmail(value)}
          value={email}
          placeholder="Email"
        />
      </View>
      <Text>Password</Text>
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
  email: {
    fontSize: 20,
    backgroundColor: "white",
    width: "80%",
    height: 40,
    marginBottom: 20,
    borderRadius: 5,
  },
  password: {
    fontSize: 20,
    backgroundColor: "white",
    width: "80%",
    height: 40,
    marginBottom: 20,
    borderRadius: 5,
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
    marginTop: 7,
  },
});
