import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Platform,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useEffect, useState } from "react";
//commentaire surprise !
export default function Dropdowns(props) {
  // Les "props" sont des informations envoyées au composant depuis un autre composant parent.
  // Elles nous indiquent quels types de menus déroulants (dropdowns) afficher. Par exemple, si `isCategory` est vrai, on affiche le dropdown pour les catégories.
  const { isCategory, isSorting, isState, isAuthor, isEditor } = props;

  // Déclaration des états pour chaque menu déroulant
  // Chaque état garde une information sur la visibilité du dropdown (affiché ou caché) et sur l'option sélectionnée
  const [isCategoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
  const [isSortingDropdownVisible, setSortingDropdownVisible] = useState(false);
  const [isStateDropdownVisible, setStateDropdownVisible] = useState(false);
  const [isAuthorDropdownVisible, setAuthorDropdownVisible] = useState(false);
  const [isEditorDropdownVisible, setEditorDropdownVisible] = useState(false);

  // Les états ci-dessous stockent la valeur de l'option sélectionnée dans chaque dropdown
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSorting, setSelectedSorting] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedEditor, setSelectedEditor] = useState("");

  // Déclaration des états pour stocker les données provenant du backend (catégories, états, auteurs, éditeurs)
  const [categories, setCategories] = useState([]);
  const [state, setState] = useState([]);
  const [author, setAuthor] = useState([]);
  const [editor, setEditor] = useState([]);


  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

  // Ces fonctions ouvrent ou ferment chaque menu déroulant en modifiant la visibilité
  const toggleCategoryDropdown = () => {
    setCategoryDropdownVisible(!isCategoryDropdownVisible); // Inverse la visibilité du dropdown "Catégorie"
  };
  const toggleSortingDropdown = () => {
    setSortingDropdownVisible(!isSortingDropdownVisible); // Inverse la visibilité du dropdown "Trier par"
  };
  const toggleStateDropdown = () => {
    setStateDropdownVisible(!isStateDropdownVisible); // Inverse la visibilité du dropdown "Etat"
  };
  const toggleAuthorDropdown = () => {
    setAuthorDropdownVisible(!isAuthorDropdownVisible); // Inverse la visibilité du dropdown "Auteur"
  };
  const toggleEditorDropdown = () => {
    setEditorDropdownVisible(!isEditorDropdownVisible); // Inverse la visibilité du dropdown "Editeur"
  };

  // useEffect permet de récupérer les données depuis le backend dès que le composant est monté (affiché à l'écran)
  useEffect(() => {
    (async () => {
      // Récupérer les catégories depuis le backend
      const categoriesResponse = await fetch(`${BACKEND_ADDRESS}:3000/categories`);
      const categoriesData = await categoriesResponse.json();
      // Trier les catégories par ordre alphabétique et les stocker
      setCategories(categoriesData.categories.sort((a, b) => a.name.localeCompare(b.name)));

      // Récupérer les états depuis le backend
      const stateResponse = await fetch(`${BACKEND_ADDRESS}:3000/etats`);
      // Fetch les états depuis le backend
      const stateData = await stateResponse.json();
      setState(stateData.etats);

      // Récupérer les auteurs depuis le backend
      const authorResponse = await fetch(`${BACKEND_ADDRESS}:3000/auteurs`);
      const authorData = await authorResponse.json();
      const sortedAuthorlist = authorData.auteurs.sort((a, b) => a.name.localeCompare(b.name));
      setAuthor(sortedAuthorlist);

      // Fetch les editeurs depuis le backend
      const editorResponse = await fetch(`${BACKEND_ADDRESS}:3000/editeurs`);
      const editorData = await editorResponse.json();
      const sortedEditorList = editorData.editeurs.sort((a, b) => a.name.localeCompare(b.name));
      setEditor(sortedEditorList);
    })();
  }, []); // L'array vide [] signifie que cette fonction ne se déclenche qu'une seule fois, lors du chargement initial du composant

  // Ces fonctions sont appelées lorsque l'utilisateur sélectionne une option dans l'un des menus déroulants
  // Elles mettent à jour l'état du composant (la valeur sélectionnée) et appellent des fonctions passées en props pour informer le parent de la sélection
  const selectCategory = (item) => {
    setSelectedCategory(item.value); // Met à jour la catégorie sélectionnée
    props.handleCategory(item.value); // Appelle la fonction du parent pour informer du choix
  };
  const selectSorting = (item) => {
    setSelectedSorting(item.value); // Met à jour le critère de tri sélectionné
    props.handleSort(item.value); // Appelle la fonction du parent pour informer du choix
  };
  const selectState = (item) => {
    setSelectedState(item.value); // Met à jour l'état sélectionné
    props.handleState(item.value); // Appelle la fonction du parent pour informer du choix
  };
  const selectAuthor = (item) => {
    setSelectedAuthor(item.value); // Met à jour l'auteur sélectionné
    props.handleAuthor(item.value); // Appelle la fonction du parent pour informer du choix
  };
  const selectEditor = (item) => {
    setSelectedEditor(item.value); // Met à jour l'éditeur sélectionné
    props.handleEditor(item.value); // Appelle la fonction du parent pour informer du choix
  };

  // Le composant Dropdown est utilisé pour afficher chaque menu déroulant (catégorie, tri, état, etc.)
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
        {/* Ce bouton permet d'ouvrir ou de fermer le menu déroulant */}
        <TouchableOpacity onPress={toggleVisibility} style={styles.dropdown}>
          <Text>{selectedValue || placeholder}</Text> {/* Affiche la valeur sélectionnée ou un texte par défaut */}
          <AntDesign name={isVisible ? "caretup" : "caretdown"} size={12} /> {/* Icône pour ouvrir/fermer le menu */}
        </TouchableOpacity>
        
        {/* Si le menu est visible, on affiche la liste des options */}
        {isVisible && (
          <View
            style={[
              styles.dropdownList,
              Platform.OS === "ios" ? styles.iosDropdown : styles.androidDropdown,
            ]}
          >
            <FlatList
              keyExtractor={(item) => item.value} // Utilise la valeur comme identifiant unique pour chaque élément
              data={data} // Les options du menu sont données ici
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.8} // Ajoute un effet lorsqu'on clique sur une option
                  style={styles.dropdownItem} // Style pour chaque élément du menu
                  onPress={() => {
                    onSelect(item); // Appelle la fonction qui gère la sélection
                    toggleVisibility(); // Ferme le menu après la sélection
                  }}
                >
                  <Text>{item.value}</Text> {/* Affiche la valeur de l'option */}
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />} // Séparateur entre les options du menu
            />
          </View>
        )}
      </SafeAreaView>
    );
  }

  // Rendu conditionnel : on affiche le dropdown approprié en fonction des props reçues
  if (isCategory) {
    return (
      <Dropdown
        style={styles.categoryContainer} // Style pour le dropdown "Catégorie"
        isVisible={isCategoryDropdownVisible} // L'état de visibilité du dropdown
        toggleVisibility={toggleCategoryDropdown} // Fonction pour ouvrir/fermer le menu
        data={categories.map((categoryValue) => ({
          value: categoryValue.name,
        }))} // Données pour le menu : les catégories
        onSelect={(item) => selectCategory(item)} // Fonction pour gérer la sélection de la catégorie
        placeholder="Catégorie" // Texte affiché si rien n'est sélectionné
        selectedValue={selectedCategory} // Valeur sélectionnée dans le dropdown
      />
    );
  }

  // De même pour les autres types de menus déroulants (Trier par, Etat, Auteur, Editeur)
  if (isSorting) {
    return (
      <Dropdown
        style={styles.sortingContainer} // Style pour le dropdown "Trier par"
        isVisible={isSortingDropdownVisible} // L'état de visibilité du dropdown
        toggleVisibility={toggleSortingDropdown} // Fonction pour ouvrir/fermer le menu
        data={[
          { value: "Le plus récent" },
          { value: "Le plus ancien" },
          { value: "Prix croissant" },
          { value: "Prix décroissant" },
        ]} // Données pour le menu : les options de tri
        onSelect={(item) => selectSorting(item)} // Fonction pour gérer la sélection du tri
        placeholder="Trier par" // Texte affiché si rien n'est sélectionné
        selectedValue={selectedSorting} // Valeur sélectionnée dans le dropdown
      />
    );
  }

  if (isState) {
    return (
      <Dropdown
        style={styles.stateContainer}
        isVisible={isStateDropdownVisible}
        toggleVisibility={toggleStateDropdown}
        data={state.map((stateValue) => ({ value: stateValue.condition }))}
        onSelect={(item) => selectState(item)}
        placeholder="Etat"
        selectedValue={selectedState}
      />
    );
  }

  if (isAuthor) {
    return (
      <Dropdown
        style={styles.authorContainer}
        isVisible={isAuthorDropdownVisible}
        toggleVisibility={toggleAuthorDropdown}
        data={author.map((authorValue) => ({ value: authorValue.name }))}
        onSelect={(item) => selectAuthor(item)}
        placeholder="Auteur"
        selectedValue={selectedAuthor}
      />
    );
  }

  if (isEditor) {
    return (
      <Dropdown
        style={styles.editorContainer}
        isVisible={isEditorDropdownVisible}
        toggleVisibility={toggleEditorDropdown}
        data={editor.map((editorValue) => ({ value: editorValue.name }))}
        onSelect={(item) => selectEditor(item)}
        placeholder="Editeur"
        selectedValue={selectedEditor}
      />
    );
  }
}


const styles = StyleSheet.create({
  //  dropdownContainer: {
  //    zIndex: Platform.OS === "ios" ? 9999 : 1, // Assurez un zIndex élevé pour iOS et Android
  //    position: "relative", // Permet de positionner la liste correctement
  //  },
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
  categoryContainer: {
    position: "relative",
    width: 160,
  },
  sortingContainer: {
    position: "relative",
    width: 160,
  },
  stateContainer: {
    position: "relative",
    width: 160,
  },
  authorContainer: {
    position: "relative",
    width: 160,
  },
  editorContainer: {
    position: "relative",
    width: 160,
  },
  scrollview: {
    flex: 1,
    padding: 10,
  },
});
