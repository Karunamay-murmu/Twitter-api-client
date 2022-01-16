import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import endpoints from "api/endpoints";
import Client from "api/client";

const initialState = {
	user: null,
	pinnedTweets: null,
	pinnedTweetMedia: null,
	status: "idle",
	error: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", username => {
	const response = Client.get(endpoints.getUserByUsername(username));
	return response;
});

const userProfileSlice = createSlice({
	name: "userProfile",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUser.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
			state.status = "succeeded";
			let pinnedTweets = payload?.pinned_tweet?.data;
			pinnedTweets = {
				...pinnedTweets,
				isPinned: true,
			};
			const pinnedMedia = {};
			const medias = payload?.pinned_tweet?.includes?.media;
			for (const media of medias) {
				pinnedMedia["media_key"] = media;
			}
			state.pinnedTweetMedia = pinnedMedia;
			state.pinnedTweets = pinnedTweets;
			state.user = payload.data;
		});
		builder.addCase(fetchUser.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error;
		});
	}
});


export const { setUser } = userProfileSlice.actions;

export default userProfileSlice.reducer;

export const selectUser = state => state.userProfile.user;
export const selectPinnedTweets = state => state.userProfile.pinnedTweets;
export const selectPinnedTweetMedia = state => state.userProfile.pinnedTweetMedia;
