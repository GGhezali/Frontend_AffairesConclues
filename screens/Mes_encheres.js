import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import Headers from "./Headers";

export default function MesEncheresScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Headers  navigation={navigation} isReturn={true} title={"Mes enchères"}  />

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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5FCEE",
  },
});
