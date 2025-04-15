import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import Headers from "./Headers";

export default function MesFavorisScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Headers navigation={navigation} isReturn={true} title={"Mes Favoris"} />
      <Button title="Go Back" onPress={() => navigation.navigate("MonProfil")} />
      <Button title="Annonce" onPress={() => navigation.navigate("Annonce")} />  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
  title: {
    fontSize: 20,
  },
});
