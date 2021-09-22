import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

function timeout() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(false)
        }, 1000);
    })
}

export const LoadingAsync = createAsyncThunk('DemoApp/LoadingAsync', async (params, thunkAPI) => {
    const number = await timeout()
    return number
})

const DemoApps = createSlice({
    name: 'DemoApp',
    initialState: {
        loading: false,
        listPaper: [],
        error: null,
    },
    reducers: {
        getPaperRequest: (state, action) => {
        state.loading = true
        },
        getPaperSuccess: (state, action) => {
            state.loading = false,
            state.listPaper = action.payload
        },
        getPaperFail: (state, action) => {
            state.loading = false,
            state.listPaper = [],
            state.error = action.payload
        },
    },
    extraReducers: {
        [LoadingAsync.pending]: (state,action) => {
            state.loading = true
         },  //pending bat dau chay
        [LoadingAsync.rejected]: (action) => {
            state.loading = false
         },  // co loi xay ra
        [LoadingAsync.fulfilled]: (state, action) => {
            state.loading = false
        },
    }
});

const { reducer, actions } = DemoApps;
export const { getPaperRequest, getPaperSuccess, getPaperFail } = actions;
export default reducer