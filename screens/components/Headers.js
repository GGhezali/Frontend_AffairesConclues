import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  StatusBar,
  ImageBackground
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";

export default function Headers({
  navigation,
  isReturn,
  isHome,
  isNavigation,
  title,
  onSearch,
}) {

  const user = useSelector((state) => state.user.value);

  let connectIcon = "user-circle"

  if (user.token) {
    connectIcon = "check-circle"
  }

  if (isReturn) {
    return (
      <ImageBackground
        style={styles.header}
      >
        <AntDesign
          style={styles.return}
          name={"left"}
          size={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>{title}</Text>
      </ImageBackground>
    );
  }

  if (isHome) {
    return (
      <ImageBackground
        style={styles.header}
      >
        <View style={styles.searchcontainer}>
          <TextInput style={styles.input} placeholder="What's up ?" onChangeText={(text) => onSearch(text)} />
          <TouchableOpacity style={styles.search} activeOpacity={1}>
            <AntDesign name={"search1"} size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.connection}>
          <FontAwesome
            name={connectIcon}
            size={30}
            color={"#753742"}
            onPress={() => navigation.navigate("ConnexionInscription")}
          />
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  if (isNavigation) {
    return (
      <ImageBackground
      style={styles.header}
    >
        <TouchableOpacity
          style={styles.homebutton}
          onPress={() =>
            navigation.navigate("TabNavigator", { screen: "Acceuil" })
          }
        >
          <AntDesign name={"home"} size={30} color={"#753742"} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    height: 125,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
    paddingTop: 10,
    borderBottomColor: "#000000",
    borderBottomWidth: 3,
  },
  return: {
    position: "absolute",
    left: 10,
    top: 50,
    color: "#380F05",
  },
  title: {
    position: "center",
    fontSize: 24,
    fontFamily: "Roboto",
    color: "#380F05",
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
    borderColor: "#753742",
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
    borderColor: "#753742",
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
    color: "#753742",
    height: 50,
    width: 50,
    backgroundColor: "#fff",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#753742",
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
    borderColor: "#753742",
  },
  home: {
    fontSize: 20,
    color: "#753742",
  },
});
