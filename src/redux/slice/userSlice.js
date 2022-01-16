import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import endpoints from "api/endpoints";
import Client from "api/client";

const initialState = {
	user: null,
	pinnedTweet: null,
	pinnedTweetMedia: null,
	status: "idle",
	error: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async username => {
	const response = await Client.get(endpoints.getUserByUsername(username));
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
			const pinnedTweet = payload?.pinned_tweet?.data;
			const pinnedTweetMedia = payload?.pinned_tweet?.includes?.media;

			const pinnedMedia = {};
			if (pinnedTweetMedia) {
				for (const media of pinnedTweetMedia) {
					pinnedTweet["media"] = [...pinnedTweet["media"] || [], media];
					pinnedMedia[media.media_key] = media;
				}
			}
			pinnedTweet && (pinnedTweet["isPinned"] = true);

			state.pinnedTweetMedia = pinnedMedia;
			state.pinnedTweet = pinnedTweet;
			state.user = payload.data;
		});
		builder.addCase(fetchUser.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error;
		});
	}
});

export default userProfileSlice.reducer;

export const selectUser = state => state.userProfile.user;
export const selectPinnedTweet = state => state.userProfile.pinnedTweet || {};
export const selectPinnedTweetMedia = state => state.userProfile.pinnedTweetMedia || [];
