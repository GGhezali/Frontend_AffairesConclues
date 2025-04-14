import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";

export default function MesInformationsScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Informations</Text>
      <Button title="Go Back" onPress={() => navigation.navigate("MonProfil")} />
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
