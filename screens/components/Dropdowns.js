import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useEffect, useState } from "react";

export default function Dropdowns({ isCategorie, isTri, isState }) {
    const [isCategorieDropdownVisible, setCategorieDropdownVisible] =useState(false);
    const [isTriDropdownVisible, setTriDropdownVisible] = useState(false);
    const [isStateDropdownVisible, setStateDropdownVisible] = useState(false);
    const [selectedCategorie, setSelectedCategorie] = useState("");
    const [selectedTri, setSelectedTri] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [categories, setCategories] = useState([]);
    const [state, setState] = useState([]);
    const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

    const toggleCategorieDropdown = () => {
        setCategorieDropdownVisible(!isCategorieDropdownVisible); // Open dropdown
        setTriDropdownVisible(false); // Close other dropdown
        setStateDropdownVisible(false); // Close other dropdown
    };
      const toggleTriDropdown = () => {
        setTriDropdownVisible(!isTriDropdownVisible); // Open dropdown
        setCategorieDropdownVisible(false); // Close other dropdown
        setStateDropdownVisible(false); // Close other dropdown 
    };
    const toggleStateDropdown= () => {
        setStateDropdownVisible(!isStateDropdownVisible); // Open dropdown
        console.log(isStateDropdownVisible);
        setCategorieDropdownVisible(false); // Close other dropdown
        setTriDropdownVisible(false); // Close other dropdown
    };

useEffect(() => {
    // Fetch categories from the backend ---------------------------------
    (async () => {
      const categoriesResponse = await fetch(
        `${BACKEND_ADDRESS}:3000/categories`
      );
      const categoriesData = await categoriesResponse.json();

      setCategories(categoriesData);

      // Fetch articles from the backend based on selected category
      if (selectedCategorie) {
        const response = await fetch(
          `${BACKEND_ADDRESS}:3000/articles?categorie=${selectedCategorie}`
        );
        const data = await response.json();
        setArticles(data);
        console.log("articles =>", data);
      } else {
        setArticles([]);
      }

      const stateResponse = await fetch(`${BACKEND_ADDRESS}:3000/etats`)
      const stateData = await stateResponse.json()
      setState(stateData)
    })();
  }, []);


    function Dropdown({ isVisible, toggleVisibility, data, onSelect, placeholder, selectedValue, style }) {
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

    if (isCategorie) {
        return (
            <Dropdown
                style={styles.categorieContainer}
                isVisible={isCategorieDropdownVisible}
                toggleVisibility={toggleCategorieDropdown}
                data={categories.map((categorie) => ({ value: categorie.name }))}
                onSelect={(item) => setSelectedCategorie(item.value)}
                placeholder="Catégorie"
                selectedValue={selectedCategorie}
            />
        )
    }
    if (isTri) {
        return (
            <Dropdown
                style={styles.triContainer}
                isVisible={isTriDropdownVisible}
                toggleVisibility={toggleTriDropdown}
                data={[{ value: "Le plus récent" }, { value: "Prix croissant" }]}
                onSelect={(item) => setSelectedTri(item.value)}
                placeholder="Trier par"
                selectedValue={selectedTri}
            />
        )
    }
    if (isState) {
        return (
            <Dropdown
                style={styles.stateContainer}
                isVisible={isStateDropdownVisible}
                toggleVisibility={toggleStateDropdown}
                data={state.map((etat) => ({ value: etat.condition }))}
                onSelect={(item) => setSelectedState(item.value)}
                placeholder="Etat"
                selectedValue={selectedState}
            />
        )
    }
}

const styles = StyleSheet.create({
    dropdownInputs: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
    dropdown: {
        backgroundColor: "#ffffff",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: 160,
        height: 40,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "#dcdedf",
    },
    dropdownList: {
        backgroundColor: "#ffffff",
        position: "absolute",
        top: 45,
        width: "100%",
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#dcdedf",
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
    stateContainer: {
        position: "relative",
        width: 160,
    },
    scrollview: {
        flex: 1,
        padding: 10,
    },
});
