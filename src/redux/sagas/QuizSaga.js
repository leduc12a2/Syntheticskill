import { fork, put, take, call, cancel } from "@redux-saga/core/effects";
import { QuizApi } from "../../api/QuizApi";
import { cancelGame, startGame } from "../slice/GameSlice";
import { fetchQuestionsSuccess,fetchQuestionsFail } from "../slice/QuizSlice";

function* fetchQuestionsSaga(){
    try {
        const data = yield call(QuizApi.getAllQuiz)
        yield put(fetchQuestionsSuccess(data))
    } catch (error) {
        yield put(fetchQuestionsFail(error))
    }
}
function* cancelFetchQuiz(forkedSaga){
    while(true){
        yield take(cancelGame.type)
        yield cancel(forkedSaga)
    }
}

export default function* startGameSaga(){
    while(true){
      yield take(startGame.type)
      const forkedSaga = yield fork(fetchQuestionsSaga)
      yield fork(cancelFetchQuiz,forkedSaga)
    }
}