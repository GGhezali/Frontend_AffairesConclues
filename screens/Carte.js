import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function CarteScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carte</Text>
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
