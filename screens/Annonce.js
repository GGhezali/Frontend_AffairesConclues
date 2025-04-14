import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";

export default function AnnonceScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Annonce</Text>
      {/*  GO BACK !!! */}
      <Button
        title="Go Back"
        //onPress={() => navigation.navigate("TabNavigator", { screen: 'Acceuil' })}
        onPress={() => navigation.goBack()}
      />
      <Button title="Carte" onPress={() => navigation.navigate("Carte")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  title: {
    fontSize: 20,
  },
});
