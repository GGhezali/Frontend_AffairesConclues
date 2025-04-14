import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";

export default function PageAcceuilScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page d'acceuil</Text>
      <Button title="Home" onPress={() => navigation.navigate("PageAcceuil")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "cyan",
  },
  title: {
    fontSize: 20,
  },
});
