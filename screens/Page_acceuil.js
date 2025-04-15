import React, { useState } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Article from './Article';

export default function PageAcceuilScreen({ navigation }) {
  const [isCategorieDropdownVisible, setCategorieDropdownVisible] = useState(false);
  const [isTriDropdownVisible, setTriDropdownVisible] = useState(false);
  const [value, setValue] = useState('');

  const toggleCategorieDropdown = () => {
    setCategorieDropdownVisible(!isCategorieDropdownVisible)
  };
  const toggleTriDropdown = () => {
    setTriDropdownVisible(!isTriDropdownVisible)
  };

  function Dropdown({ isVisible, toggleVisibility, data, onSelect, placeholder, selectedValue }) {
    return (
      <>
        <TouchableOpacity onPress={toggleVisibility} style={styles.dropdown}>
          <Text>{selectedValue || placeholder}</Text>
          <AntDesign name={isVisible ? 'caretup' : 'caretdown'} size={12} />
        </TouchableOpacity>
        {isVisible && (
          <View style={styles.dropdownList}>
            <FlatList
              keyExtractor={(item) => item.value}
              data={data}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.dropdownItem}
                  onPress={() => onSelect(item)}>
                  <Text>{item.value}</Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />
          </View>
        )}
      </>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Connexion / Inscription" onPress={() => navigation.navigate("ConnexionInscription")} />
      
      <View style={styles.dropdownInputs}>
        <Dropdown
          style={styles.categorie}
          isVisible={isCategorieDropdownVisible}
          toggleVisibility={toggleCategorieDropdown}
          data={[
            { value: 'Catégorie 1' },
            { value: 'Catégorie 2' },
          ]}
          onSelect={(item) => {
            setValue(item.value);
            setCategorieDropdownVisible(false);
          }}
          placeholder="Catégorie"
          selectedValue={value}
        />
        <Dropdown
          style={styles.tri}
          isVisible={isTriDropdownVisible}
          toggleVisibility={toggleTriDropdown}
          data={[
            { value: 'Date' },
            { value: 'Prix' },
          ]}
          onSelect={(item) => {
            console.log(`Selected: ${item.value}`);
            setTriDropdownVisible(false);
          }}
          placeholder="Trier par"
          selectedValue={value}
        />

      </View>
      <ScrollView style={styles.scrollview}>
        <Article />
      </ScrollView>
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
  scrollview: {
    flex: 1,
    padding: 25
  },
});
