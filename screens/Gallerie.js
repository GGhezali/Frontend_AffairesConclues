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
import ImageModal from "react-native-image-modal";

export default function GallerieScreen({ navigation }) {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.article.value);

  const photos = article.photos.map((data, i) => {
    return (
      <View key={i} style={styles.photoContainer}>
        <View style={styles.deleteIconContainer}>
          <TouchableOpacity
            onPress={() => dispatch(removePhoto(data))}
            style={styles.deleteIconButton}
          >
            <FontAwesome
              name="trash-o"
              size={20}
              color="#000000"
              style={styles.deleteIcon}
            />
          </TouchableOpacity>
        </View>

        <ImageModal
          resizeMode="cover"
          imageBackgroundColor="#000000"
          modalImageResizeMode="contain"
          isTranslucent={true}
          style={{
            width: 150,
            height: 150,
          }}
          source={{
            uri: `${data}`,
          }}
        />
      </View>
    );
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => handleGoBack()}
          style={styles.returnButton}
        >
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
    backgroundColor: "#FFF8EF",
  },
  returnButton: {
    marginLeft: 15,
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
    borderRadius: 15,
    zIndex: 1,
    backgroundColor: "white",
  },
  deleteIconButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
    borderRadius: 50,
  },
});
