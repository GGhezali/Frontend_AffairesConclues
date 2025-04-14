import React, { useCallback, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function PageAcceuilScreen({ navigation }) {
  const [categorie, setCategorie] = useState(false);
  const [tri, setTri] = useState(false);
  const [value, setValue] = useState('');

  const toggleCategorie = () => {
    setCategorie(!categorie)
  };
  const toggleTri = () => {
    setTri(!tri)
  };
  const selectCategorie = (item => {
    setValue(item.value)
    setCategorie(false)
  });

  return (
    <View style={styles.container}>
      <View style={styles.dropdownInputs}>
        <TouchableOpacity style={styles.categorie} onPress={toggleCategorie}>
          <Text>Catégorie</Text>
          <AntDesign name={categorie?'caretup':'caretdown'} size={12} />
        </TouchableOpacity>
        {categorie ? (
          <View style={styles.categoriesList}>
          <FlatList keyExtractor={(item) => item.value}
          data={[
            {value: 'Catégorie 1'},
            {value: 'Catégorie 2'},
          ]}
          renderItem={({item}) => (
            <TouchableOpacity activeOpacity={0.8} style={styles.categorieItem} onPress={() => selectCategorie(item)}>
              <Text>{item.value}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{height: 10}} />} />
          </View> ) : null}

        <TouchableOpacity style={styles.tri} onPress={toggleTri}>
          <Text>Trier par</Text>
          <AntDesign name={tri?'caretup':'caretdown'} size={12} />
        </TouchableOpacity>
        {tri ? (
          <View style={styles.triList}>
          <FlatList keyExtractor={(item) => item.value}
          data={[
            {value: 'Date'},
            {value: 'Prix'},
          ]}
          renderItem={({item}) => (
            <TouchableOpacity activeOpacity={0.8} style={styles.triItem}>
              <Text>{item.value}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{height: 10}} />} />
          </View> ) : null}

      </View>
      <View>
        <Button title="Connexion / Inscription" onPress={() => navigation.navigate("ConnexionInscription")} />
        <Button title="Annonce" onPress={() => navigation.navigate("Annonce")} /> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCEE',
    justifyContent: 'space-around',
  },
  dropdownInputs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  categorie: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 160,
    height: 40,
    borderWidth: 0.5,
    borderRadius: 50
  },
  tri: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 120,
    height: 40,
    borderWidth: 0.5,
    borderRadius: 50
  },
  categorieItem: {
    height: 40,
    justifyContent: 'center',
  },
  categoriesList: {
    position: 'absolute',
    top: 50,
    backgroundColor: '#ffffff',
    width: 160,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    maxHeight: 250,
  },
  triItem: {
    height: 40,
    justifyContent: 'center',
  },
  triList: {
    position: 'absolute',
    top: 50,
    left: 240,
    backgroundColor: '#ffffff',
    width: 120,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    maxHeight: 250,
  },
});
