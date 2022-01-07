import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	data: null,
	userId: null,
};

export const tweetSlice = createSlice({
	name: "tweet",
	initialState,
	reducers: {
		setTweet: (state, action) => {
			state.data = action.payload.tweets;
			state.userId = action.payload.userId;
		}
	}
});

export const { setTweet } = tweetSlice.actions;
export default tweetSlice.reducer;