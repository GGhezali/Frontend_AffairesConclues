import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useEffect, useState } from "react";

export default function Dropdowns(props) {
  const { isCategorie, isTri, isState, isAuteur, isEditeur } = props;

  const [isCategorieDropdownVisible, setCategorieDropdownVisible] = useState(false);
  const [isTriDropdownVisible, setTriDropdownVisible] = useState(false);
  const [isStateDropdownVisible, setStateDropdownVisible] = useState(false);
  const [isAuteurDropdownVisible, setAuteurDropdownVisible] = useState(false);
  const [isEditeurDropdownVisible, setEditeurDropdownVisible] = useState(false);
  const [selectedCategorie, setSelectedCategorie] = useState("");
  const [selectedTri, setSelectedTri] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedAuteur, setSelectedAuteur] = useState("");
  const [selectedEditeur, setSelectedEditeur] = useState("");
  const [categories, setCategories] = useState([]);
  const [state, setState] = useState([]);
  const [auteur, setAuteur] = useState([]); 
  const [editeur, setEditeur] = useState([]); 
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

  const toggleCategorieDropdown = () => {
    setCategorieDropdownVisible(!isCategorieDropdownVisible); // Open dropdown
    setTriDropdownVisible(false); // Close other dropdown
    setStateDropdownVisible(false); // Close other dropdown
    setAuteurDropdownVisible(false); // Close other dropdown
  };
  const toggleTriDropdown = () => {
    setTriDropdownVisible(!isTriDropdownVisible); // Open dropdown
    setCategorieDropdownVisible(false); // Close other dropdown
    setStateDropdownVisible(false); // Close other dropdown
    setAuteurDropdownVisible(false); // Close other dropdown  
  };
  const toggleStateDropdown = () => {
    setStateDropdownVisible(!isStateDropdownVisible); // Open dropdown
    setCategorieDropdownVisible(false); // Close other dropdown
    setTriDropdownVisible(false); // Close other dropdown
    setAuteurDropdownVisible(false); // Close other dropdown
  };
  const toggleAuteurDropdown = () => {
    setAuteurDropdownVisible(!isAuteurDropdownVisible); // Open dropdown
    setCategorieDropdownVisible(false); // Close other dropdown
    setTriDropdownVisible(false); // Close other dropdown
    setStateDropdownVisible(false); // Close other dropdown
  };
  const toggleEditeurDropdown = () => {
    setEditeurDropdownVisible(!isEditeurDropdownVisible); // Open dropdown
    setCategorieDropdownVisible(false); // Close other dropdown
    setTriDropdownVisible(false); // Close other dropdown
    setStateDropdownVisible(false); // Close other dropdown
    setAuteurDropdownVisible(false); // Close other dropdown  
  };

  useEffect(() => {
    // Fetch categories from the backend-----------------------------------------------------------------------
    (async () => {
      const categoriesResponse = await fetch(`${BACKEND_ADDRESS}:3000/categories`);
      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData.categories.sort((a, b) => a.name.localeCompare(b.name)));

      //--------------------------------------------------------------------------------------------------------

      // Fetch states from the backend--------------------------------------------------------------------------

      const stateResponse = await fetch(`${BACKEND_ADDRESS}:3000/etats`);
      const stateData = await stateResponse.json();
      setState(stateData.etats);

      //--------------------------------------------------------------------------------------------------------

      // Fetch auteurs from the backend ---------------------------------
    
      const auteursResponse = await fetch(`${BACKEND_ADDRESS}:3000/auteurs`);
      const auteursData = await auteursResponse.json();
      console.log("auteurData", auteursData);
      const sortedAuteurList = auteursData.auteurs.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      let auteursList = sortedAuteurList.map((data) => {
        return data.name;
      });
      setAuteur(auteursList);

      console.log("auteur", auteur);
      // --------------------------------------------------------------

      // Fetch editeurs from the backend ---------------------------------
      const editeursResponse = await fetch(`${BACKEND_ADDRESS}:3000/editeurs`);
      const editeursData = await editeursResponse.json();

      const sortedEditeurList = editeursData.editeurs.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      let editeursList = sortedEditeurList.map((data) => {
        return data.name;
      });
      setEditeur(editeursList);

      console.log("editeur", editeur);

      // --------------------------------------------------------------
    })();
  }, []);

  const selectCategorie = (item) => {
    setSelectedCategorie(item.value);
    props.handleCategorie(item.value);
  };
  const selectTri = (item) => {
    setSelectedTri(item.value);
    props.handleTri(item.value);
  }
  const selectEtat = (item) => {
    setSelectedState(item.value);
    props.handleEtat(item.value);
  };
  const selectAuteur = (item) => {
    setSelectedAuteur(item.value);
    props.handleAuteur(item.value);
  };
  const selectEditeur = (item) => {
    setSelectedEditeur(item.value);
    props.handleEditeur(item.value);
  };

  function Dropdown({
    isVisible,
    toggleVisibility,
    data,
    onSelect,
    placeholder,
    selectedValue,
    style,
  }) {
    return (
      <SafeAreaView>
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
        onSelect={(item) => selectCategorie(item)}
        placeholder="Catégorie"
        selectedValue={selectedCategorie}
      />
    );
  }
  if (isTri) {
    return (
      <Dropdown
        style={styles.triContainer}
        isVisible={isTriDropdownVisible}
        toggleVisibility={toggleTriDropdown}
        data={[{ value: "Le plus récent" }, { value: "Prix croissant" }]}
        onSelect={(item) => selectTri(item)}
        placeholder="Trier par"
        selectedValue={selectedTri}
      />
    );
  }
  if (isState) {
    return (
      <Dropdown
        style={styles.stateContainer}
        isVisible={isStateDropdownVisible}
        toggleVisibility={toggleStateDropdown}
        data={state.map((etat) => ({ value: etat.condition }))}
        onSelect={(item) => selectEtat(item)}
        placeholder="Etat"
        selectedValue={selectedState}
      />
    );
  }
  if (isAuteur) {
    return (
      <Dropdown
        style={styles.auteurContainer}
        isVisible={isAuteurDropdownVisible}
        toggleVisibility={toggleAuteurDropdown}
        data={auteur.map((auteur) => ({ value: auteur.name }))}
        onSelect={(item) => selectAuteur(item)}
        placeholder="Auteur"
        selectedValue={selectedAuteur}
      />
    );
  }
  if (isEditeur) {
    return (
      <Dropdown
        style={styles.editeurContainer}
        isVisible={isEditeurDropdownVisible}
        toggleVisibility={toggleEditeurDropdown}
        data={editeur.map((editeur) => ({ value: editeur.name }))}
        onSelect={(item) => selectEditeur(item)}
        placeholder="Editeur"
        selectedValue={selectedEditeur}
      />
    );
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
    zIndex: 10,
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
  auteurContainer: {
    position: "relative",
    width: 160,
  },
  editeurContainer: {
    position: "relative",
    width: 160,
  },
  scrollview: {
    flex: 1,
    padding: 10,
  },
});
