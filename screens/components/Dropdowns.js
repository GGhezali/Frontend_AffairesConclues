import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useEffect, useState } from "react";

export default function Dropdowns(props) {
  // Destructure les props pour obtenir les valeurs nécessaires
  const { isCategory, isSorting, isState, isAuthor, isEditor } = props;

  // Etats pour gérer la visibilité des dropdowns et les valeurs sélectionnées
  const [isCategoryDropdownVisible, setCategoryDropdownVisible] = useState(
    false
  );
  const [isSortingDropdownVisible, setSortingDropdownVisible] = useState(false);
  const [isStateDropdownVisible, setStateDropdownVisible] = useState(false);
  const [isAuthorDropdownVisible, setAuthorDropdownVisible] = useState(false);
  const [isEditorDropdownVisible, setEditorDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSorting, setSelectedSorting] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedEditor, setSelectedEditor] = useState("");
  const [categories, setCategories] = useState([]);
  const [state, setState] = useState([]);
  const [auteur, setAuteur] = useState([]);
  const [editeur, setEditeur] = useState([]);
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

  // Ouvre le dropdown "Catégorie"
  const toggleCategoryDropdown = () => {
    setCategoryDropdownVisible(!isCategoryDropdownVisible);
  };
  // Ouvre le dropdown "Trier par"
  const toggleTriDropdown = () => {
    setSortingDropdownVisible(!isSortingDropdownVisible);
  };
  // Ouvre le dropdown "Etat"
  const toggleStateDropdown = () => {
    setStateDropdownVisible(!isStateDropdownVisible);
  };
  // Ouvre le dropdown "Auteur"
  const toggleAuteurDropdown = () => {
    setAuthorDropdownVisible(!isAuthorDropdownVisible);
  };
  // Ouvre le dropdown "Editeur"
  const toggleEditeurDropdown = () => {
    setEditorDropdownVisible(!isEditorDropdownVisible);
  };

  useEffect(() => {
    (async () => {
      // Fetch les catégories depuis le backend
      const categoriesResponse = await fetch(
        `${BACKEND_ADDRESS}:3000/categories`
      );
      const categoriesData = await categoriesResponse.json();
      setCategories(
        categoriesData.categories.sort((a, b) => a.name.localeCompare(b.name))
      );

      // Fetch les états depuis le backend
      const stateResponse = await fetch(`${BACKEND_ADDRESS}:3000/etats`);
      const stateData = await stateResponse.json();
      setState(stateData.etats);

      // Fetch les auteurs depuis le backend
      const authorResponse = await fetch(`${BACKEND_ADDRESS}:3000/auteurs`);
      const authorData = await authorResponse.json();
      const sortedAuthorlist = authorData.auteurs.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setAuteur(sortedAuthorlist);

      // Fetch les editeurs depuis le backend
      const editorResponse = await fetch(`${BACKEND_ADDRESS}:3000/editeurs`);
      const editorData = await editorResponse.json();
      const sortedEditorList = editorData.editeurs.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setEditeur(sortedEditorList);
    })();
  }, []);

  // Fonctions pour gérer la sélection de l'élément "Catégorie"
  // Cette fonction est appelée lorsque l'utilisateur sélectionne une option dans le dropdown "Catégorie"
  const selectCategorie = (item) => {
    setSelectedCategory(item.value);
    props.handleCategorie(item.value);
  };
  // Fonction pour gérer la sélection de l'élément "Trier par"
  // Cette fonction est appelée lorsque l'utilisateur sélectionne une option dans le dropdown "Trier par"
  const selectTri = (item) => {
    setSelectedSorting(item.value);
    props.handleSort(item.value);
  };
  // Fonction pour gérer la sélection de l'élément "Etat"
  // Cette fonction est appelée lorsque l'utilisateur sélectionne une option dans le dropdown "Etat"
  const selectEtat = (item) => {
    setSelectedState(item.value);
    props.handleState(item.value);
  };
  // Fonction pour gérer la sélection de l'élément "Auteur"
  // Cette fonction est appelée lorsque l'utilisateur sélectionne une option dans le dropdown "Auteur"
  const selectAuteur = (item) => {
    setSelectedAuthor(item.value);
    props.handleAuthor(item.value);
  };
  // Fonction pour gérer la sélection de l'élément "Editeur"
  // Cette fonction est appelée lorsque l'utilisateur sélectionne une option dans le dropdown "Editeur"
  const selectEditeur = (item) => {
    setSelectedEditor(item.value);
    props.handleEditor(item.value);
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
      <SafeAreaView style={[styles.dropdownContainer, style]}>
        <TouchableOpacity onPress={toggleVisibility} style={styles.dropdown}>
          <Text>{selectedValue || placeholder}</Text>
          <AntDesign name={isVisible ? "caretup" : "caretdown"} size={12} />
        </TouchableOpacity>
        {isVisible && (
          <View
            style={[
              styles.dropdownList,
              Platform.OS === "ios"
                ? styles.iosDropdown
                : styles.androidDropdown,
            ]}
          >
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

  // Rendu conditionnel des dropdowns en fonction des props
  // Si isCategory est vrai, afficher le dropdown "Catégorie"
  if (isCategory) {
    return (
      <Dropdown
        style={styles.categorieContainer}
        isVisible={isCategoryDropdownVisible}
        toggleVisibility={toggleCategoryDropdown}
        data={categories.map((categorie) => ({ value: categorie.name }))}
        onSelect={(item) => selectCategorie(item)}
        placeholder="Catégorie"
        selectedValue={selectedCategory}
      />
    );
  }
  // Si isSorting est vrai, afficher le dropdown "Trier par"
  if (isSorting) {
    return (
      <Dropdown
        style={styles.triContainer}
        isVisible={isSortingDropdownVisible}
        toggleVisibility={toggleTriDropdown}
        data={[
          { value: "Le plus récent" },
          { value: "Le plus ancien" },
          { value: "Prix croissant" },
          { value: "Prix décroissant" },
        ]}
        onSelect={(item) => selectTri(item)}
        placeholder="Trier par"
        selectedValue={selectedSorting}
      />
    );
  }
  // Si isState est vrai, afficher le dropdown "Etat"
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
  // Si isAuthor est vrai, afficher le dropdown "Auteur"
  if (isAuthor) {
    return (
      <Dropdown
        style={styles.auteurContainer}
        isVisible={isAuthorDropdownVisible}
        toggleVisibility={toggleAuteurDropdown}
        data={auteur.map((auteur) => ({ value: auteur.name }))}
        onSelect={(item) => selectAuteur(item)}
        placeholder="Auteur"
        selectedValue={selectedAuthor}
      />
    );
  }
  // Si isEditor est vrai, afficher le dropdown "Editeur"
  if (isEditor) {
    return (
      <Dropdown
        style={styles.editeurContainer}
        isVisible={isEditorDropdownVisible}
        toggleVisibility={toggleEditeurDropdown}
        data={editeur.map((editeur) => ({ value: editeur.name }))}
        onSelect={(item) => selectEditeur(item)}
        placeholder="Editeur"
        selectedValue={selectedEditor}
      />
    );
  }
}

const styles = StyleSheet.create({
  // dropdownContainer: {
  //   zIndex: Platform.OS === "ios" ? 9999 : 1, // Assurez un zIndex élevé pour iOS et Android
  //   position: "relative", // Permet de positionner la liste correctement
  // },
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
  },
  iosDropdown: {
    zIndex: 9999, // iOS nécessite un zIndex élevé pour afficher les dropdowns
  },
  androidDropdown: {
    zIndex: 10, // Android utilise elevation pour gérer la superposition
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
