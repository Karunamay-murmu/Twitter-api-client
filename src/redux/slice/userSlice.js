import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	data: null,
};

const userProfileSlice = createSlice({
	name: "userProfile",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.data = action.payload;
		}
	}
});


export const { setUser } = userProfileSlice.actions;

export default userProfileSlice.reducer;
