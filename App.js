import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import user from "./reducers/user";
import article from "./reducers/article";
import bookmarks from "./reducers/bookmarks";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AnnonceScreen from "./screens/Annonce";
import CarteScreen from "./screens/Carte";
import ConnexionInscriptionScreen from "./screens/Connexion_inscription";
import ConnexionScreen from "./screens/Connexion";
import GallerieScreen from "./screens/Gallerie";
import InscriptionScreen from "./screens/Inscription";
import MesEncheresScreen from "./screens/Mes_encheres";
import MesFavorisScreen from "./screens/Mes_favoris";
import MesInformationsScreen from "./screens/Mes_Informations";
import MesPublicationsScreen from "./screens/Mes_publications";
import MonProfilScreen from "./screens/Mon_profil";
import PageAcceuilScreen from "./screens/Page_acceuil";
import PhotoScreen from "./screens/Photo";
import PublierScreen from "./screens/Publier";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Acceuil") {
            iconName = "home";
          } else if (route.name === "MesFavoris") {
            iconName = "bookmark";
          } else if (route.name === "MesEncheres") {
            iconName = "book";
          } else if (route.name === "Publier") {
            iconName = "plus";
          } else if (route.name === "Profil") {
            iconName = "user";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#f4b490",
        tabBarInactiveTintColor: "#fff8ef",
        tabBarStyle: { backgroundColor: "#aa5042" },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Acceuil" component={PageAcceuilScreen} />
      <Tab.Screen name="MesFavoris" component={MesFavorisScreen} />
      <Tab.Screen name="Publier" component={PublierScreen} />
      <Tab.Screen name="MesEncheres" component={MesEncheresScreen} />
      <Tab.Screen name="Profil" component={MonProfilScreen} />
    </Tab.Navigator>
  );
};

const reducers = combineReducers({ user, article, bookmarks });

const persistConfig = {
  key: "AffairesConclues",
  storage: AsyncStorage,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen
              name="ConnexionInscription"
              component={ConnexionInscriptionScreen}
            />
            <Stack.Screen
              name="MesInformations"
              component={MesInformationsScreen}
            />
            <Stack.Screen
              name="MesPublications"
              component={MesPublicationsScreen}
            />
            <Stack.Screen name="MesFavoris" component={MesFavorisScreen} />
            <Stack.Screen name="MesEncheres" component={MesEncheresScreen} />
            <Stack.Screen name="Connexion" component={ConnexionScreen} />
            <Stack.Screen name="Inscription" component={InscriptionScreen} />
            <Stack.Screen name="MonProfil" component={MonProfilScreen} />
            <Stack.Screen name="Annonce" component={AnnonceScreen} />
            <Stack.Screen name="Carte" component={CarteScreen} />
            <Stack.Screen name="Photo" component={PhotoScreen} />
            <Stack.Screen name="Gallerie" component={GallerieScreen} />
            <Stack.Screen name="Publier" component={PublierScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
