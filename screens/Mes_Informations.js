import React from "react";
import { StyleSheet, View, Text, TextInput, SafeAreaView, Platform, StatusBar  } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Headers from "./components/Headers";

export default function MesInformationsScreen({ navigation }) {
  return (
    <SafeAreaView  style={styles.safeareaview}>
      {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title */}

      <Headers
        navigation={navigation}
        isReturn={true}
        title={"Mes informations"}
      />
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <View style={styles.input}>
            <TextInput style={styles.placeholder} placeholder="Email" />
            <FontAwesome name={"pencil"} size={16} color={"#39d996"} />
          </View>
          <View style={styles.input}>
            <TextInput style={styles.placeholder} placeholder="Username" />
            <FontAwesome name={"pencil"} size={16} color={"#39d996"} />
          </View>
          <View style={styles.input}>
            <TextInput style={styles.placeholder} placeholder="Password" />
            <FontAwesome name={"pencil"} size={16} color={"#39d996"} />
          </View>
          <View style={styles.input}>
            <TextInput
              style={styles.placeholder}
              placeholder="Données bancaires"
            />
            <FontAwesome name={"pencil"} size={16} color={"#39d996"} />
          </View>
          <View style={styles.input}>
            <TextInput style={styles.placeholder} placeholder="Téléphone" />
            <FontAwesome name={"pencil"} size={16} color={"#39d996"} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeareaview: {
      flex: 1,
      // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
  container: {
    flex: 1,
    backgroundColor: "#f5fcee",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginTop: 50,
  },
  inputsContainer: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 10,
    borderWidth: 0.5,
    alignItems: "center",
    marginTop: 50,
  },
  input: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  placeholder: {
    width: "80%",
    borderRadius: 5,
    borderWidth: 0.5,
    marginTop: 30,
    marginBottom: 30,
    padding: 10,
  },
});
