import React from "react";
import { Button, StyleSheet, View, Text, SafeAreaView, Platform, StatusBar } from "react-native";
import Headers from "./Headers";
import { useSelector } from "react-redux";

export default function PublierScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  const handlePublish = () => {
    if (user.token) {
      navigation.navigate("Annonce")
    } else {
      navigation.navigate("Connexion")
    }
  }
  
  return (
      <SafeAreaView  style={styles.safeareaview}>
      {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title*/}

        <Headers navigation={navigation} isReturn={true} title={"Publier"} />
        <View style={styles.container}>

        <View style={styles.containt}>
          
        <Text style={styles.title}>Publier</Text>
        <Button
          title="Gallerie"
          onPress={() => navigation.navigate("Gallerie")}
        />
        <Button title="Photo" onPress={() => navigation.navigate("Photo")} />
        <Button
          title="Publier"
          onPress={() => handlePublish()}
        />
        </View>
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
  containt: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCEE",
  }
});
