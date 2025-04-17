import React from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Modal,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function Modals({ visible, onClose, annonceurInfo }) {

    return (
        <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.button}>
                        <AntDesign name={'close'} size={24} onPress={onClose} activeOpacity={0.8} />
                    </View>
                    <Text>Contacter le vendeur</Text>
                    {annonceurInfo && (
                        <View style={styles.contactInfo}>
                            <Text style={styles.infoText}>Email: {annonceurInfo.email}</Text>
                            <Text style={styles.infoText}>Téléphone: {annonceurInfo.phone}</Text>
                        </View>
                    )}
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
        width: '70%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
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
        width: '100%',
        alignItems: 'flex-end',
    },
    textButton: {
        color: '#ffffff',
        height: 24,
        fontWeight: '600',
        fontSize: 15,
    },
    contactInfo: {
        marginBottom: 20,
        alignItems: 'flex-start',
    },
    infoText: {
        fontSize: 16,
        marginBottom: 5,
    },
});