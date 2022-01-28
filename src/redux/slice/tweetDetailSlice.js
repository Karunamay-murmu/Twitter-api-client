import {
	createSlice,
	createAsyncThunk
} from "@reduxjs/toolkit";

import endpoints from "api/endpoints";
import Client, {
	cancelToken
} from "api/client";

const initialState = {
	tweet: null,
	replies: [],
	status: "idle",
	error: null,
};


export const fetchTweetDetail = createAsyncThunk("tweetDetail/fetch", async (id, {
	rejectWithValue,
	signal
}) => {
	try {
		console.log(id);
		const endpoint = endpoints.tweetDetail(id);
		signal.addEventListener("abort", () => {
			cancelToken.cancel();
		});
		const response = await Client.get(endpoint, {
			cancelRequest: signal,
		});
		return {
			...response
		};
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const tweetDetailSlice = createSlice({
	name: "tweetDetail",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchTweetDetail.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchTweetDetail.fulfilled, (state, action) => {
			// TODO: serialize the response
			state.tweet = action.payload.tweet;
			state.replies = action.payload.replies;
			state.status = "succeeded";
		});
		builder.addCase(fetchTweetDetail.rejected, (state, action) => {
			state.error = action.payload;
			state.status = "failed";
		});
	},
});

export const selectTweet = (state) => state.tweetDetail.tweet;
export const selectReplies = (state) => state.tweetDetail.replies;
export const selectStatus = (state) => state.tweetDetail.status;

export default tweetDetailSlice.reducer;