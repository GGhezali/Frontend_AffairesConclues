import React from "react";
import { Button, StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from "react-native";

export default function ConnexionInscriptionScreen({ navigation }) {
  
  //const clientId = process.env.GOOGLE_CLIENT_ID;
  
  return (
    <View style={styles.container}>
      
      <Button
      style={styles.topLeft}
        title="Home"
        onPress={() =>
          navigation.navigate("TabNavigator", { screen: "Acceuil" })
        }
      />
     
  <View style={styles.connexion}>
        <TouchableOpacity title="Connexion" onPress={() => navigation.navigate("Connexion")}>
          <Text style={styles.textConnexion}>Connexion</Text>
        </TouchableOpacity>
      </View>
   

      <View style={styles.connexion}>
            <TouchableOpacity title="Connexion" onPress={() => navigation.navigate("Inscription")}>
              <Text style={styles.textConnexion}>Inscription</Text>
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
    borderColor:'#dcdedf',
    width: "80%",
  },
  connexion: {
    backgroundColor: "#1C7C54",
    borderRadius: 30,
    width: "80%",
    height: '6%',
    marginTop: 20,
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
