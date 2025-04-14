import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function MesPublicationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Publications</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "brown",
  },
  title: {
    fontSize: 20,
  },
});
