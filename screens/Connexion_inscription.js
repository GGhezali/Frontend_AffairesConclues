import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";

export default function ConnexionInscriptionScreen({ navigation }) {
  const clientId = process.env.GOOGLE_CLIENT_ID;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <Button
        title="Home"
        onPress={() =>
          navigation.navigate("TabNavigator", { screen: "Acceuil" })
        }
      />
      <Button
        title="Connexion"
        onPress={() => navigation.navigate("Connexion")}
      />
      <Button
        title="Inscription"
        onPress={() => navigation.navigate("Inscription")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
  title: {
    fontSize: 20,
  },
});
