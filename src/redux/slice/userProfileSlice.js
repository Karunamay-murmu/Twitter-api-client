import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	isLoading: false,
	error: null,
	status: ""
};

const userProfileSlice = createSlice({
	name: "userProfile",
	initialState,
	reducers: {
		getUserProfileStart: (state) => {
			state.isLoading = true;
			state.status = "user profile fetching started";
		},
		getUserProfileSuccess: (state, action) => {
			state.isLoading = false;
			state.user = action.payload;
			state.status = "user profile fetching success";
		},
		getUserProfileFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
			state.status = "user profile fetching failed";
		}
	}
});


export const { getUserProfileFailure, getUserProfileStart, getUserProfileSuccess } = userProfileSlice.actions;

export default userProfileSlice.reducer;
