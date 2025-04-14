import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";

export default function AnnonceScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Annonce</Text>
      {/* <Button title="Go back" onPress={() => navigation.navigate("")} /> */}  {/*  GO BACK !!! */}
      <Button title="Go Back" onPress={() => navigation.navigate("PageAcceuil")} /> 
      <Button title="Carte" onPress={() => navigation.navigate("Carte")} />  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  title: {
    fontSize: 20,
  },
});
