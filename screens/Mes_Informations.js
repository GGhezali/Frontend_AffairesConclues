import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Headers from "./Headers";

export default function MesInformationsScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Headers navigation={navigation} isReturn={true} title={"Mes informations"} />
      <View style={styles.inputsContainer}>
        <View style={styles.input}>
          <TextInput style={styles.placeholder} placeholder="Email" />
          <FontAwesome name={'pencil'} size={16} color={'#39d996'} />
        </View>
        <View style={styles.input}>
          <TextInput style={styles.placeholder} placeholder="Username" />
          <FontAwesome name={'pencil'} size={16} color={'#39d996'} />
        </View>
        <View style={styles.input}>
          <TextInput style={styles.placeholder} placeholder="Password" />
          <FontAwesome name={'pencil'} size={16} color={'#39d996'} />
        </View>
        <View style={styles.input}>
          <TextInput style={styles.placeholder} placeholder="Données bancaires" />
          <FontAwesome name={'pencil'} size={16} color={'#39d996'} />
        </View>
        <View style={styles.input}>
          <TextInput style={styles.placeholder} placeholder="Téléphone" />
          <FontAwesome name={'pencil'} size={16} color={'#39d996'} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcee',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: 50
  },
  inputsContainer: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    borderWidth: 0.5,
    alignItems: 'center',
    marginTop: 50
  },
  input: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    
  },
  placeholder: {
    width: '80%',
    borderRadius: 5,
    borderWidth: 0.5,
    marginTop: 30,
    marginBottom: 30,
    padding: 10
  },
});
