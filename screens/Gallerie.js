import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { removePhoto } from "../reducers/article";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function GallerieScreen({ navigation }) {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.article.value);

  const photos = article.photos.map((data, i) => {
    return (
      <View key={i} style={styles.photoContainer}>
        <TouchableOpacity
          onPress={() => dispatch(removePhoto(data))}
          style={styles.deleteIconContainer}
        >
          <FontAwesome
            name="trash-o"
            size={30}
            color="#000000"
            style={styles.deleteIcon}
          />
        </TouchableOpacity>

        <Image source={{ uri: data }} style={styles.photo} />
      </View>
    );
  });

  const handleGoBack = () => {
    navigation.navigate("Photo");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => handleGoBack()}>
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
    textAlign: "center",
  },
  galleryContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
  photoContainer: {
    alignItems: "flex-end",
    position: "relative",
    margin: 10,
  },
  photo: {
    margin: 10,
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  deleteIconContainer: {
    position: "absolute",
    top: 10,
    right: 5,
    padding: 5,
    borderRadius: 15,
    zIndex: 1,
  },
  deleteIcon: {
    marginRight: 10,
  },
});
