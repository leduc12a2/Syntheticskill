import React from 'react'
import { StyleSheet, Text, View,Animated } from 'react-native'
import { width } from '../../utils'

export default function Dot({scrollX,index}) {
    const inputRange = [(index -1) * width, index * width , (index + 1) * width]
    const dotWidth = scrollX.interpolate({
        inputRange,
        outputRange: [10, 20, 10],
        extrapolate: 'clamp',
    });
    const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.3, 1, 0.3],
        extrapolate: 'clamp',
    });

    return (
       <Animated.View style={{backgroundColor: 'cyan',
       width: dotWidth,
       height: 8, 
       borderRadius: 4,
       marginRight: 4,
       opacity,
    //    transform: [{
    //        scale
    //    }]
       
       }}>
       </Animated.View>
    )
}

const styles = StyleSheet.create({})
