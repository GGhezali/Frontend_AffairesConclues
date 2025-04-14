import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";

export default function PageAcceuilScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page d'acceuil</Text>
      <Button
        title="Connexion / Inscription"
        onPress={() => navigation.navigate("ConnexionInscription")}
      />
      <Button title="Annonce" onPress={() => navigation.navigate("Annonce")} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "cyan",
  },
  title: {
    fontSize: 20,
  },
});
