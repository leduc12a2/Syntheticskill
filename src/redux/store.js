import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./sagas/rootSaga";
import AsyncStorage from '@react-native-community/async-storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import { DemoAppSliceReducer, MainSliceReducer,QuizSliceReducer,GameSliceReducer } from './slice'

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['demoAppSlice', 'MainSliceReducer', 'quizSlice','gameSlice']
}

const rootReducer = combineReducers({
    demoAppSlice: DemoAppSliceReducer,
    mainSlice: MainSliceReducer,
    quizSlice: QuizSliceReducer,
    gameSlice: GameSliceReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: true,
                serializableCheck: false
                // {
                //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                // },
            }).concat(sagaMiddleware)
    })
sagaMiddleware.run(rootSaga)
export const persistor = persistStore(store);






