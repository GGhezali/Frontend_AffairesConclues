import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Platform, StatusBar  } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Headers from "./components/Headers";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/user";

export default function MonProfilScreen({ navigation }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch the logout action to the Redux store
    dispatch(logout());
    navigation.navigate("TabNavigator", { screen: "Acceuil" });
  }
  
  return (
    <SafeAreaView  style={styles.safeareaview}>
      {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title */}

      <Headers navigation={navigation} isReturn={true} style={styles.header} title={"Mon Profil"} />
      <View style={styles.container}>

      <View style={styles.inputsContainer}>
        <TouchableOpacity style={styles.inputs} onPress={() => navigation.navigate("MesInformations")}>
          <Text>Mes informations</Text>
          <AntDesign name={'caretright'} size={12} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.inputs} onPress={() => navigation.navigate("MesPublications")}>
          <Text>Mes publications</Text>
          <AntDesign name={'caretright'} size={12} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.inputs} onPress={() => navigation.navigate("MesFavoris")}>
          <Text>Mes favoris</Text>
          <AntDesign name={'caretright'} size={12} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.inputs} onPress={() => navigation.navigate("MesEncheres")}>
          <Text>Mes enchères</Text>
          <AntDesign name={'caretright'} size={12} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logout} onPress={() => handleLogout()}>
        <Text style={{ color: '#fff' }}>Déconnexion</Text>
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
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: '#f5fcee',
  },
  header: {
    position: 'absolute',
    top: 0,
  },
  title: {
    fontSize: 20,
  },
  inputsContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '40%',
    width: '100%',
  },
  inputs: {
    backgroundColor: '#a0d9c1',
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 20
  },
  logout: {
    backgroundColor: '#1c7c54',
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    marginBottom: 100,
  }
});
