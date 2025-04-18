import React from "react";
import { Button, StyleSheet, View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity, Platform, StatusBar  } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { removePhoto } from '../reducers/article';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';


export default function GallerieScreen({navigation}) {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.article.value);
  const [goBackStatus, setGoBackStatus] = useState("off");
  
  const photos = article.photos.map((data, i) => {
    return (
      <View key={i} style={styles.photoContainer}>
        <TouchableOpacity onPress={() => dispatch(removePhoto(data))}>
          <FontAwesome name='times' size={20} color='#000000' style={styles.deleteIcon} />
        </TouchableOpacity>

        <Image source={{ uri: data }} style={styles.photo} />
      </View>
    );
  });

  const handleGoBack = () => {
    setGoBackStatus((current) => (current === "off" ? "on" : "off"));
    navigation.navigate("Photo");
  }
  
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.title}>Gallerie</Text>

      <TouchableOpacity style={styles.goBackButton} onPress={() => handleGoBack()}>
        <FontAwesome name="arrow-left" size={25} color={goBackStatus === "on" ? "#e8be4b" : "white"} />
      </TouchableOpacity>

    </View>
    <ScrollView contentContainerStyle={styles.galleryContainer}>
        {photos}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
  },
  title: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  galleryContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  photoContainer: {
    alignItems: 'flex-end',
  },
  photo: {
    margin: 10,
    width: 150,
    height: 150,
  },
  deleteIcon: {
    marginRight: 10,
  },
});
