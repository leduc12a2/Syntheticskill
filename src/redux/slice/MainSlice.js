import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const MainSlice = createSlice({
    name: 'MainSlice',
    initialState: {
        isOffline: false
    },
    reducers: {
        getInfoNetWork: (state, action) => {
            state.isOffline = action.payload
        },
    },
    extraReducers: {}
});

const { reducer, actions } = MainSlice;
export const { getInfoNetWork } = actions;
export default reducer