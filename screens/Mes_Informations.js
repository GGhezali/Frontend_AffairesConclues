import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Headers from "./components/Headers";

export default function MesInformationsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeareaview}>
      {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title */}

      <Headers
        navigation={navigation}
        isReturn={true}
        title={"Mes informations"}
      />

      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <ScrollView style={{ width: "100%" }}>
            <Text style={styles.title}>Email</Text>
            <View style={styles.head}>
              <View style={styles.input}>
                <TextInput style={styles.placeholder} placeholder="Email" />
                <FontAwesome name={"pencil"} size={16} color={"#39d996"} />
              </View>
            </View>
            <Text style={styles.title}>Username</Text>
            <View style={styles.head}>
              <View style={styles.input}>
                <TextInput style={styles.placeholder} placeholder="Username" />
                <FontAwesome name={"pencil"} size={16} color={"#39d996"} />
              </View>
            </View>
            <Text style={styles.title}>Password</Text>
            <View style={styles.head}>
              <View style={styles.input}>
                <TextInput style={styles.placeholder} placeholder="********" />
                <FontAwesome name={"pencil"} size={16} color={"#39d996"} />
              </View>
            </View>
            <Text style={styles.title}>Données bancaires</Text>
            <View style={styles.head}>
              <View style={styles.input}>
                <TextInput
                  style={styles.placeholder}
                  placeholder="**** **** **** **** ***"
                />
                <FontAwesome name={"pencil"} size={16} color={"#39d996"} />
              </View>
            </View>
            <Text style={styles.title}>Téléphone</Text>
            <View style={styles.head}>
              <View style={styles.input}>
                <TextInput style={styles.placeholder} placeholder="Téléphone" />
                <FontAwesome name={"pencil"} size={16} color={"#39d996"} />
              </View>
            </View>
            <TouchableOpacity style={styles.greenButton}>
              <Text style={styles.greenButtonText}>Enregistrer</Text>
            </TouchableOpacity>
          </ScrollView>
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
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    marginTop: 20,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  inputsContainer: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 10,
    borderWidth: 0.5,
    alignItems: "center",
    marginTop: 30,
    height: "90%",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    borderColor: "#dcdedf",
    width: "90%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    aspectRatio: 1,
  },
  greenButton: {
    backgroundColor: "#1C7C54",
    borderRadius: 30,
    width: "80%",
    height: 40,
    marginTop: 40,
    marginLeft: 25,
  },

  greenButtonText: {
    justifyContent: "center",
    textAlign: "center",
    fontStyle: "bold",
    fontSize: 20,
    color: "white",
    marginTop: 7,
  },
});
