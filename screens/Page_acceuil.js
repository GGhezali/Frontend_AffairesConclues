import React, { useEffect, useState } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Article from './Article';
import Headers from './Headers';

export default function PageAcceuilScreen({ navigation }) {
  const [isCategorieDropdownVisible, setCategorieDropdownVisible] =
    useState(false);
  const [isTriDropdownVisible, setTriDropdownVisible] = useState(false);
  const [selectedCategorie, setSelectedCategorie] = useState("");
  const [selectedTri, setSelectedTri] = useState("");
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);

  const toggleCategorieDropdown = () => {
    setCategorieDropdownVisible(!isCategorieDropdownVisible);
    setTriDropdownVisible(false); // Close other dropdown
  };
  const toggleTriDropdown = () => {
    setTriDropdownVisible(!isTriDropdownVisible);
    setCategorieDropdownVisible(false); // Close other dropdown
  };
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;
  //const BACKEND_ADDRESS = "http://192.168.100.65";

  useEffect(() => {
    // Fetch categories from the backend ---------------------------------
    (async () => {
      const categoriesResponse = await fetch(
        `${BACKEND_ADDRESS}:3000/categories`
      );
      const categoriesData = await categoriesResponse.json();

      setCategories(categoriesData);

      //------- fetch articles from the backend---------------------------
      const articlesResponse = await fetch(
        `${BACKEND_ADDRESS}:3000/articles/`
      );
      // get all articles
      const articlesData = await articlesResponse.json();

      // create list of articles' _id to be updated 
      let listId = articlesData.data.map((data) => {
        const now = new Date();
        const end = new Date(
          new Date(data.timer).getTime() + 60 * 60 * 24 * 1000
        );

        if (end.getTime() < now.getTime()) {
          // Select articles id whose isDone will be uddated to true
          //console.log("data._id =>", data._id);
          return data._id
        } 
        });

        listId = listId.filter(( e ) => {
          return e !== undefined;
        });
        //console.log("listId =>", listId);

        // For each articles' id selected fetch the backend to update its isDone property to true
        for (id of listId) {
          console.log(id);
          
          const updateIdResponse = await fetch(
            `${BACKEND_ADDRESS}:3000/articles/updateIsDone`, {
            method: 'POST',
            headers : {'Content-Type': 'application/json'},
            body: JSON.stringify(id)
            });
          
          const updateIdData = await updateIdResponse.json();
          
          console.log(updateIdData)
        }
  

    })();
    //--------------------------------------------------------------------

    // Update articles' isDone category ---------------------------------

    //--------------------------------------------------------------------
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
    <SafeAreaView style={styles.container}>
      <Button
        title="Connexion / Inscription"
        onPress={() => navigation.navigate("ConnexionInscription")}
      />
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
            { value: 'Le plus récent' },
            { value: 'Prix croissant' },
          ]}
          onSelect={(item) => setSelectedTri(item.value)}
          placeholder="Trier par"
          selectedValue={selectedTri}
        />
      </View>
      <ScrollView style={styles.scrollview}>
        <Article navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCEE",
    justifyContent: "space-around",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
