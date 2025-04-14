import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function GallerieScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gallerie</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
  },
  title: {
    fontSize: 20,
  },
});
