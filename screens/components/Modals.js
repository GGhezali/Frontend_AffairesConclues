import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useSelector } from "react-redux";

export default function Modals(props) {
  const {
    visibleContact,
    visibleBid,
    onCloseContact,
    onCloseBid,
    announceurInfo,
    articleId,
    contactVendor,
    bid,
  } = props;

  const [bidValue, setBidValue] = useState("");
  const [messageBid, setMessageBid] = useState("");
  const [colorMessage, setColorMessage] = useState("");
  const user = useSelector((state) => state.user.value);
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

  const addBid = () => {
    fetch(`${BACKEND_ADDRESS}:3000/users/findUserIdByToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        let bool = true;

        console.log("data.userId", data.userId);

        if (data.userId) {
          fetch(`${BACKEND_ADDRESS}:3000/users/getUserById/${data.userId}`)
            .then((response) => response.json())
            .then((userData) => {
              console.log(userData.userData.donneeBancaire);
              if (
                userData.userData.donneeBancaire === "" ||
                userData.userData.donneeBancaire === null
              ) {
                props.toggleCloseBid();
                Alert.alert("Attention", "Veuillez renseigner vos données bancaires");
                bool = false;
              }
              if (bool) {
                fetch(`${BACKEND_ADDRESS}:3000/articles/updateCurrentPrice`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    newPrice: bidValue,
                    newBuyer: data.userId,
                    id: articleId,
                  }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    setMessageBid(data.message);
                    if (data.message === "Prix mis à jour avec succès") {
                      props.toggleCloseBid();
                      setMessageBid("");
                      Alert.alert("Enchère", "Prix mis à jour avec succès !");
                    }
                    if (data.message !== "Prix mis à jour avec succès") {
                      props.toggleCloseBid();
                      setMessageBid("");
                      Alert.alert("Attention","Le prix actuel doit respecter la mise minimale");
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }
            });
        } else {
          props.toggleCloseBid();
          setMessageBid("");
          Alert.alert("Attention","Veuillez vous connecter pour enchérir !");
        }
      });
  };

  if (contactVendor) {
    return (
      <Modal
        visible={visibleContact}
        animationType="fade"
        transparent
        onRequestClose={onCloseContact}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.close}>
              <AntDesign
                name={"close"}
                size={24}
                onPress={onCloseContact}
                activeOpacity={0.8}
              />
            </View>
            <Text style={styles.infoText}>Contacter le vendeur</Text>
            {announceurInfo && (
              <View style={styles.contactInfo}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.infoName}>Email :</Text>
                  <Text style={styles.infoText}> {announceurInfo.email}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.infoName}>Téléphone :</Text>
                  <Text style={styles.infoText}>
                    {" "}
                    {announceurInfo.telephone}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  }

  if (bid) {
    return (
      <Modal
        visible={visibleBid}
        animationType="fade"
        transparent
        onRequestClose={onCloseBid}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.infoText}>Faire une enchère</Text>
            <View style={styles.contactInfo}>
              <TextInput
                placeholder="Entrez votre mise (min 0,50€ en plus)"
                style={styles.bidInput}
                onChangeText={(number) => setBidValue(number)}
                value={bidValue}
              />
              {messageBid !== "" && (
                <Text
                  style={{ color: colorMessage, fontSize: 14, marginLeft: 7 }}
                >
                  {messageBid}
                </Text>
              )}
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={onCloseBid}
                activeOpacity={0.8}
              >
                <Text>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  addBid();
                  setBidValue("");
                }}
                style={styles.confirmBtn}
                activeOpacity={0.8}
              >
                <Text style={styles.confirmText}>Confirmer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalView: {
    width: "75%",
    backgroundColor: "#FFF8EF",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  close: {
    width: "100%",
    alignItems: "flex-end",
  },
  button: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  contactInfo: {
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
    alignItems: "flex-start",
  },
  infoName: {
    fontSize: 16,
    fontWeight: 500,
    textDecorationLine: "underline",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  bidInput: {
    width: "100%",
    height: 40,
    backgroundColor: "#ffffff",
    borderColor: "#dcdedf",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 13,
  },
  confirmBtn: {
    width: "40%",
    height: 40,
    backgroundColor: "#AA5042",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmText: {
    color: "#ffffff",
    fontWeight: 500,
  },
  cancelBtn: {
    width: "40%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
