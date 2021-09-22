/**
 * @format
 */
import React,{useEffect} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import { Provider } from 'react-redux';
import {name as appName} from './app.json';
import {store , persistor} from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import NetInfo from "@react-native-community/netinfo";
import { getInfoNetWork } from './src/redux/slice/MainSlice';
console.disableYellowBox = true;

function Main(){
    useEffect(() => {
        const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
            const offline = !(state.isConnected && state.isInternetReachable);
            if(offline){
                store.dispatch(getInfoNetWork(offline))
            } else store.dispatch(getInfoNetWork(offline))
        });
        return () => removeNetInfoSubscription();
    }, []);
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Main);
