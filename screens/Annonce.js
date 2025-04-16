import React from "react";
import {
  Button,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import Headers from "./components/Headers";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function AnnonceScreen({route}) {

  const props = route.params;
  
console.log(props)

  return (
    <SafeAreaView style={styles.safeareaview}>
      {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title */}
      <Headers navigation={route.params.navigation} isReturn={true} title={"Annonce"} />
      <ScrollView style={styles.scrollview}>
      <View style={styles.container}>
        <View style={styles.pictureContainer}>
          <Image alt="Images" />
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.icon}>
            <FontAwesome
              name={"map"}
              size={25}
              color={"#39D996"}
              onPress={() => route.params.navigation.navigate("Carte")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <FontAwesome
              name={"bookmark-o"}
              size={25}
              color={"#39D996"}
              onPress={() => {}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.informationContainer}>
          <Text style={styles.title}>Nom de l'annonce</Text>
          <Text style={styles.description}>Etat : </Text>
          <Text style={styles.description}>
            Description : En ce début d'année à Poudlard, une grande nouvelle
            attend Harry, Ron et Hermione : la tenue d'un tournoi de magie
            exceptionnel entre les plus célèbres écoles de sorcellerie. Déjà les
            délégations étrangères font leur entrée. Harry se réjouit... Trop...
          </Text>
          <Text style={styles.description}>Auteur : </Text>
          <Text style={styles.description}>Editeur : </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceInfoLeft}>Prix de départ :</Text>
            <Text>XX €</Text>
            <Text style={styles.priceInfoRight}>Vendeur</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceInfoLeft}>Prix actuel :</Text>
            <Text>XX €</Text>
            <Text style={styles.priceInfoRight}>Encherisseur</Text>
          </View>
        </View>
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>Temps restant</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonContact}>
            <Text style={styles.buttonTextContact}>Contacter le vendeur</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonBid}>
            <Text style={styles.buttonTextBid}>Faire une enchère</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollview: {
    flex: 1,
    backgroundColor: "#F5FCEE",
  },
  container: {
    height: 1000,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F5FCEE",
    padding: 20,

  },
  pictureContainer: {
    width: "100%",
    height: "50%",
    backgroundColor: "grey",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: -100,
  },
  icon: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#39D996",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  informationContainer: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "grey",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  priceInfoLeft: {
    width: 100,
    textAlign: "left",
  },
  priceInfoRight: {
    width: 100,
    textAlign: "right",
  },
  timerContainer: {
    width: "65%",
    height: "8%",
    backgroundColor: "#B1CF5F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#dcdedf",
  },
  timer: {
    color: "grey",
    fontSize: 18,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonContact: {
    width: "45%",
    height: 50,
    backgroundColor: "#A0D9C1",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#dcdedf",
  },
  buttonBid: {
    width: "45%",
    height: 50,
    backgroundColor: "#1C7C54",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#dcdedf",
  },
  buttonTextContact: {
    color: "#1B512D",
  },
  buttonTextBid: {
    color: "white",
  },
});
