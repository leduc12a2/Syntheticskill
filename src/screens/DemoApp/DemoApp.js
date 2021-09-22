import React, { useState, useEffect, useRef } from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, NativeModule } from 'react-native'
import { LazyLoading, ModalOffline } from '../../components'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useDispatch, useSelector } from 'react-redux'
import { getPaperFail, getPaperRequest } from '../../redux/slice/DemoAppSlice'
import { DemoAppApi } from '../../api/DemoAppApi'
import { ActivityIndicator } from 'react-native-paper';
const linkImage24H = 'https://img.apksum.com/7d/com.baochau.tintuc24h/1.6.2/icon.png'

export default function DemoApp(props) {
    const dispatch = useDispatch()
    const { loading, listPaper, error } = useSelector(state => state.demoAppSlice)
    const { isOffline } = useSelector(state => state.mainSlice)
    const [dataRender, setDataRender] = useState([])
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)


    const renderItem = ({ item, index }) => {
        let formatTitle = item.title || '';
        let formatDescription = item.description || '';
        let formatPublished = item.published || '';
        if (formatTitle.includes('&#34;') || formatDescription.includes('&#34;')) {
            formatTitle = formatTitle.replace(/&#34;/g, '"');
            formatDescription = formatDescription.replace(/&#34;/g, '"');
        }
        else if (formatTitle.includes('&#39;') || formatDescription.includes('&#39;')) {
            formatTitle = formatTitle.replace(/&#39;/g, "'");
            formatDescription = formatDescription.replace(/&#34;/g, "'");
        }
        if (formatPublished.includes('+0700')) {
            formatPublished = formatPublished.replace(/\+0700/g, '');
        }
        return (
            <TouchableOpacity
                style={styles.itemContent}
                onPress={() => props.navigation.navigate('ReadPaper', { item })}
            >
                <View style={styles.itemLeft}>
                    <Image
                        style={styles.imageLeft}
                        source={{ uri: linkImage24H }}
                    />
                </View>
                <View style={styles.itemRight}>
                    <Text numberOfLines={2} ellipsizeMode='tail' style={styles.titleText}>
                        {formatTitle}
                    </Text>
                    <Text numberOfLines={3} ellipsizeMode='tail' style={styles.contentText}>
                        {formatDescription}
                    </Text>
                    <View style={styles.TextPublished}>
                        <Text numberOfLines={3} ellipsizeMode='tail' style={styles.contentTextPublished}>
                            {formatPublished}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    const renderFooter = () => {
        return (
            loadingScreen ?
                <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                    <ActivityIndicator size='small' style={{ marginRight: 10 }} />
                    <Text>Đang tải</Text>
                </View> : null
        )
    }
    const handleLoadMore = ({ distanceFromEnd }) => {
        if (distanceFromEnd < 0) return;
        // console.log(distanceFromEnd)
        // console.log('handle Loadmore')
        setLoadingScreen(true)
        setCurrentPage(currentPage + 10)
    }
    useEffect(() => {
        if (!isOffline) {
            dispatch(getPaperRequest())

        } else {
            dispatch(getPaperFail('Offline'))
        }
    }, [isOffline])

    useEffect(() => {
        if (currentPage > 9) {
            //   console.log(currentPage)
            //   console.log('load more')
            const timeOut = new Promise((res, rej) => {
                setTimeout(() => {
                    res()
                }, 1000);
            })
            timeOut.then(() => {
                const newArr = listPaper.slice(dataRender.length, dataRender.length + 10)
                setDataRender([...dataRender, ...newArr])
                setLoadingScreen(false)
            })
        }
    }, [currentPage])

    useEffect(() => {
        if (listPaper.length > 10) {
            // console.log('chay 1 lan')
            setDataRender([...listPaper.slice(0, 10)])
            //    setCurrentPage(10)
        }
    }, [listPaper])
    return (
        <View style={styles.container}>
            {loading && <LazyLoading />}
            {isOffline ? <ModalOffline /> : <FlatList
                data={dataRender}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                ListFooterComponent={renderFooter}
                onEndReachedThreshold={0.3}
                onEndReached={handleLoadMore}
            />}


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    itemContent: {
        flexDirection: 'row',
        // borderWidth: 0.7,
        // alignItems:'center',
        // justifyContent:'center',
        marginBottom: 10,
        borderRadius: 10,
        height: 150,
        overflow: 'hidden',
        borderBottomWidth: 0.3
    },
    itemLeft: {
        width: 100,
        marginRight: 10,
        // justifyContent:'center'
    },
    imageLeft: {
        width: 100,
        height: 100,
    },
    itemRight: {
        marginTop: 8,
        flex: 1,
        flexDirection: 'column',
        lineHeight: 30,
        marginRight: 10
    },
    titleText: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    TextPublished: {
        position: 'absolute',
        bottom: 20,
        right: 0
    }
})
