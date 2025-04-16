import React from "react";
import { Button, StyleSheet, View, Text, SafeAreaView, Platform, StatusBar  } from "react-native";
import Headers from "./components/Headers";

export default function MesFavorisScreen({navigation}) {
  return (
    <SafeAreaView  style={styles.safeareaview}>
      {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title */}

      <Headers navigation={navigation} isReturn={true} title={"Mes Favoris"} />
      <View  style={styles.container}>

      <Button title="Go Back" onPress={() => navigation.navigate("MonProfil")} />
      <Button title="Annonce" onPress={() => navigation.navigate("Annonce")} />  
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeareaview: {
      flex: 1,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
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
