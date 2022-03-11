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

const updateRelationship = (action) => {
	return action.type.startsWith("user/manageFriendship")
		&& action.type.endsWith("fulfilled")
		&& !action.type.includes("show");
};

const userProfileSlice = createSlice({
	name: "userProfile",
	initialState,
	reducers: {
		setRelationship: (state, action) => {
			state.user.connections = action.payload.relationship;
		},
		updateRelationship: (state, action) => {
			state.user.connections.source[action.payload.relationshipType] = action.payload.data;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUser.pending, (state) => {
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
		builder.addMatcher(updateRelationship, (state, action) => {
			if (state.user?.connections) {
				const userId = action.meta?.arg?.target;
				if (userId === state.user.id) {
					const friendship = action.payload.data;
					if ("following" in friendship) {
						state.user.connections.source.following = action.payload.data.following;
					}
					if ("mutin" in friendship) {
						state.user.connections.source.following = action.payload.data.muting;
					}
					if ("blocking" in friendship) {
						state.user.connections.source.following = action.payload.data.blocking;
					}
				}
			}
		});
	}
});

export default userProfileSlice.reducer;
export const { setRelationship } = userProfileSlice.actions;

export const selectUser = state => state.userProfile.user;
export const selectPinnedTweet = state => state.userProfile.pinnedTweet;
export const selectPinnedTweetMedia = state => state.userProfile.pinnedTweetMedia || [];
