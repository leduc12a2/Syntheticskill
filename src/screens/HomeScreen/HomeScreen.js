import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import {Button} from '../../components';
import { dataMainButton } from '../../utils';
export default function HomeScreen(props) {
    return (
        <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
            {dataMainButton.map((item, index) => (
                <Button key={index} title={item.title} onPress={() => { props.navigation.navigate(`${item.title}`) }} />
            ))}
        </View>
    );
}
