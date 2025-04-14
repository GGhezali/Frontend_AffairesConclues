import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function MesInformationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Informations</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "violet",
  },
  title: {
    fontSize: 20,
  },
});
