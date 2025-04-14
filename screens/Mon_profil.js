import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function MonProfilScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon profil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "aqua",
  },
  title: {
    fontSize: 20,
  },
});
