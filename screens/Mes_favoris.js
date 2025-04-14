import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function MesFavorisScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Favoris</Text>
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
