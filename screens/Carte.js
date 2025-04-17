import React from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import MapView from "react-native-maps";
import { Marker } from 'react-native-maps';

import Headers from "./components/Headers";

export default function CarteScreen({ navigation, route }) {
  console.log(navigation);
  const props = route.params;
  return (
    <SafeAreaView style={styles.safeareaview}>
      {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title */}
      <Headers navigation={navigation} isReturn={true} title={"Carte"} />
      <MapView
        initialRegion={{
          latitude: props.latitude,
          longitude: props.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        style={{ flex: 1 }}
      >
        <Marker coordinate={{ latitude: props.latitude, longitude: props.longitude }} title={props.adresse} />
      </MapView>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  title: {
    fontSize: 20,
  },
});
