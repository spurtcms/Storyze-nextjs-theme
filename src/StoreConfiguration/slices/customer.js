import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    count: 0,
    EntryListArray_Redux: [],
    header_slug: "blog",
    header_api_result_redux: [],
    header_keyword: "",
    Header_logo_api_result_redux:"",
    header_slug_Redux_function:""
};


export const customerSlice = createSlice({
    name: "cusromer",
    initialState,
    reducers: {
        addCount: (state, action) => {
            state.count = action.payload;
        },
        EntryList_Redux_function: (state, action) => {
            state.EntryListArray_Redux = action.payload;
        },
        header_slug_Reduc_function: (state, action) => {
            state.header_slug = action.payload;
        },

        Header_api_result_redux_function: (state, action) => {
            state.header_api_result_redux = action.payload;
        },
        Header_keyword_redux_function: (state, action) => {
            state.header_keyword = action.payload;
        },
        Header_logo_api_result_redux_function: (state, action) => {
            state.Header_logo_api_result_redux = action.payload;
        },
        header_slug_Redux_function: (state, action) => {
            state.header_slug_Redux_function = action.payload;
        }

    },
});


export const { addCount, EntryList_Redux_function, header_slug_Reduc_function ,Header_keyword_redux_function,Header_logo_api_result_redux_function , Header_api_result_redux_function,header_slug_Redux_function} = customerSlice.actions;

export default customerSlice.reducer;
