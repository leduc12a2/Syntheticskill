import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, ToastAndroid, Touchable, TouchableOpacity, View, ScrollView } from 'react-native'
import HTMLView from 'react-native-htmlview';
import Animated from 'react-native-reanimated';
import { height, slides, width } from '../../utils';
import { useDispatch, useSelector } from 'react-redux'
import * as stages from '../../utils'
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { cancelGame, finishGame, restartGame, startGame } from '../../redux/slice/GameSlice';
import { QuizApi } from '../../api/QuizApi';
import { answerQuestion } from '../../redux/slice/QuizSlice';

export const ButtonCustom = ({ onPress, title, sitai }) => {
    return (
        <TouchableOpacity style={[{ marginTop: 50, backgroundColor: 'green', padding: 20, borderRadius: 10 }, { ...sitai }]}
            onPress={onPress}
        >
            <Text style={{ color: 'white', textAlign: 'center' }}>{title}</Text>
        </TouchableOpacity>
    )
}
export default function QuizApp(props) {
    const dispatch = useDispatch()
    const { stage } = useSelector(state => state.gameSlice)
    const scrollX = useRef(new Animated.Value(0)).current
    const scrollRef = useRef(null)
    const [userName, setUserName] = useState('')
    const [timeLeft, setTimeLeft] = useState(60)
    const currentQuestion = useSelector(state => state.quizSlice?.questions[state?.quizSlice?.currentQuestionIndex]?.question);
    const score = useSelector(state => state.quizSlice.score)
    const currentQuestionIndex = useSelector(state => state.quizSlice.currentQuestionIndex)
    const answers = useSelector(state => state.quizSlice.answers)




    const renderStartGame = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <TextInput
                    style={{ width: '80%' }}
                    placeholder='User Name'
                    onChangeText={setUserName}
                />
                <ButtonCustom
                    title={stages.START_GAME}
                    onPress={() => {
                        if (userName) {
                            setUserName('')
                            dispatch(startGame(userName))
                        }
                        else {
                            ToastAndroid.show('Enter User Name', ToastAndroid.SHORT)
                        }
                    }}
                />
                {/* <TouchableOpacity style={{ marginTop: 50, backgroundColor: 'green', padding: 20, borderRadius: 10 }}
                    onPress={() => {
                        if (userName) {
                            setUserName('')
                            dispatch(startGame(userName))
                        }
                        else {
                            ToastAndroid.show('Enter User Name', ToastAndroid.SHORT)
                        }
                    }}
                >
                    <Text style={{ color: 'white' }}>{stages.START_GAME}</Text>
                </TouchableOpacity> */}
            </View>
        )
    }
    const answerHandler = (answer) => {
        dispatch(answerQuestion({ answer }))
    }
    const renderQuiz = () => {
        return (
            <View style={{ justifyContent: 'center' }}>
                <View style={{ alignSelf: 'center', marginTop: 20, width: 100, height: 100, borderRadius: 150, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 15, color: 'white' }}>{timeLeft}</Text>
                </View>
                <Text style={{ alignSelf: 'center', marginTop: 50 }}>{`${currentQuestionIndex}/10`}</Text>
                <HTMLView
                    style={styles.textQuiz}
                    value={`<h3>${currentQuestion}</h3>`}
                    stylesheet={styles}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <ButtonCustom
                        sitai={{ width: 150, justifyContent: 'center' }}
                        title={'FALSE'}
                        onPress={() => {
                            answerHandler('FALSE')
                        }}
                    />
                    <ButtonCustom
                        sitai={{ width: 150, justifyContent: 'center' }}
                        title={'TRUE'}
                        onPress={() => {
                            answerHandler('TRUE')
                        }}
                    />
                </View>
                <ButtonCustom
                    sitai={{ width: 150, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'red' }}
                    title={'QUIT GAME'}
                    onPress={() => {
                        dispatch(finishGame())
                    }}
                />
            </View>

        )
    }
    const renderEndGame = () => {
        console.log({ answers })
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
            <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text style={{marginVertical: 30,fontSize: 20,fontWeight: 'bold'}}>{`Your score was ${score}/10`}</Text>
            </View>
            <View>
                    {answers.map((item, index) => {
                        return (
                            <View style={{ height: 70,justifyContent:'center',flexDirection:'row',marginBottom: 20,borderBottomWidth: 0.3 }}>
                                <Text style={{ width: '80%',height: 70}}>{item.question}</Text>
                                <View style={{right: 0,height: 50,width: '15%'
                                ,backgroundColor:item?.answer === item?.correctAnswer ? 'green' : 'red',
                                justifyContent:'center'
                                }}>
                                    { item?.answer === item?.correctAnswer ? 
                                    <Text style={{textAlign:'center'}}>TRUE</Text> : 
                                    <Text style={{textAlign:'center'}}>FALSE</Text>
                                     }
                                </View>
                                {/* <Text>{`${item.question} -- ${item.answer} -- ${item.correctAnswer}`}</Text> */}
                            </View>
                        )
                    })}
                    <ButtonCustom
                    sitai={{marginTop: 10}}
                        title='RESTART GAME'
                        onPress={() => {
                            dispatch(restartGame())
                        }}
                    />
            </View>
            
            </ScrollView>
        )
    }
    const renderLoading = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <ActivityIndicator size='large' />
                <TouchableOpacity style={{ marginTop: 50, backgroundColor: 'green', padding: 20, borderRadius: 10 }}
                    onPress={() => {
                        dispatch(cancelGame())
                    }}
                >
                    <Text style={{ color: 'white' }}>CANCEL</Text>
                </TouchableOpacity>
            </View>
        )
    }
    useEffect(() => {
        let interval;
        if (stage === stages.GAME) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1)
            }, 1000);
        }
        if (stage === stages.END_GAME) {
            setTimeLeft(60)
        }
        return () => {
            // dispatch(cancelGame())
            clearInterval(interval)
        }
    }, [stage])
    return (
        <View style={styles.container}>
            {stage === stages.START_GAME && renderStartGame()}
            {stage === stages.FETCHING_GAME && renderLoading()}
            {stage === stages.GAME && renderQuiz()}
            {stage === stages.END_GAME && renderEndGame()}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        // justifyContent:'center',
        // alignItems:'center'
    },
    textQuiz: {
        marginTop: 50,
    },
    h3: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})
    // const htmlContent = `<h3>nice job!</h3>`;
    // <HTMLView
    //     style={styles.textQuiz}
    //     value={htmlContent}
    //     stylesheet={styles}
    // />