import React from "react";
import { Button, StyleSheet, View, Text, SafeAreaView, Platform, StatusBar } from "react-native";
import Headers from "./components/Headers";

export default function AnnonceScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeareaview}>
      {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title */}
      <Headers navigation={navigation} isReturn={true} title={"Annonce"} />
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
    backgroundColor: "red",
  },
  title: {
    fontSize: 20,
  },
});
