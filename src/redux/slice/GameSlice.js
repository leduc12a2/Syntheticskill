import { createSlice } from "@reduxjs/toolkit";
import * as stages from '../../utils'
import { fetchQuestionsSuccess,fetchQuestionsFail } from "./QuizSlice";


const initialState = {
    stage: stages.START_GAME,
    username: '',
}
const GameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state, action) => {
            state.username = action.payload.username
            state.stage = stages.FETCHING_GAME
        },
        cancelGame: (state,action) => {
            state.stage = stages.START_GAME
        },
        finishGame: (state,action) => {
            state.stage = stages.END_GAME
        },
        restartGame: (state, action) => {
            state.stage = stages.START_GAME
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchQuestionsSuccess,(state,action)=>{
             state.stage = stages.GAME
        }).addCase(fetchQuestionsFail,(state,action)=> {
            state.stage = stages.START_GAME
        })
    }
})
export const { startGame, cancelGame, finishGame, restartGame } = GameSlice.actions

export default GameSlice.reducer
