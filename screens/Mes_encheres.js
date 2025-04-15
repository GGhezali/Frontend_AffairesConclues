import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function MesEncheresScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        start={[0, 1]}
        end={[1, 0]}
        colors={["#E1F2B4", "#B1CF5F"]}
        style={styles.header}
      >
        <Text>Header</Text>
      </LinearGradient>
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
  header: {
    height: 100,
    width: "100%",
    flexDirection: "row",
  },
});
