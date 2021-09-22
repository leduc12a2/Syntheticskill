import React, { useRef, useState } from 'react';
import { Keyboard, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';

const boardDATA = [
    ['C', 'DEL', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
];


const KeyboardCustom = ({ handleKeyboard }) => {
    return (
        <View style={{ flex: 1, backgroundColor: 'blue', flexDirection: 'column' }}>
            {boardDATA.map((rowKeyboard, index) => {
                return (
                    <View key={`row ${index}`} style={{ flex: 1, backgroundColor: 'blue', flexDirection: 'row', borderBottomWidth: 1 }}>
                        {rowKeyboard.map((itemKey, index) => {
                            return (
                                <View key={`item board ${index}`} style={{ flex: itemKey === '0' ? 2 : 1, borderRightWidth: 1 }}>
                                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => {
                                            handleKeyboard(itemKey)
                                        }}
                                    >
                                        <Text style={{ fontSize: 50 }}>{itemKey}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                )
            })}
        </View>
    )
}

function Calculator(props) {
    const [a, setA] = useState('')
    const [nextValue, setNextValue] = useState(false)
    const [b, setB] = useState('')
    const [pheptinh, setPheptinh] = useState(null)
    const [display, setDisplay] = useState('0')
    const [kq, setKq] = useState('0')
    const history = useRef(kq)

    React.useEffect(() => {
        history.current = kq.toString()
    }, [kq])

    const clearState = () => {
        setKq('0')
        setA('')
        setB('')
        setPheptinh(null)
        setDisplay('0')
    }

    const handleKeyboard = (params) => {
        switch (params) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                setDisplay(display === '0' ? params : display + params)
                if (!nextValue) {
                    setA(a + params)
                } else {
                    setB(b + params)
                }
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                if ((a === '' || a === '0' || a) && b && pheptinh) {
                    return
                }
                setNextValue(true)
                setPheptinh(params)
                setDisplay((pheptinh !== null ? display.substr(0, display.length - 1) : display) + params)
                break;
            case 'C':
                clearState()
                break;
            case '=':
                if ((a === '' || a === '0' || a) && b && pheptinh) {
                    console.log("a", a)
                    console.log("phep tinh", pheptinh)
                    console.log("b", b)
                    let kq = eval(a + pheptinh + b)
                    if (kq === 0) {
                        kq = '0';
                        setDisplay(kq)
                        setKq(kq)
                        setA(kq)
                        setB('')
                        setPheptinh(null)
                        setNextValue(false)
                        return
                    }
                    setDisplay(kq % 1 === 0 ? kq : kq.toFixed(2))
                    setKq(kq % 1 === 0 ? kq : kq.toFixed(2))
                    setA(kq % 1 === 0 ? kq : kq.toFixed(2))
                    setB('')
                    setPheptinh(null)
                    setNextValue(false)
                }
                break;
            case '.':
                if (display.toString().includes('.')) {
                    return
                }
                let dot = display.toString().slice(-1)
                // get last phep tinh
                setDisplay(dot !== '.' ? display + params : display)
                if (!nextValue) {
                    // console.log("a trong dot",a)
                    setA(dot !== '.' ? a + params : a)
                } else {
                    setB(b + params)
                }
                break;
            case 'DEL':
                let string = display.toString();
                let deleteoneString = string.substr(0, string.length - 1);
                if (!deleteoneString.includes('+')
                    || !deleteoneString.includes('-') || !deleteoneString.includes('*') || !deleteoneString.includes('/')
                ) {
                    setPheptinh(null)
                }
                let length = string.length
                setDisplay(length === 1 ? '0' : deleteoneString)
                setA(length === 1 ? '' : deleteoneString)
                break;
            // case '0':
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 3, backgroundColor: 'red' }}>
                <View
                    pointerEvents='none'
                    style={{ flex: 1, backgroundColor: 'yellow' }}>
                    <TextInput
                        style={{ width: '100%', height: '100%', fontSize: 50 }}
                        //  placeholder="KQ "
                        value={`History : ${history.current}`}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <TextInput
                        style={{ width: '100%', height: '100%', fontSize: 50 }}
                        //  placeholder="0"
                        value={`${display}`}
                    />
                </View>
            </View>
            <View style={{ flex: 7 }}>
                <KeyboardCustom handleKeyboard={handleKeyboard} />
            </View>
        </View>
    );
}

export default Calculator;