import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Headers from "./components/Headers";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function MesInformationsScreen({ navigation }) {
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;
  const user = useSelector((state) => state.user.value);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bankData, setBankData] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState("");
  const [icon, setIcon] = useState("eye-with-line");
  const [secure, setSecure] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/users/findUserByToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserId(data.data._id);
        setEmail(data.data.email);
        setUsername(data.data.username);
        setBankData(data.data.donneeBancaire);
        setPhone(data.data.telephone);
      });
  }, []);

  const handleUpdate = () => {
    fetch(`${BACKEND_ADDRESS}/users/updateInfo/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        telephone: phone,
        donneeBancaire: bankData,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          Alert.alert("Notification", data.message);
        } else {
          Alert.alert("Notification", data.error);
        }
      })
      .catch((error) => {
        console.log(error);

        Alert.alert("Attention", "Une erreur est survenue lors de la mise à jour.");
      });      
  };

  const visiblePassword = () => {
    console.log("visiblePassword");
    if (icon === "eye-with-line") {
      setIcon("eye");
      setSecure(false);
    } else {
      setIcon("eye-with-line");
      setSecure(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeareaview}>
      {/* Ajout d'un header qui envoie vers le component "Header" les props navigation, isReturn et title */}

      <Headers
        navigation={navigation}
        isReturn={true}
        title={"Mes informations"}
      />

      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <ScrollView style={{ width: "100%" }}>
            <Text style={styles.title}>Email</Text>
            <View style={styles.head}>
              <View style={styles.input}>
                <TextInput
                  style={styles.placeholder}
                  placeholder="Email"
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                />
                <FontAwesome name={"pencil"} size={16} color={"#F5A28F"} />
              </View>
            </View>
            <Text style={styles.title}>Username</Text>
            <View style={styles.head}>
              <View style={styles.input}>
                <TextInput
                  style={styles.placeholder}
                  placeholder="Username"
                  value={username}
                  onChangeText={(value) => setUsername(value)}
                />
                <FontAwesome name={"pencil"} size={16} color={"#F5A28F"} />
              </View>
            </View>
            <Text style={styles.title}>Password</Text>
            <View style={styles.head}>
              <View style={styles.input}>
                <TextInput
                  secureTextEntry={secure}
                  placeholder="********"
                  value={password}
                  onChangeText={(value) => setPassword(value)}
                />
                <Entypo
                  name={icon}
                  size={16}
                  color={"#F5A28F"}
                  onPress={() => visiblePassword()}
                />
              </View>
            </View>
            <Text style={styles.title}>Données bancaires</Text>
            <View style={styles.head}>
              <View style={styles.input}>
                <TextInput
                  secureTextEntry={secure}
                  style={styles.placeholder}
                  placeholder="**** **** **** **** ***"
                  value={bankData}
                  onChangeText={(value) => setBankData(value)}
                />
                <FontAwesome name={"pencil"} size={16} color={"#F5A28F"} />
              </View>
            </View>
            <Text style={styles.title}>Téléphone</Text>
            <View style={styles.head}>
              <View style={styles.input}>
                <TextInput
                  placeholder="Téléphone"
                  value={phone}
                  onChangeText={(value) => setPhone(value)}
                />
                <FontAwesome name={"pencil"} size={16} color={"#F5A28F"} />
              </View>
            </View>
            <TouchableOpacity
              style={styles.greenButton}
              onPress={() => handleUpdate()}
            >
              <Text style={styles.greenButtonText}>Enregistrer</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF8EF",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputsContainer: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 10,
    borderWidth: 0.5,
    alignItems: "center",
    marginTop: 30,
    height: "90%",
    padding: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 20,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    borderColor: "#dcdedf",
    width: "90%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  greenButton: {
    backgroundColor: "#AA5042",
    borderRadius: 30,
    width: "80%",
    height: 40,
    marginTop: 40,
    marginLeft: 25,
  },

  greenButtonText: {
    justifyContent: "center",
    textAlign: "center",
    fontStyle: "bold",
    fontSize: 20,
    color: "white",
    marginTop: 7,
  },
});
