import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  StatusBar,
  ImageBackground,
} from "react-native";
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

  let connectIcon = "user-circle";

  if (user.token) {
    connectIcon = "check-circle";
  }

  if (isReturn) {
    return (
      <ImageBackground
        source={require("../../assets/header.png")}
        style={styles.header}
      >
        <TouchableOpacity style={styles.return}>
          <AntDesign
            name={"left"}
            size={25}
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </ImageBackground>
    );
  }

  if (isHome) {
    return (
      <ImageBackground
        source={require("../../assets/header.png")}
        style={styles.header}
        resizeMode="cover"
      >
        <View style={styles.searchcontainer}>
          <View style={styles.input} >
          <TextInput placeholder="Rechercher un livre" onChangeText={(text) => onSearch(text)} />
          </View>
          <TouchableOpacity style={styles.search} activeOpacity={1}>
            <AntDesign name={"search1"} size={18} />
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
        source={require("../../assets/header.png")}
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
        <Text style={styles.titleNavigation}>{title}</Text>
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
    marginBottom: 3,
  },
  return: {
    color: "#380F05",
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  title: {
    position: "center",
    fontSize: 24,
    fontFamily: "Roboto",
    color: "#380F05",
    marginRight: 65,
    textAlign: "center",
    width: "75%",
  },
  titleNavigation: {
    fontSize: 24,
    fontFamily: "Roboto",
    color: "#380F05",
    marginRight: 90,
    textAlign: "center",
    width: "70%",
  },
  searchcontainer: {
    width: "88%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "75%",
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
    justifyContent: "center",
  },
  search: {
    height: 50,
    width: "18%",
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
    marginLeft: 30,
    backgroundColor: "#FFF8EF",
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#753742",
    marginLeft: 40,
  },
  home: {
    fontSize: 20,
    color: "#753742",
  },
});
