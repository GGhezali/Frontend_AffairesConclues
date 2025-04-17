import React, { useState } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Platform,
    StatusBar,
    Modal,
} from "react-native";

export default function Modals({ visible, onClose}) {

    return (
        <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text>Contacter le vendeur</Text>
                    <TouchableOpacity onPress={onClose} style={styles.button} activeOpacity={0.8}>
                        <Text style={styles.textButton}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        width: 150,
        alignItems: 'center',
        marginTop: 20,
        paddingTop: 8,
        backgroundColor: '#ec6e5b',
        borderRadius: 10,
      },
      textButton: {
        color: '#ffffff',
        height: 24,
        fontWeight: '600',
        fontSize: 15,
      },
});