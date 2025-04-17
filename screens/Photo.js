import React from "react";
import { Button, StyleSheet, View, Text, Platform, StatusBar  } from "react-native";
import { CameraView, Camera } from 'expo-camera';
import { useEffect, useState, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';




export default function PhotoScreen({navigation}) {
  
  const [hasPermission, setHasPermission] = useState(false);
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();
  
  useEffect(() => {
    (async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      setHasPermission(result && result?.status === 'granted');
    })();
  }, []);


  const takePicture = async () => {                 
    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.3 }); 
    photo && console.log(photo.uri);         
  };


  if (!hasPermission || !isFocused) {
    return <View />;
  }

  return (      
      <CameraView style={{ flex: 1 }} ref={(ref) => (cameraRef.current = ref)}>
        <Button title="Go back" onPress={() => navigation.navigate("Publier")} />
        <Button
          title="Gallerie"
          onPress={() => navigation.navigate("Gallerie")}
        />
        <Button title="Prendre une photo !" onPress={() => takePicture()} />
      </CameraView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
  },
  title: {
    fontSize: 20,
  },
});
