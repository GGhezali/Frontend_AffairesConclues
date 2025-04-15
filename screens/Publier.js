import React from "react";
import { Button, StyleSheet, View, Text, SafeAreaView } from "react-native";
import Headers from "./Headers";

export default function PublierScreen({ navigation }) {
  return (
      <SafeAreaView style={styles.container}>
        <Headers navigation={navigation} isReturn={true} title={"Publier"} />
        <View style={styles.containt}>
          
        <Text style={styles.title}>Publier</Text>
        <Button
          title="Gallerie"
          onPress={() => navigation.navigate("Gallerie")}
        />
        <Button title="Photo" onPress={() => navigation.navigate("Photo")} />
        <Button
          title="Publier"
          onPress={() => navigation.navigate("Annonce")}
        />
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5FCEE",
  },
  containt: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCEE",
  }
});
