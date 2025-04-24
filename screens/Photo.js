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
          data.result && dispatch(addPhoto(data.url));
          //navigation.navigate("Gallerie");
        });
    }
  };

  const handleGoBack = () => {
    navigation.navigate("Publier");
  };

  const handleGallerie = () => {
    navigation.navigate("Gallerie");
  };

  if (!hasPermission || !isFocused) {
    return <View />;
  }

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
