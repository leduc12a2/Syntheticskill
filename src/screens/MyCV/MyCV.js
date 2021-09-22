import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HTMLView from 'react-native-htmlview';
import WebView from 'react-native-webview';


export default function QuizApp(props) {
    const link = 'https://www.topcv.vn/xem-cv/BgAHAARXU1MFB1NUBwNUUQkBVQAOB1BQA1IPAg4388?utm_source=link_i_topcv&utm_campaign=link_i_topcv&utm_medium=link_i_topcv'
    return (
        <WebView source={{ uri: link }} />
    );
}
const styles = StyleSheet.create({})
