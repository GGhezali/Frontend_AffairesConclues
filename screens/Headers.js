import React from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Platform, StatusBar  } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Headers({
  navigation,
  isReturn,
  isHome,
  isNavigation,
  title,
}) {
  if (isReturn) {
    return (
      <LinearGradient
        start={[0, 1]}
        end={[1, 0]}
        colors={["#E1F2B4", "#B1CF5F"]}
        style={styles.header}
      >
        <AntDesign
          style={styles.return}
          name={"left"}
          size={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    );
  }

  if (isHome) {
    return (
      <LinearGradient
        start={[0, 1]}
        end={[1, 0]}
        colors={["#E1F2B4", "#B1CF5F"]}
        style={styles.header}
      >
        <View style={styles.searchcontainer}>
          <TextInput style={styles.input} placeholder="What's up ?" />
          <AntDesign style={styles.search} name={"search1"} size={20} />
        </View>
        <FontAwesome style={styles.connection} name={"user-circle"} size={30} onPress={() => navigation.navigate("ConnexionInscription")} />
      </LinearGradient>
    );
  }

  if (isNavigation) {
    return (
      <LinearGradient
        start={[0, 1]}
        end={[1, 0]}
        colors={["#E1F2B4", "#B1CF5F"]}
        style={styles.header}
      >
        <TouchableOpacity style={styles.homebutton} onPress={() => navigation.navigate("TabNavigator", { screen: "Acceuil" })} >

        <Text style={styles.home}>Home</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
    safeareaview: {
      flex: 1,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
  title: {
    fontSize: 20,
  },
  header: {
    height: "13%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    borderBottomColor: "#94a075",
    borderBottomWidth: 3,
  },
  return: {
    position: "absolute",
    left: 10,
    top: 50,
    color: "#1B512D",
  },
  title: {
    position: "center",
    fontSize: 24,
    fontFamily: "Roboto",
    color: "#1B512D",
  },
  searchcontainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#1B512D",
    paddingLeft: 10,
    marginTop: 20,
    marginLeft: 10,
    fontSize: 18,
  },
  search: {
    position: "absolute",
    right: 40,
    top: 35,
    color: "#1B512D",
  },
  connection: {
    marginTop: 20,
    marginRight: 10,
    color: "#1B512D",
  },
  homebutton: {
    position: "absolute",
    left: 10,
    top: 45,
  },
  home: {
    fontSize: 20,
    color: "#1B512D",

  }
});
