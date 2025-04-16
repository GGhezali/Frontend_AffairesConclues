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
} from "react-native";
import Headers from "./components/Headers";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function AnnonceScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeareaview}>
      {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title */}
      <Headers navigation={navigation} isReturn={true} title={"Annonce"} />
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
              onPress={() => {}}
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
          <Text>Nom de l'annonce</Text>
          <Text>Etat : </Text>
          <Text>Description : </Text>
          <Text>Auteur : </Text>
          <Text>Editeur : </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceInfoLeft}>Prix de départ :</Text>
            <Text>XX €</Text>
            <Text style={styles.priceInfoRight}>Vendeur</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceInfoLeft}>Prix actuel :</Text>
            <Text>XX €</Text>
            <Text style={styles.priceInfoRight}>Username</Text>
          </View>
        </View>
        <View style={styles.timerContainer}>
          <Text>Temps restant</Text>
        </View>
        <View>
          <TouchableOpacity>
            <Text>Contacter le vendeur</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Faire une enchère</Text>
          </TouchableOpacity>
        </View>
        <Button title="Carte" onPress={() => navigation.navigate("Carte")} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
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
    marginTop: -85,
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
  }
});
