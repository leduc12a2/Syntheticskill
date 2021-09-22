import React,{useState} from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { width } from '../../utils'

const listTab = [
    {
        status: 'All'
    },
    {
       status: 'Two'
    },
    {
       status: 'Three'
    },
]
const data = [
    {
        status: 'Two',
        name: 'Two.1'
    },
    {
        status: 'Three',
        name: 'Three.1'
    },
    {
        status: 'Two',
        name: 'Two.2'
    },
    {
        status: 'Three',
        name: 'Three.2'
    },
    {
        status: 'Two',
        name: 'Two.3'
    },
    {
        status: 'Three',
        name: 'Three.3'
    },
    {
        status: 'Three',
        name: 'Three.4'
    },
]

export default function TabRadio() {

    const [status, setStatus] = useState(listTab[0].status)
    const [dataList, setDataList] = useState(data)

    const setStatusFilter = status => {
        if(status !== 'All'){
            setDataList([...data.filter(e => e.status === status)])
        } else {
            setDataList(data)
        }
        setStatus(status)
    }
    const renderItem = ({item,index}) => {
        return (
            <View style={styles.itemContent}>
                <View style={styles.itemLeft}>
                    <Text>{item.name}</Text>
                </View>
                <View style={[styles.itemRight, { backgroundColor: item.status === 'Two' ? 'green' : 'yellow'}]}>
                    <Text>{item.status}</Text>
                </View>
            </View>
        );
    }
    return (
        <View style={styles.container}>
        <View style={styles.listTab}>
        {listTab.map((item,index)=>(
            <TouchableOpacity style={[styles.btnTab,
            {width: width / (listTab.length + 0.6)},
            status === item.status && styles.btnActive
            ]} 
            key={index}
            onPress={()=> setStatusFilter(item.status)}
            >
                <Text style={[styles.textTab, { color: status === item.status ? 'white' : 'black'}]}>{item.status}</Text>
            </TouchableOpacity>
        ))}
        </View>
        <View style={styles.contentTab}>
          <FlatList
          data={dataList}
          keyExtractor={(e, index)=> index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          />
        </View>
          
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        paddingHorizontal: 20,
        // justifyContent: 'center'
    },
    listTab: {
        marginTop: 10,
        flexDirection: 'row',
        alignSelf:'center',
        backgroundColor: '#fff',
        // padding: 20
    },
    btnTab: {
        // width: width / 3.5,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#EBEBEB',
        padding: 10,
        justifyContent:'center'
    },
    textTab: {
        fontSize: 16
    },
    btnActive: {
        backgroundColor: '#E6838D'
    },
    contentTab: {
        flex: 1,
        marginTop: 10
    },
    itemContent: {
        flexDirection: 'row',
        paddingVertical: 10,
        marginBottom: 10,
        borderWidth: 0.7
    },
    itemLeft: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    itemRight: {
        height: 50,
        paddingHorizontal: 10,
        justifyContent: 'center',
        right: 12,
    }
})
