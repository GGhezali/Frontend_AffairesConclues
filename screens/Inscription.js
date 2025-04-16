import { useState } from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";

import { Ionicons } from "@expo/vector-icons"; // Assure-toi d’avoir installé expo/vector-icons ou react-native-vector-icons

import Headers from "./components/Headers";

export default function InscriptionScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(false);

  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

  const handleSignup = () => {
    if (!email || !username || !password) {
      return;
    }
    fetch(`${BACKEND_ADDRESS}:3000/users/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.result) {
          alert("Compte créé !");
          navigation.navigate("Connexion");
        } else {
          alert(data.error);
        }
      });
  };

  const handleIconPress = () => {
    setMessage(!message);
  };

  return (
    <SafeAreaView style={styles.safeareaview}>
      {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title */}

      <Headers
        navigation={navigation}
        isReturn={true}
        style={styles.header}
        title={"Inscription"}
      />
      <View style={styles.container}>
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
        <Text style={styles.emailText}>Username</Text>
        <View style={styles.input}>
          <TextInput
            onChangeText={(value) => setUsername(value)}
            value={username}
            placeholder="John le républicain"
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

          <View style={styles.row}>
            <TouchableOpacity onPress={handleIconPress}>
              <Ionicons
                name="information-circle-outline"
                size={28}
                color="#007AFF"
              />
            </TouchableOpacity>
          </View>

          {message && (
            <View style={styles.messageBox}>
              <Text style={styles.message}>• 8 caractères minimum</Text>
              <Text style={styles.message}>• 1 Majuscule requise</Text>
              <Text style={styles.message}>• 1 Caractère spécial requis</Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.greenButton} onPress={handleSignup}>
          <Text style={styles.greenButtonText}>Créer mon compte</Text>
        </TouchableOpacity>
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
    backgroundColor: "#F5FCEE",
  },
  header: {
    position: "absolute",
    top: 0,
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
    height:40
  },
  greenButton: {
    backgroundColor: "#1C7C54",
    borderRadius: 30,
    width: "80%",
    height: 40,
    marginTop: 60
  },

  greenButtonText: {
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
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
height: 40,
    marginTop: -25,
    marginRight: 10,
  },

  messageBox: {
    backgroundColor: "#f8f8f8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    height: 55,
  },
  message: {
    fontSize: 14,
    color: "#333",
  },
});
