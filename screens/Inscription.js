import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function InscriptionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
  },
  title: {
    fontSize: 20,
  },
});
