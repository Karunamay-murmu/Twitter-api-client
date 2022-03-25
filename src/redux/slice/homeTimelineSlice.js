import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import Client, { cancelToken } from "api/client";
import endpoints from "api/endpoints";

const initialState = {
	tweets: [],
	tweetsMap: null,
	media: null,
	users: {},
	status: "idle",
	error: null,
};

export const fetchHomeTimeline = createAsyncThunk("tweet/fetchHomeTimeline", async (_, { rejectWithValue, signal, getState }) => {
	try {
		signal.addEventListener("abort", () => {
			cancelToken.cancel();
		});
		return await Client.get(endpoints.homeTimeline(), {
			headers: {
				"Authorization": "Bearer " + getState().auth.accessToken
			}
		});
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

const checkFriendshipActions = action => {
	return action.type.startsWith("user/manageFriendship") && action.type.endsWith("fulfilled") && !action.type.includes("show");
};

const homeTimelineSlice = createSlice({
	name: "homeTimeline",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchHomeTimeline.pending, state => {
			state.status = "loading";
		}).addCase(fetchHomeTimeline.fulfilled, (state, action) => {
			state.status = "success";
			state.tweets = action.payload.map(tweet => {
				tweet?.quoted_status && (tweet.quoted_status.is_quoted = true);
				tweet?.retweeted_status !== (null || undefined) && (tweet.is_retweet = true);
				return {
					...tweet,
					user: {
						...tweet.user,
						username: tweet.user.screen_name,
					},
					public_metrics: {
						reply_count: tweet?.reply_count ?? 0,
						retweet_count: tweet?.retweet_count,
						like_count: tweet?.favorite_count,
					},
					full_text: tweet?.retweeted_status?.full_text ?? tweet.full_text,
				};
			});
			state.tweetsMap = action.payload.reduce((acc, tweet) => {
				acc[tweet.id_str] = tweet;
				return acc;
			}, {});
			state.users = action.payload.reduce((acc, tweet) => {
				acc[tweet.user.id_str] = tweet.user;
				return acc;
			}, {});
			state.media = action.payload.reduce((acc, tweet) => {
				acc[tweet.id_str] = tweet?.extended_entities?.media;
				return acc;
			}, {});
		}).addCase(fetchHomeTimeline.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addMatcher(checkFriendshipActions, (state, action) => {
			if (state.users) {
				const user = state.users[action.meta.arg.target];
				if (user) {
					let userConnections = user.connections.filter(connection => connection !== "none");
					const friendship = action.payload.data;
					if ("following" in friendship) {
						if (friendship.following) {
							userConnections.push("following");
						} else userConnections = userConnections.filter(connection => connection !== "following");
					}
					if ("muting" in friendship) {
						if (friendship.muting) {
							userConnections.push("muting");
						} else userConnections = userConnections.filter(connection => connection !== "muting");
					}
					if ("blocking" in friendship) {
						if (friendship.blocking) {
							userConnections.push("blocking");
						} else userConnections = userConnections.filter(connection => connection !== "blocking");
					}
					user.connections = userConnections;
				}
			}
		});
	}
});

export default homeTimelineSlice.reducer;
export const selectTweets = state => state.homeTimeline.tweets;
export const selectTimelineTweetsMap = state => state.homeTimeline.tweetsMap;
export const selectMedia = state => state.homeTimeline.media;
export const selectHomeTimelineUsers = state => state.homeTimeline.users;
export const selectStatus = state => state.homeTimeline.status;

