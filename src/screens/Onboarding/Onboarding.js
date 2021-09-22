import React, { useRef } from 'react'
import { ScrollView, StyleSheet, Text, View, Animated } from 'react-native'
import Slide, { SLIDER_HEIGHT, BORDER_RADIUS } from './Slide'
import { height, width } from '../../utils'
import SubSlide from './SubSlide'
import Dot from './Dot'
import { slides } from '../../utils'



export default function Onboarding() {
    const scrollX = useRef(new Animated.Value(0)).current
    const scrollRef = useRef(null)
    // const x = useSharedValue(0);
    // //useScrollEvent
    // const onScroll = onScrollEvent({x})
    const backgroundColor = scrollX.interpolate({
        inputRange: slides.map((_, i) => i * width),
        outputRange: slides.map(((item) => item.color))
    })
    const translateXFooter = scrollX.interpolate({
        inputRange: slides.map((_, i) => i * width),
        outputRange: slides.map(((_, i) => -(i * width)))
    })
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.slider, { backgroundColor }]}>
                <Animated.ScrollView
                    ref={scrollRef}
                    horizontal
                    snapToInterval={width}
                    decelerationRate='fast'
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    scrollEventThrottle={1}
                    onScroll={
                        Animated.event([
                            {
                                nativeEvent: { contentOffset: { x: scrollX } },
                            }
                        ], { useNativeDriver: false })
                    }
                >
                    {slides.map(({ title, picture }, index) => (
                        <Slide key={index} right={(index % 2)}  {...{ title }} {...{picture}} />
                    ))}

                </Animated.ScrollView>
            </Animated.View>
            <View style={styles.footer}>
                <Animated.View style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor
                }} />

                <View style={styles.footerContent}>
                    <View style={styles.pagination}>
                        {slides.map((_,index)=>(
                            <Dot key={index} scrollX={scrollX} index={index} />
                        ))}
                    </View>
                    <Animated.View
                        style={{
                            // flex: 1,
                            flexDirection: 'row',
                            width: width * slides.length,
                            transform: [
                                { translateX: translateXFooter }
                            ]
                        }}
                    >
                             {slides.map(({ subtitle, description }, index) => (
                        <SubSlide key={index}
                            onPress={() => {
                                if(index === slides.length -1) {
                                  console.log('last')
                                } else {
                                    if (scrollRef.current) {
                                        scrollRef.current
                                            .scrollTo({ x: width * (index + 1), animated: true })
                                    }
                                }
                          
                            }}
                            last={index === slides.length - 1}
                            {...{ subtitle, description }}
                        />
                    ))}
                    </Animated.View>
               
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    slider: {
        height: SLIDER_HEIGHT,
        // backgroundColor,
        borderBottomRightRadius: BORDER_RADIUS
    },
    footer: {
        flex: 1
    },
    footerContent: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopLeftRadius: BORDER_RADIUS
    },
    pagination : {
        ...StyleSheet.absoluteFillObject,
        height: BORDER_RADIUS,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(100,200,300, 0.5)'
    }
})
