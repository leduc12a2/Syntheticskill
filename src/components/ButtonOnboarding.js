import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default function ButtonOnboarding({ label = '', variant = 'default', onPress }) {
    const backgroundColor = variant === 'primary' ? '#2CB9B0' : 'rgba(12,13,52,0.05)'
    const color = variant === 'primary' ? 'white' : '#0C0D34'
    return (
        <TouchableOpacity
        style={[styles.container, { backgroundColor }]}
         {...{onPress}}
         >
                <Text style={[styles.label,{color}]}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        height: 50,
        width: 245,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontSize: 15,
        fontFamily: 'SF-Pro-Text-Regular',
        textAlign: 'center'
    }
})
