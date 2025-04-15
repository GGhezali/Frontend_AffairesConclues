<<<<<<< HEAD
import React, { useState } from "react";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Article from "./Article";
=======
import React, { useEffect, useState } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Article from './Article';
>>>>>>> 53d54a7fdf771c2c7ce32e75e23b1f5c1609a622

export default function PageAcceuilScreen({ navigation }) {
  const [isCategorieDropdownVisible, setCategorieDropdownVisible] =
    useState(false);
  const [isTriDropdownVisible, setTriDropdownVisible] = useState(false);
<<<<<<< HEAD
  const [selectedCategorie, setSelectedCategorie] = useState("");
  const [selectedTri, setSelectedTri] = useState("");
=======
  const [selectedCategorie, setSelectedCategorie] = useState('');
  const [selectedTri, setSelectedTri] = useState('');
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
>>>>>>> bc3749131a8dc75b0641a3de1210b6d90d47f2eb

  const toggleCategorieDropdown = () => {
    setCategorieDropdownVisible(!isCategorieDropdownVisible);
    setTriDropdownVisible(false); // Close other dropdown
  };
  const toggleTriDropdown = () => {
    setTriDropdownVisible(!isTriDropdownVisible);
    setCategorieDropdownVisible(false); // Close other dropdown
  };

<<<<<<< HEAD
  function Dropdown({
    isVisible,
    toggleVisibility,
    data,
    onSelect,
    placeholder,
    selectedValue,
    style,
  }) {
=======
  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
        const response = await fetch('http://192.168.100.51:3000/categories');
        const data = await response.json();
        setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch articles from the backend
    const fetchArticles = async () => {
      if (selectedCategorie) {
        const response = await fetch(`http://192.168.100.51:3000/articles?categorie=${selectedCategorie}`);
        const data = await response.json();
        setArticles(data);
      } else {
        setArticles([])
      }
    };
    fetchArticles();
  }, [selectedCategorie]);

  function Dropdown({ isVisible, toggleVisibility, data, onSelect, placeholder, selectedValue, style }) {
>>>>>>> bc3749131a8dc75b0641a3de1210b6d90d47f2eb
    return (
      <SafeAreaView style={style}>
        <TouchableOpacity onPress={toggleVisibility} style={styles.dropdown}>
          <Text>{selectedValue || placeholder}</Text>
          <AntDesign name={isVisible ? "caretup" : "caretdown"} size={12} />
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
                  }}
                >
                  <Text>{item.value}</Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />
          </View>
        )}
      </SafeAreaView>
    );
  }

  return (
<<<<<<< HEAD
    <SafeAreaView style={styles.container}>
      <Button
        title="Connexion / Inscription"
        onPress={() => navigation.navigate("ConnexionInscription")}
      />
=======
    <View style={styles.container}>
      <Button title="Connexion / Inscription" onPress={() => navigation.navigate("ConnexionInscription")} />
>>>>>>> bc3749131a8dc75b0641a3de1210b6d90d47f2eb
      <View style={styles.dropdownInputs}>
        <Dropdown
          style={styles.categorieContainer}
          isVisible={isCategorieDropdownVisible}
          toggleVisibility={toggleCategorieDropdown}
<<<<<<< HEAD
          data={[{ value: "Catégorie 1" }, { value: "Catégorie 2" }]}
=======
          data={categories.map((categorie) => ({ value: categorie.name }))}
>>>>>>> bc3749131a8dc75b0641a3de1210b6d90d47f2eb
          onSelect={(item) => setSelectedCategorie(item.value)}
          placeholder="Catégorie"
          selectedValue={selectedCategorie}
        />
        <Dropdown
          style={styles.triContainer}
          isVisible={isTriDropdownVisible}
          toggleVisibility={toggleTriDropdown}
<<<<<<< HEAD
          data={[{ value: "Date" }, { value: "Prix" }]}
=======
          data={[
            { value: 'Le plus récent' },
            { value: 'Prix croissant' },
          ]}
>>>>>>> bc3749131a8dc75b0641a3de1210b6d90d47f2eb
          onSelect={(item) => setSelectedTri(item.value)}
          placeholder="Trier par"
          selectedValue={selectedTri}
        />
      </View>
      <ScrollView style={styles.scrollview}>
        <Article navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCEE",
    justifyContent: "space-around",
  },
  dropdownInputs: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dropdown: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 160,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 50,
  },
  dropdownList: {
    backgroundColor: "#ffffff",
    position: "absolute",
    top: 45,
    width: "100%",
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
    position: "relative",
    width: 160,
  },
  triContainer: {
    position: "relative",
    width: 160,
  },
  scrollview: {
    flex: 1,
    padding: 25,
  },
});
