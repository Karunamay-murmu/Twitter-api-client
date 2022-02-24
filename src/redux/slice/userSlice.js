import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import endpoints from "api/endpoints";
import Client, { cancelToken } from "api/client";

const initialState = {
	user: null,
	pinnedTweet: null,
	pinnedTweetMedia: null,
	status: "idle",
	error: null,
};


const manageFriendship = (friendship) => {
	return createAsyncThunk(`user/magageFriendship[${friendship}]`, async ({ sourceUser, targetUser }, { rejectWithValue, signal, getState }) => {
		try {
			signal.addEventListener("abort", () => {
				cancelToken.cancel();
			});
			const endpoint = endpoints.manageFriendship(sourceUser, targetUser) + `?friendship=${friendship}`;
			return await Client.get(endpoint, {
				headers: {
					"Authorization": "Bearer " + getState().auth.accessToken
				}
			});
		} catch (error) {
			return rejectWithValue(error.message);
		}
	});
};

export const showFriendship = manageFriendship("show");
export const createFriendship = manageFriendship("create");
export const destroyFriendship = manageFriendship("destroy");


export const fetchUser = createAsyncThunk("user/fetchUser", async (username, { rejectWithValue, signal, getState }) => {
	try {
		signal.addEventListener("abort", () => {
			cancelToken.cancel();
		});
		return await Client.get(endpoints.getUserByUsername(username), {
			headers: {
				"Authorization": "Bearer " + getState().auth.accessToken
			}
		});
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

const userProfileSlice = createSlice({
	name: "userProfile",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUser.pending || showFriendship.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
			state.status = "succeeded";
			const user = payload.data;
			const pinnedTweet = payload?.pinned_tweet?.data;
			const pinnedTweetMedia = payload?.pinned_tweet?.includes?.media;
			const pinnedMedia = {};
			if (pinnedTweetMedia) {
				for (const media of pinnedTweetMedia) {
					pinnedTweet["media"] = [...pinnedTweet["media"] || [], media];
					pinnedTweet.mediaCount = (pinnedTweet.mediaCount || 0) + 1;
					pinnedMedia[media.media_key] = media;
				}
			}
			if (pinnedTweet) {
				pinnedTweet.isPinned = true;
				pinnedTweet.user = user;
			}
			state.pinnedTweetMedia = pinnedMedia;
			state.pinnedTweet = pinnedTweet;
			state.user = user;
		});
		builder.addCase(fetchUser.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.payload;
		});
		builder.addCase(showFriendship.fulfilled, (state, action) => {
			state.user.relationship = action.payload?.relationship;
		});
		builder.addCase(createFriendship.fulfilled, (state, action) => {
			state.user.relationship.source.following = action.payload?.data.following;
		});
		builder.addCase(destroyFriendship.fulfilled, (state, action) => {
			state.user.relationship.source.following = action.payload?.data.following;
		});
	}
});

export default userProfileSlice.reducer;

export const selectUser = state => state.userProfile.user;
export const selectPinnedTweet = state => state.userProfile.pinnedTweet;
export const selectPinnedTweetMedia = state => state.userProfile.pinnedTweetMedia || [];
