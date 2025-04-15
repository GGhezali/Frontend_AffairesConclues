import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import Headers from "./Headers";

export default function CarteScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Headers navigation={navigation} isReturn={true} title={"Carte"} />
      <Text style={styles.title}>Carte</Text>
      <Button title="Go back" onPress={() => navigation.navigate("Annonce")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  title: {
    fontSize: 20,
  },
});
