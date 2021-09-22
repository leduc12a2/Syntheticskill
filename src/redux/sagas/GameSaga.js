import { delay, race, take, put ,select } from "@redux-saga/core/effects";
import { finishGame } from "../slice/GameSlice";
import { answerQuestion, fetchQuestionsSuccess, nextQuestion } from "../slice/QuizSlice";

function* answersSaga(){
    const list = yield select(state => state.quizSlice.questions)
    for(let i = 0; i < list.length ; i++){
        yield take(answerQuestion.type);
        yield put(nextQuestion())
    }

}
export default function* gameSaga(){
    while(true){
        yield take(fetchQuestionsSuccess.type)

        yield race({
            delay: delay(60000),
            done: answersSaga()
        })

        yield put(finishGame())
        
    }
}