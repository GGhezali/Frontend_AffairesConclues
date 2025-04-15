import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";

export default function ConnexionInscriptionScreen({ navigation }) {
<<<<<<< HEAD
  const clientId = process.env.GOOGLE_CLIENT_ID;

=======
  
  //const clientId = process.env.GOOGLE_CLIENT_ID;
  
>>>>>>> 9b44c6dedf24d26cc7b746ea8326d295abc1ffee
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <Button
        title="Home"
        onPress={() =>
          navigation.navigate("TabNavigator", { screen: "Acceuil" })
        }
      />
      <Button
        title="Connexion"
        onPress={() => navigation.navigate("Connexion")}
      />
      <Button
        title="Inscription"
        onPress={() => navigation.navigate("Inscription")}
      />
<<<<<<< HEAD
=======

     

>>>>>>> 9b44c6dedf24d26cc7b746ea8326d295abc1ffee
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
  title: {
    fontSize: 20,
  },
});
