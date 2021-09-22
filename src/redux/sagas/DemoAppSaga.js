import { call, delay, put, takeEvery, takeLatest } from "@redux-saga/core/effects"
import {getPaperRequest,getPaperSuccess,getPaperFail} from '../slice/DemoAppSlice'
import {DemoAppApi} from '../../api/DemoAppApi'
import * as rssParser from 'react-native-rss-parser';


function* handleGetPaper(){
    try {
        const response = yield call(DemoAppApi.getAll)
        // console.log(resp)
        let responseData = yield rssParser.parse(response)
        yield delay(1000)
        yield put(getPaperSuccess(responseData.items))
    } catch (error) {
        // console.log(error.message)
        yield delay(1000)
        yield put(getPaperFail(error.message))
    }
}


export default function* DemoAppSaga(){
    yield takeEvery(getPaperRequest.type, handleGetPaper)
}