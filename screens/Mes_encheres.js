import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";

export default function MesEncheresScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Enchères</Text>

      <Button
        title="Continuer mes achats"
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
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
  },
});
