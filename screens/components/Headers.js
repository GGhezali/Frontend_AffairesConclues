import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
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
          <TouchableOpacity style={styles.search} activeOpacity={1}>
            <AntDesign name={"search1"} size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.connection}>
          <FontAwesome
            name={"user-circle"}
            size={30}
            color={"#1B512D"}
            onPress={() => navigation.navigate("ConnexionInscription")}
          />
        </TouchableOpacity>
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
        <TouchableOpacity
          style={styles.homebutton}
          onPress={() =>
            navigation.navigate("TabNavigator", { screen: "Acceuil" })
          }
        >
          <AntDesign name={"home"} size={30} color={"#1B512D"} />
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
    height: 125,
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
    width: "88%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "78%",
    height: 50,
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: "#1B512D",
    paddingLeft: 10,
    marginTop: 20,
    marginLeft: 15,
    fontSize: 18,
  },
  search: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1B512D",
    borderLeftWidth: 0,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: "#fff",
    marginTop: 20,
    marginRight: 5,
  },
  connection: {
    marginTop: 20,
    marginRight: 10,
    color: "#1B512D",
    height: 50,
    width: 50,
    backgroundColor: "#fff",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#1B512D",
    justifyContent: "center",
    alignItems: "center",
  },
  homebutton: {
    position: "absolute",
    left: 10,
    top: 45,
    backgroundColor: "#fff",
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#1B512D",
  },
  home: {
    fontSize: 20,
    color: "#1B512D",
  },
});
