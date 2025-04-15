import { useState } from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function InscriptionScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSignup = () => {
    if (!email || !username || !password) {
      return;
    }
    fetch("http://localhost:3000/users/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          alert("Compte créé !");
          navigation.navigate("Connexion");
        } else {
          alert("Erreur lors de l'inscription.");
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topLeft}>
        <Button
          title="Home"
          onPress={() =>
            navigation.navigate("TabNavigator", { screen: "Acceuil" })
          }
        />
      </View>
      <Text style={styles.title}>S'inscrire</Text>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.greenButton} onPress={handleSignup}>
          <Text style={styles.greenButtonText}>Créer mon compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gris",
    padding: 20,
  },
  topLeft: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 100,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  greenButton: {
    backgroundColor: "#005f00",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  greenButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
