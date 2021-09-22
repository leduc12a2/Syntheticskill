import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import WebView from 'react-native-webview'
import * as Progress from 'react-native-progress';


export default function ReadPaper(props) {
    const { item } = props.route.params
    const [progress, setProgress] = useState(0)
    const [load, setLoad] = useState(false)
    return (
        <View style={styles.container}>
            {load && <Progress.Bar
                progress={progress}
                width={null}
                borderWidth={0}
                borderRadius={0}
                color='orange'
            /> }
            <WebView source={{ uri: item?.id }}
            onLoadStart={()=> setLoad(true)}
            onLoadEnd={()=> setLoad(false)}
            onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
            onError={(event)=> alert(event.nativeEvent.description)}
             />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
