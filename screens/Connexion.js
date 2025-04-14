import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";

export default function ConnexionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexions</Text>
      <Button title="Home" onPress={() => navigation.navigate("PageAcceuil")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "beige",
  },
  title: {
    fontSize: 20,
  },
});
