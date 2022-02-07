import { createSlice } from "@reduxjs/toolkit";

let initialState = {
	data: null,
	isFetching: false,
	error: null,
	url: null,
	method: null,
	body: null,
	params: null,
	status: "",
};


const apiSlice = createSlice({
	name: "api",
	initialState,
	reducers: {
		apiCallStart: (state, action) => {
			state.data = null;
			state.isFetching = true;
			state.url = action.payload.url;
			state.method = action.payload.method;
			state.body = action.payload.body;
			state.params = action.payload.params;
			state.status = "api fetching started";
		},
		apiCallSuccess: (state, action) => {
			state.isFetching = false;
			state.data = action.payload;
			state.status = "api fetching success";
		},
		apiCallFailure: (state, action) => {
			state.isFetching = false;
			state.error = action.payload;
			state.status = "api fetching failed";
		},
		apiCallFinish: (state) => {
			state.isFetching = false;
			state.status = "api fetching finished";
		}
	}
});

export const { apiCallStart, apiCallSuccess, apiCallFailure, apiCallFinish } = apiSlice.actions;
export default apiSlice.reducer;


