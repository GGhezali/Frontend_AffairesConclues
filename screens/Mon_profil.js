import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function MonProfilScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon profil</Text>

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

      <TouchableOpacity style={styles.logout}>
        <Text style={{ color: '#fff' }}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: '#f5fcee',
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
    borderRadius: 20
  }
});
