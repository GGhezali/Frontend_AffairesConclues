import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { useEffect, useState, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addPhoto } from "../reducers/article";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function PhotoScreen({ navigation }) {
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;
  const [hasPermission, setHasPermission] = useState(false);
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    // On demande la permission d'accéder à la caméra
    (async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      setHasPermission(result && result?.status === "granted");
    })();
  }, []);
  // Fonction déclenchée lorsque l'utilisateur appuie sur le bouton de prise de photo
  const takePicture = async () => {
    // Prise de photo
    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.3 });

    if (photo) {
      // Envoi de la photo au serveur
      const uri = photo.uri;
      const formData = new FormData();
      formData.append("photoFromFront", {
        uri: uri,
        name: "photo.jpg",
        type: "image/jpeg",
      });
      fetch(`${BACKEND_ADDRESS}/articles/uploadPhoto`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // On ajoute l'URL de la photo au reducer article
          data.result && dispatch(addPhoto(data.url));
        });
    }
  };
  // Fonction déclenchée lorsque l'utilisateur appuie sur le bouton de retour
  const handleGoBack = () => {
    // On retourne à l'écran de publication
    navigation.navigate("Publier");
  };
  // Fonction déclenchée lorsque l'utilisateur appuie sur le bouton de la galerie
  const handleGallerie = () => {
    // On retourne à l'écran de la galerie
    navigation.navigate("Gallerie");
  };

  // Si la permission n'est pas accordée ou si l'écran n'est pas en focus, on ne rend rien
  if (!hasPermission || !isFocused) {
    return <View />;
  }

  // sinon, on rend la caméra
  return (
    <CameraView style={{ flex: 1 }} ref={(ref) => (cameraRef.current = ref)}>
      <View style={styles.container1}>
        <View style={styles.container2}>
          <TouchableOpacity
            onPress={() => handleGoBack()}
            style={styles.goBackButton}
          >
            <FontAwesome name="arrow-left" size={35} color={"white"} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleGallerie()}
            style={styles.gallerieButton}
          >
            <FontAwesome name="image" size={35} color={"white"} />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => takePicture()}
            style={styles.PhotoButton}
          >
            <FontAwesome name="circle-thin" size={95} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  container1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  container2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 100,
  },
  goBackButton: {
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 50,
    padding: 10,
  },
  gallerieButton: {
    marginRight: 20,
    marginTop: 20,
    borderRadius: 50,
    padding: 10,
  },
  PhotoButton: {
    marginBottom: 10,
  },
});
