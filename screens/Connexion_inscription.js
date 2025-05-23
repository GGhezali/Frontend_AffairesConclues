import React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Headers from "./components/Headers";

export default function ConnexionInscriptionScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeareaview}>
      <Headers
        navigation={navigation}
        isNavigation={true}
        title={"Connexion / Inscription"}
      />
      <View style={styles.container}>
        {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isNavigation et title */}

        <TouchableOpacity
          title="Connexion"
          onPress={() => navigation.navigate("Connexion")}
          style={styles.connexion}
        >
          <Text style={styles.textConnexion}>Connexion</Text>
        </TouchableOpacity>

        <TouchableOpacity
          title="Inscription"
          onPress={() => navigation.navigate("Inscription")}
          style={styles.inscription}
        >
          <Text style={styles.textConnexion}>Inscription</Text>
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
    backgroundColor: "#FFF8EF",
  },
  connexion: {
    backgroundColor: "#753742",
    borderRadius: 30,
    width: "80%",
    height: "40",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    marginTop: -110,
  },
  textConnexion: {
    justifyContent: "center",
    textAlign: "center",
    fontStyle: "bold",
    fontSize: 20,
    color: "white",
  },
  inscription: {
    backgroundColor: "#753742",
    borderRadius: 30,
    width: "80%",
    height: "40",
    justifyContent: "center",
    alignItems: "center",
  },
});
