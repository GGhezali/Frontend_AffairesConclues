import React from "react";
import { Button, StyleSheet, View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity, Platform, StatusBar  } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { removePhoto } from '../reducers/article';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';


export default function GallerieScreen({navigation}) {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.article.value);
  
  const photos = article.photos.map((data, i) => {
    return (
      <View key={i} style={styles.photoContainer}>
        <TouchableOpacity onPress={() => dispatch(removePhoto(data))} style={styles.deleteIconContainer}>
          <FontAwesome name='trash-o' size={30} color='#000000' style={styles.deleteIcon} />
        </TouchableOpacity>

        <Image source={{ uri: data }} style={styles.photo} />
      </View>
    );
  });

  const handleGoBack = () => {
    navigation.navigate("Photo");
  }
  
  return (
    <SafeAreaView style={styles.container}>
    <View>
      <TouchableOpacity style={styles.goBackButton} onPress={() => handleGoBack()}>
        <FontAwesome name="arrow-left" size={35} color={"black"} />
      </TouchableOpacity>
      <Text style={styles.title}>Gallerie</Text>
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#F5FCEE",
  },
  title: {
    fontSize: 45,
    textAlign: 'center',
  },
  goBackButton:{
  },

  galleryContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  photoContainer: {
    alignItems: 'flex-end',
    position: "relative",
    margin: 10
  },
  photo: {
    margin: 10,
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  deleteIconContainer: {
    position: "absolute", // Positionne l'icône au-dessus de l'image
    top: 10, // Distance depuis le haut
    right: 5, // Distance depuis la droite
    padding: 5, // Ajoute un peu d'espace autour de l'icône
    borderRadius: 15, // Arrondit le fond de l'icône
    zIndex: 1, // Assure que l'icône est au-dessus de l'image
  },
  deleteIcon: {
    marginRight: 10,
  },
});
