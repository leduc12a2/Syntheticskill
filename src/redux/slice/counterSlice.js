import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

function timeout(){
    return new Promise((res,rej)=>{
        setTimeout(() => {
            res(5)
        }, 1000);
    })
}

export const demoAsyncActionThunk = createAsyncThunk('couters/demoAsyncActionThunk', async (params, thunkAPI) => {
    console.log({
        params,
        thunkAPI
    })
    const number = await timeout()
    return number
})

const counters = createSlice({
    name: 'couters',
    initialState: {
        num: 0
    },
    reducers: {
        add: (state, action) => {
            state.num = state.num + action.payload
        }
    },
    extraReducers: {
        [demoAsyncActionThunk.pending]: (action) => {},  //pending bat dau chay
        [demoAsyncActionThunk.rejected]: (action) => {},  // co loi xay ra
        [demoAsyncActionThunk.fulfilled]: (state,action) => {
         state.num = state.num + action.payload
        },  // hoan thanh

    }
});

const { reducer, actions } = counters;
export const { add } = actions;
export default reducer