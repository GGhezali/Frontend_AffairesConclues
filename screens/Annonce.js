import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Headers from "./components/Headers";
import Modals from "./components/Modals";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function AnnonceScreen({ route }) {
  const props = route.params;
  console.log(props.acheteur)
  const lastAcheteur = props.acheteur[props.acheteur.length - 1].username;

  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [miseModalVisible, setMiseModalVisible] = useState(false);

  const toggleVendeur = () => {
      setContactModalVisible(true);
  };
  const toggleCloseVendeur = () => {
      setContactModalVisible(false);
  };
  const toggleMise = () => {
    setMiseModalVisible(true);
  };
  const toggleCloseMise = () => {
    setMiseModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeareaview}>
      {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title */}
      <Headers
        navigation={route.params.navigation}
        isReturn={true}
        title={"Annonce"}
      />
      <ScrollView style={styles.scrollview}>
        <View style={styles.container}>
          <Text style={styles.title}>{props.titre}</Text>
          <View style={styles.pictureContainer}>
            <Image style={styles.picture} alt="Images" />
            <View style={styles.iconContainer}>
              <TouchableOpacity style={styles.icon}>
                <FontAwesome
                  name={"map"}
                  size={25}
                  color={"#39D996"}
                  onPress={() => route.params.navigation.navigate("Carte", props.localisation)}
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
          </View>
          <View style={styles.informationContainer}>
            <View style={styles.textInfo}>
              <Text style={styles.textParams}>Etat</Text>
              <Text style={styles.description}> : {props.etat.condition}</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textParams}>Categorie</Text>
              <Text style={styles.description}> : {props.categorie.name}</Text>
            </View>
            <View style={styles.textInfoDescription}>
              <Text style={styles.textParams}>Description</Text>
              <Text style={styles.description}>{props.description}</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textParams}>Auteur</Text>
              <Text style={styles.description}> : {props.auteur.name}</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textParams}>Editeur</Text>
              <Text style={styles.description}> : {props.editeur.name}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceInfoLeft}>Prix de départ :</Text>
              <Text style={styles.priceInfo}>{props.startPrice} €</Text>
              <Text style={styles.priceInfoRight}>
                {props.annonceur.username}
              </Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceInfoLeft}>Prix actuel :</Text>
              <Text style={styles.priceInfo}>{props.currentPrice} €</Text>
              <Text style={styles.priceInfoRight}>
                {lastAcheteur}
              </Text>
            </View>
          </View>
          <View style={styles.timerContainer}>
            <Text style={styles.timer}>{props.timer}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonContact} onPress={() => toggleVendeur()}>
              <Text style={styles.buttonTextContact}>Contacter le vendeur</Text>
            </TouchableOpacity>
            <Modals contactVendeur={true} visibleContact={contactModalVisible} onCloseContact={toggleCloseVendeur} annonceurInfo={props.annonceur} />
            <TouchableOpacity style={styles.buttonBid} onPress={() => toggleMise()}>
              <Text style={styles.buttonTextBid}>Faire une enchère</Text>
            </TouchableOpacity>
            <Modals mise={true} visibleMise={miseModalVisible} onCloseMise={toggleCloseMise} />
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
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5FCEE",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  pictureContainer: {
    width: "100%",
    height: 500,
    backgroundColor: "grey",
    marginBottom: 20,
    alignItems: "center",
  },
  picture: {
    height: "88%",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
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
    marginBottom: 20,

  },
  textInfo: {
    flexDirection: "row",
    marginBottom: 5,
  },
  textInfoDescription: {
    marginBottom: 5,
  },
  textParams: {
    fontWeight: 500,
    textDecorationLine: "underline",
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
    marginBottom: 5,
  },
  priceInfoLeft: {
    width: 100,
    textAlign: "left",
    fontWeight: 500,
    textDecorationLine: "underline",
  },
  priceInfo: {
    width: 50,
    textAlign: "right"
  },
  priceInfoRight: {
    width: 100,
    textAlign: "right",
  },
  timerContainer: {
    width: "65%",
    height: 50,
    backgroundColor: "#B1CF5F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#dcdedf",
    marginBottom: 20,
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
    marginBottom: 50,
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
