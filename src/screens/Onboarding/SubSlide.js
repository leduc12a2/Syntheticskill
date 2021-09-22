import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ButtonOnboarding } from '../../components'

export default function SubSlide({ subtitle = '', description= '',last, onPress}) {
    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <Text style={styles.description}>{description}</Text>
            <ButtonOnboarding {...{onPress}} label={last ? `Let's get started` : 'Next'} variant={last ? 'primary' : 'default'}  />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        marginBottom: 12
    },
    subtitle: {
        fontFamily: 'SF-Pro-Text-Semibold',
        fontSize: 24,
        lineHeight: 30,
        marginBottom: 12,
        color: '#0C0D34'
    },
    description: {
        fontFamily: 'SF-Pro-Text-Regular',
        fontSize: 16,
        lineHeight: 24,
        color: '#0c0d34',
        textAlign: 'center',
        marginBottom: 12,

    }
})
