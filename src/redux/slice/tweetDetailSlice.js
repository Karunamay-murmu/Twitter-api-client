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
	users: {},
	media: null,
	referenceTweets: {},
	meta: null,
	status: "idle",
	error: null,
};


export const fetchTweetDetail = createAsyncThunk("tweetDetail/fetch", async (id, {
	rejectWithValue,
	signal,
	getState
}) => {
	try {
		signal.addEventListener("abort", () => {
			cancelToken.cancel();
		});
		return await Client.get(endpoints.tweetDetail(id), {
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


export const tweetDetailSlice = createSlice({
	name: "tweetDetail",
	initialState,
	reducers: {
		clearTweetDetailState: (state) => {
			state.tweet = null;
			state.users = null;
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
			state.status = "succeeded";

			const tweet = action.payload.data;
			const refTweets = action.payload?.includes?.tweets;
			const users = action.payload?.includes?.users;

			state.users = users.reduce((acc, user) => {
				acc[user.id] = user;
				return acc;
			}, state.users);

			const tweets = [];
			tweet.user = state.users[tweet.author_id];

			if (refTweets) {
				state.referenceTweets = refTweets?.reduce((acc, tweet) => {
					acc[tweet.id] = tweet;
					return acc;
				}, state.referenceTweets);
				if (tweet?.referenced_tweets) {
					tweet.isReply = true;
					for (const refTweet of tweet.referenced_tweets) {
						const replies = [];
						if (refTweet.type === "replied_to") {
							const parentTweet = state.referenceTweets[refTweet.id];
							replies.push(tweet);
							parentTweet.user = state.users[parentTweet.author_id];
							parentTweet.replies = replies;
							tweets.push(parentTweet);
						}
					}
				}
			} else {
				tweets.push(tweet);
			}

			state.tweet = tweets;
			state.media = action.payload.includes.media;
			state.meta = action.meta;
		});
		builder.addCase(fetchTweetDetail.rejected, (state, action) => {
			state.error = action.payload;
			state.status = "failed";
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
	},
});

export const { clearTweetDetailState } = tweetDetailSlice.actions;

export const selectMetaData = (state) => state.tweetDetail.meta;
export const selectTweet = (state) => state.tweetDetail.tweet;
export const selectTweetDetailsUsers = (state) => state.tweetDetail.users;
export const selectMedia = (state) => state.tweetDetail.media;
export const selectStatus = (state) => state.tweetDetail.status;

export default tweetDetailSlice.reducer;