import React from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import Headers from "./Headers";

export default function ConnexionInscriptionScreen({ navigation }) {
  //const clientId = process.env.GOOGLE_CLIENT_ID;

  return (
    <SafeAreaView style={styles.safeareaview}>
      <Headers
        navigation={navigation}
        isNavigation={true}
        title={"Connexion / Inscription"}
      />
      <View style={styles.container}>
        {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isNavigation et title */}
        
          <View style={styles.connexion}>
            <TouchableOpacity
              title="Connexion"
              onPress={() => navigation.navigate("Connexion")}
            >
              <Text style={styles.textConnexion}>Connexion</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inscription}>
            <TouchableOpacity
              title="Inscription"
              onPress={() => navigation.navigate("Inscription")}
            >
              <Text style={styles.textConnexion}>Inscription</Text>
            </TouchableOpacity>
          </View>
       
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
    alignItems: "flex-start",
  },

  connexion: {
    backgroundColor: "#1C7C54",
    borderRadius: 30,
    width: "80%",
    height: "40",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  inscription: {
    backgroundColor: "#1C7C54",
    borderRadius: 30,
    width: "80%",
    height: "40",
    justifyContent: "center",
    alignItems: "center",
   
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
