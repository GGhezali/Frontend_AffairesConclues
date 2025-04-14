import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";

export default function CarteScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carte</Text>
      <Button title="Go back" onPress={() => navigation.navigate("Annonce")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  title: {
    fontSize: 20,
  },
});
