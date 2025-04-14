import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function AnnonceScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Annonce</Text>
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
