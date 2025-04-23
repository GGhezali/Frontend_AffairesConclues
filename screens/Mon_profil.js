import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Headers from "./components/Headers";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import { useIsFocused } from "@react-navigation/native";

export default function MonProfilScreen({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused(); // Hook pour savoir si l'écran est en focus
  const user = useSelector((state) => state.user.value); // Récupération de l'utilisateur depuis le store Redux

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("TabNavigator", { screen: "Acceuil" });
  };

  useEffect(() => {
    if (!user.token) {
      navigation.navigate("ConnexionInscription");
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.safeareaview}>
      {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title */}

      <Headers
        navigation={navigation}
        isReturn={true}
        style={styles.header}
        title={"Mon Profil"}
      />
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <TouchableOpacity
            style={styles.inputs}
            onPress={() => navigation.navigate("MesInformations")}
          >
            <Text style={styles.textbutton}>Mes informations</Text>
            <AntDesign name={"caretright"} size={12} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.inputs}
            onPress={() => navigation.navigate("MesPublications")}
          >
            <Text style={styles.textbutton}>Mes publications</Text>
            <AntDesign name={"caretright"} size={12} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.inputs}
            onPress={() => navigation.navigate("MesFavoris")}
          >
            <Text style={styles.textbutton}>Mes favoris</Text>
            <AntDesign name={"caretright"} size={12} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.inputs}
            onPress={() => navigation.navigate("MesEncheres")}
          >
            <Text style={styles.textbutton}>Mes enchères</Text>
            <AntDesign name={"caretright"} size={12} color={"white"} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logout} onPress={() => handleLogout()}>
          <Text style={{ color: "#fff" }}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    position: "absolute",
    top: 0,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF8EF",
  },
  inputsContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '40%',
    width: '100%',
    marginTop: 50,
  },
  inputs: {
    backgroundColor: "#AA5042",
    width: "70%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 20,
  },
  textbutton: {
    color: "#fff",
    fontSize: 16,
    marginRight: 10,
    textAlign: "center",
    width: "80%",
  },
  logout: {
    backgroundColor: "#380F05",
    width: "70%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 20,
    marginBottom: 100,
  },
});
