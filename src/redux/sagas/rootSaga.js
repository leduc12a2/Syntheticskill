import {fork,select,takeLatest,takeEvery,all} from 'redux-saga/effects'
import DemoAppSaga from './DemoAppSaga'
import QuizSaga from './QuizSaga'
import GameSaga from './GameSaga'

export default function* rootSaga(){
    yield all([
        DemoAppSaga(),
        QuizSaga(),
        GameSaga(),
        


    ])
}