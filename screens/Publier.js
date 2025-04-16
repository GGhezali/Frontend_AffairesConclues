import React from "react";
import { Button, StyleSheet, View, Text, SafeAreaView, Platform, StatusBar, TouchableOpacity } from "react-native";
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
          
       <View style={styles.alignButtons}>
       <View style={styles.button1}>
          <TouchableOpacity
            title="Gallerie"
            onPress={() => navigation.navigate("Gallerie")}
            >
          <Text style={styles.textButton}>Gallerie</Text>
          </TouchableOpacity>
       </View>

       <View style={styles.button1}>
          <TouchableOpacity
            title="Photo"
            onPress={() => navigation.navigate("Photo")}
            >
          <Text style={styles.textButton}>Photo</Text>
          </TouchableOpacity>
       </View>
       </View>   

       <View style={styles.button2}>
          <TouchableOpacity
            title="Publier"
            onPress={() => handlePublish()}
          >
          <Text style={styles.textButton}>Publier</Text>
          </TouchableOpacity>
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
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5FCEE",
  },
  containt: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCEE",
  },
  alignButtons: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button1: {
    backgroundColor: "#A0D9C1",
    borderRadius: 30,
    width: "40%",
    height: "40",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  button2: {
    backgroundColor: "#1C7C54",
    borderRadius: 30,
    width: "80%",
    height: "40",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  textButton: {
    justifyContent: "center",
    textAlign: "center",
    fontStyle: "bold",
    fontSize: 20,
    color: "white",
    marginTop: 7,
  },
});
