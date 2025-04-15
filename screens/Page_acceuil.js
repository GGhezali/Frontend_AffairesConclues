import React, { useEffect, useState } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Article from './Article';

export default function PageAcceuilScreen({ navigation }) {
  const [isCategorieDropdownVisible, setCategorieDropdownVisible] = useState(false);
  const [isTriDropdownVisible, setTriDropdownVisible] = useState(false);
  const [selectedCategorie, setSelectedCategorie] = useState('');
  const [selectedTri, setSelectedTri] = useState('');
  const [categories, setCategories] = useState([]);

  const toggleCategorieDropdown = () => {
    setCategorieDropdownVisible(!isCategorieDropdownVisible);
    setTriDropdownVisible(false); // Close other dropdown
  };

  const toggleTriDropdown = () => {
    setTriDropdownVisible(!isTriDropdownVisible);
    setCategorieDropdownVisible(false); // Close other dropdown
  };

  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
        const response = await fetch('http://192.168.100.51:3000/categories');
        const data = await response.json();
        setCategories(data);
    };
    fetchCategories();
  }, []);

  function Dropdown({ isVisible, toggleVisibility, data, onSelect, placeholder, selectedValue, style }) {
    return (
      <View style={style}>
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
                  onPress={() => {
                    onSelect(item);
                    toggleVisibility();
                  }}>
                  <Text>{item.value}</Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Connexion / Inscription" onPress={() => navigation.navigate("ConnexionInscription")} />
      <View style={styles.dropdownInputs}>
        <Dropdown
          style={styles.categorieContainer}
          isVisible={isCategorieDropdownVisible}
          toggleVisibility={toggleCategorieDropdown}
          data={categories.map((categorie) => ({ value: categorie.name }))}
          onSelect={(item) => setSelectedCategorie(item.value)}
          placeholder="Catégorie"
          selectedValue={selectedCategorie}
        />
        <Dropdown
          style={styles.triContainer}
          isVisible={isTriDropdownVisible}
          toggleVisibility={toggleTriDropdown}
          data={[
            { value: 'Date' },
            { value: 'Prix' },
          ]}
          onSelect={(item) => setSelectedTri(item.value)}
          placeholder="Trier par"
          selectedValue={selectedTri}
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
  dropdown: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 160,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 50,
  },
  dropdownList: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 45,
    width: '100%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    maxHeight: 150,
    zIndex: 1,
  },
  dropdownItem: {
    paddingVertical: 10,
  },
  categorieContainer: {
    position: 'relative',
    width: 160,
  },
  triContainer: {
    position: 'relative',
    width: 160,
  },
  scrollview: {
    flex: 1,
    padding: 25,
  },
});
