import React from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, NativeModules } from 'react-native'
const { CustomModule } = NativeModules;

export default function ModalOffline() {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Connection Error</Text>
                <Text style={styles.contentText}>
                    Oops! Looks like your device is not connected to the Internet.
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        // ToastModule.gotoNetwork()
                        CustomModule.gotoNetwork()
                    }}
                >
                    <Text style={styles.textButton}>GO TO WIRELESS</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        width: '90%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        padding: 20,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: '90%',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10
    },
    title: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    contentText: {
        fontSize: 15,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 10

    },
    textButton: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
    }
})
