import React from "react";
import { Button, StyleSheet, View, Text, SafeAreaView, Platform, StatusBar  } from "react-native";
import Headers from "./components/Headers";

export default function MesEncheresScreen({ navigation }) {
  return (
    <SafeAreaView  style={styles.safeareaview}>
      {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title */}

      <Headers navigation={navigation} isReturn={true} title={"Mes enchères"} />
      <View style={styles.container}>

      <Button
        title="Continuer mes achats"
        onPress={() =>
          navigation.navigate("TabNavigator", { screen: "Acceuil" })
        }
      />
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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5FCEE",
  },
});
