import { useState } from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView, Platform, StatusBar 
} from "react-native";
import Headers from "./Headers";

export default function InscriptionScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSignup = () => {
    if (!email || !username || !password) {
      return;
    }
    fetch("http://192.168.100.55:3000/users/sign-up", {
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
          alert("Erreur lors de l'inscription.");
        }
      });
  };

  return (
    <SafeAreaView  style={styles.safeareaview}>
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
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
  },
  greenButton: {
    backgroundColor: "#1C7C54",
    borderRadius: 30,
    width: "80%",
    height: 40,
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
});
