import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { width } from '../utils'

export default function Button({ title, onPress }) {
    return (
        <TouchableOpacity style={styles.button}
        onPress={onPress}
        >
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: width * 0.8,
        height: 50,
        borderWidth: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    }

})
