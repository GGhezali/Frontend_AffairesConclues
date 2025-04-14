import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function ConnexionInscriptionScreen({ navigation }) {
  
  const clientId = process.env.GOOGLE_CLIENT_ID;
  
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

      <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
              onSuccess={(credentialResponse) => {
                //console.log(credentialResponse.credential);
                const token = credentialResponse.credential;
                const decoded = jwtDecode(token);
                
                console.log(decoded);
                //console.log(decoded.name);
                //console.log(decoded.email);
                //console.log(decoded.picture);
                //setUser({ name: decoded.name, email: decoded.email });
              }}
              //clientId
              //credential
              onError={() => {
                console.log("Login Failed");
              }}
            />

      </GoogleOAuthProvider>

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
