import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";

export default function PhotoScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Photo</Text>
      <Button title="Go back" onPress={() => navigation.navigate("Publier")} />
      <Button
        title="Gallerie"
        onPress={() => navigation.navigate("Gallerie")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
  },
  title: {
    fontSize: 20,
  },
});
