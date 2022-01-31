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
	user: null,
	media: null,
	meta: null,
	status: "idle",
	error: null,
};


export const fetchTweetDetail = createAsyncThunk("tweetDetail/fetch", async (id, {
	rejectWithValue,
	signal
}) => {
	try {
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
	reducers: {
		clearTweetDetailState: (state) => {
			state.tweet = null;
			state.user = null;
			state.media = null;
			state.status = "idle";
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchTweetDetail.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchTweetDetail.fulfilled, (state, action) => {
			state.tweet = [action.payload.data];
			state.user = action.payload.includes.users;
			state.media = action.payload.includes.media;
			state.meta = action.meta;
			state.status = "succeeded";
		});
		builder.addCase(fetchTweetDetail.rejected, (state, action) => {
			state.error = action.payload;
			state.status = "failed";
		});
	},
});

export const { clearTweetDetailState } = tweetDetailSlice.actions;

export const selectMetaData = (state) => state.tweetDetail.meta;
export const selectTweet = (state) => state.tweetDetail.tweet;
export const selectUser = (state) => state.tweetDetail.user;
export const selectMedia = (state) => state.tweetDetail.media;
export const selectStatus = (state) => state.tweetDetail.status;

export default tweetDetailSlice.reducer;