import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import { height, width } from '../../utils'
export const SLIDER_HEIGHT = 0.61 * height
export const BORDER_RADIUS = 75

export default function Slide({ title = '', right = null, picture = '' }) {
    const transform = [
        {
            translateY: (SLIDER_HEIGHT - 100) / 2
        },
        {
            translateX: right ? width / 2 - 50 : -width / 2 + 50
        },
        {
            rotate: right ? '-90deg' : '90deg'
        }
    ]
    return (
        <View style={styles.container}>
        <View style={styles.underlay}>
          <Image source={picture} style={styles.image} />
        </View>
            <View style={[styles.titleContainer,{ transform }]}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
    },
    title: {
        fontSize: 75,
        fontFamily: 'SFProText-Bold',
        color: 'white',
        textAlign: 'center',
        lineHeight: 80
    },
    titleContainer: {
        // backgroundColor: 'blue',
        height: 100,
        justifyContent: 'center',
    },
    underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end'
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: null,
        height: null,
        borderBottomRightRadius: BORDER_RADIUS
    }
})
