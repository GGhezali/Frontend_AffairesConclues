import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";

export default function InscriptionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <Button
        title="Home"
        onPress={() =>
          navigation.navigate("TabNavigator", { screen: "Acceuil" })
        }
      />
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
