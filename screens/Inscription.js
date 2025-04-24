import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
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
    fetch(`${BACKEND_ADDRESS}/users/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.result) {
          Alert.alert("Compte créé !");
          navigation.navigate("Connexion");
        } else {
          Alert.alert("Attention", data.error);
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
            placeholder="JohnDoe"
          />
        </View>
        <Text style={styles.passwordText}>Password</Text>
        <View style={styles.centerIcon}>
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
                  color="#AA5042"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {message && (
          <View style={styles.messageBox}>
            <Text style={styles.message}>• 8 caractères minimum</Text>
            <Text style={styles.message}>• 1 Majuscule requise</Text>
            <Text style={styles.message}>• 1 Caractère spécial requis</Text>
            <Text style={styles.message}>• 1 Chiffres requis</Text>
          </View>
        )}

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
  header: {
    position: "absolute",
    top: 0,
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
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    borderColor: "#dcdedf",
    width: "80%",
    height: 65,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 10,
  },
  passwordText: {
    display: "flex",
    justifyContent: "flex-start",
  },
  centerIcon: {
    width: "100%",
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    aspectRatio: 1,
  },
  messageBox: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    height: 70,
  },
  message: {
    fontSize: 14,
    color: "#333",
  },
  greenButton: {
    backgroundColor: "#753742",
    borderRadius: 30,
    width: "80%",
    height: 45,
    marginTop: 60,
  },
  greenButtonText: {
    justifyContent: "center",
    textAlign: "center",
    fontStyle: "bold",
    fontSize: 20,
    color: "white",
    marginTop: 10,
  },
});
