import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
  StatusBar,
} from "react-native";
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
  const [goBackStatus, setGoBackStatus] = useState("off");
  const [gallerieStatus, setGallerieStatus] = useState("off");

  useEffect(() => {
    (async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      setHasPermission(result && result?.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.3 });
    //photo && console.log(photo.uri);
    if (photo) {
      const uri = photo.uri;
      const formData = new FormData();
      formData.append("photoFromFront", {
        uri: uri,
        name: "photo.jpg",
        type: "image/jpeg",
      });
      fetch(`${BACKEND_ADDRESS}:3000/articles/uploadPhoto`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          data.result && dispatch(addPhoto(data.url));
          //navigation.navigate("Gallerie");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleGoBack = () => {
    setGoBackStatus((current) => (current === "off" ? "on" : "off"));
    navigation.navigate("Publier");
  };

  const handleGallerie = () => {
    setGallerieStatus((current) => (current === "off" ? "on" : "off"));
    navigation.navigate("Gallerie");
  };

  if (!hasPermission || !isFocused) {
    return <View />;
  }

  return (
    <CameraView style={{ flex: 1 }} ref={(ref) => (cameraRef.current = ref)}>
      <View style={styles.container3}>
        <View style={styles.container1}>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={() => handleGoBack()}
          >
            <FontAwesome
              name="arrow-left"
              size={25}
              color={goBackStatus === "on" ? "#e8be4b" : "white"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gallerieButton}
            onPress={() => handleGallerie()}
          >
            <FontAwesome
              name="image"
              size={25}
              color={gallerieStatus === "on" ? "#e8be4b" : "white"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.container2}>
          <TouchableOpacity
            style={styles.takePicture}
            onPress={() => takePicture()}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 100,
  },
  container3: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
