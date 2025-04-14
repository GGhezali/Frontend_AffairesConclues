import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";

export default function MonProfilScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon profil</Text>
      <Button title="Home" onPress={() => navigation.navigate("PageAcceuil")} />
      <Button
        title="Mes Informations"
        onPress={() => navigation.navigate("MesInformations")}
      />
      <Button
        title="Mes Publications"
        onPress={() => navigation.navigate("MesPublications")}
      />
      <Button
        title="Mes Favoris"
        onPress={() => navigation.navigate("MesFavoris")}
      />
      <Button
        title="Mes Enchères"
        onPress={() => navigation.navigate("MesEncheres")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "aqua",
  },
  title: {
    fontSize: 20,
  },
});
