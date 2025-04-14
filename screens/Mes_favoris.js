import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";

export default function MesFavorisScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Favoris</Text>
      <Button title="Go Back" onPress={() => navigation.navigate("MonProfil")} />
      <Button title="Annonce" onPress={() => navigation.navigate("Annonce")} />  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
  title: {
    fontSize: 20,
  },
});
