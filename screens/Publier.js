import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function PublierScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Publier</Text>
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
