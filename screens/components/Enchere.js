import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";

export default function Enchere() {
    return (
    <TouchableOpacity style={styles.enchere}>
        <View style={styles.leftContent}>
            <Image alt="picture" style={styles.picture} />
            <Text>Titre de l'annonce</Text>
        </View>
        <View style={styles.rightContent}>
            <View style={styles.sellContent}>
                <View style={styles.sellState}>
                    <Text>Vente en cours</Text>
                    <Text>Temps restant</Text>
                </View>
                <FontAwesome name={"check"} size={20} color={"#39D996"}/>
            </View>
            <View style={styles.priceContent}>
                <Text>Price de départ €</Text>
                <Text>Price Actuel € - Username</Text>
            </View>
        </View>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    enchere: {
        height: 200,
        width: "95%",
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 25,
        borderColor: "#dcdedf",
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 5
    },
    leftContent: {
        height: "100%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    picture: {
        backgroundColor: "grey",
        width: 130,
        height: 130,
        borderRadius: 10,
    },
    rightContent: {
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%"
    },
    sellContent: {
        flexDirection: "row",
        justifyContent: "space-between",
    }
})