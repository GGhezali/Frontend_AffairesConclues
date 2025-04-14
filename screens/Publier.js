import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";

export default function PublierScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Publier</Text>
      <Button title="Home" onPress={() => navigation.navigate("Gallerie")} />
      <Button title="Gallerie" onPress={() => navigation.navigate("PageAcceuil")} />
      <Button title="Photo" onPress={() => navigation.navigate("Photo")} />
      <Button title="Publier" onPress={() => navigation.navigate("Annonce")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "magenta",
  },
  title: {
    fontSize: 20,
  },
});
