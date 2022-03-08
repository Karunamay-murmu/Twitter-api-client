import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import endpoints from "api/endpoints";
import Client, { cancelToken } from "api/client";

const initialState = {
	likes: [],
	tweets: [],
	tweetsMap: null,
	media: null,
	refTweets: null,
	users: null,
	tweetFetchingStatus: "idle",
	tweetManageStatus: "idle",
	error: null,
};

const mapData = (dataSet, key) => {
	const map = {};
	for (const data of dataSet) {
		map[data[key] ?? data.id] = data;
	}
	return map;
};


const manageTweet = (tweet) => {
	return createAsyncThunk(`tweet/[${tweet}]`, async (data, { rejectWithValue, signal, getState }) => {
		try {
			signal.addEventListener("abort", () => {
				cancelToken.cancel();
			});
			const endpoint = endpoints.manageTweet() + `?tweet=${tweet}`;
			return await Client.post(endpoint, {
				headers: {
					"Authorization": "Bearer " + getState().auth.accessToken,
					"X-CSRFToken": getState().auth.csrf,
				},
				withCredentials: true,
				data,
			});
		} catch (error) {
			const errorMessage = error.errors[0].message;
			return rejectWithValue(errorMessage);
		}
	});
};

export const createTweet = manageTweet("create");
export const destroyTweet = manageTweet("destroy");


export const fetchTweets = createAsyncThunk("tweet/fetch", async ({ userId, pathname }, { rejectWithValue, signal, getState }) => {
	try {
		let endpoint = endpoints.userTweetTimeline(userId);
		let path = "";
		if (pathname.includes("likes")) {
			endpoint = endpoints.userLikedTweets(userId);
			path = "likes";
		}
		signal.addEventListener("abort", () => {
			cancelToken.cancel();
		});
		const response = await Client.get(endpoint, {
			headers: {
				"Authorization": "Bearer " + getState().auth.accessToken
			}
		});
		return {
			...response,
			pathname: path
		};

	} catch (error) {
		return rejectWithValue(error.message);
	}
});

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


export const tweetSlice = createSlice({
	name: "userTweet",
	initialState,
	reducers: {
		clearTweetState: (state) => {
			state.likes = [];
			state.tweets = [];
			state.tweetsMap = null;
			state.media = null;
			state.refTweets = null;
			state.users = null;
			state.status = "idle";
			state.error = null;
		},
		setTweetUsersRelationship: (state, action) => {
			const { id, relationship } = action.payload;
			const user = state.users.filter(user => user.id === id);
			user.relationship = relationship;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchTweets.pending, (state) => {
			state.tweetFetchingStatus = "loading";
		}).addCase(fetchTweets.fulfilled, (state, action) => {
			let { payload: { pathname, data, includes: { users = [], media = [], tweets = [] } = {}, meta = {} } } = action;
			state.tweetFetchingStatus = "succeeded";
			if (meta.result_count >= 1) {
				const tweetsMap = mapData(data);
				const refTweetsMap = mapData(tweets, "id");
				const usersMap = mapData(users, "id");
				const mediaMap = mapData(media, "media_key");

				const tweetsOnly = new Map();
				const replyStack = [];

				const mapTweet = (data) => {
					data?.forEach(tweet => {
						tweet.user = usersMap[tweet.author_id];
						tweet?.attachments?.media_keys?.forEach(mediaKey => {
							const media = mediaMap[mediaKey];
							media && (tweet["media"] = [...tweet["media"] ?? [], mediaMap[mediaKey]]);
							tweet.mediaCount = (tweet.mediaCount || 0) + 1;
						});
						if (tweet?.referenced_tweets && !tweet.isQuoted) {
							replyStack.push(tweet);
							const refTweets = tweet?.referenced_tweets;
							const parent = [];
							if (refTweets) {
								for (const refTweet of refTweets) {
									const id = refTweet.id;
									const type = refTweet.type;
									const reply = refTweetsMap[id] ?? tweetsMap[id];
									if ((type === "retweeted" || type === "quoted" || (type === "replied_to" && pathname === "")) && reply) {
										parent.push(reply);
									} else {
										tweetsOnly.set(tweet.id, tweet);
										replyStack.pop();
									}
									if (type === "retweeted") {
										reply && (reply.is_retweet = true) && (reply.retweeted_by = tweet.user);
									}
									if (type === "quoted") {
										reply && (reply.is_quoted = true);
									}
								}
								parent.length && mapTweet(parent);
							}
						} else {
							if (!tweetsOnly.has(tweet.id) && !tweet?.isQuoted) {
								tweetsOnly.set(tweet.id, tweet);
							}
							if (pathname === "likes") {
								tweet.isLiked = true;
							}
						}
						if (replyStack.length) {
							const reply = replyStack.pop();
							if (!tweet.is_retweet) {
								if (tweet?.is_quoted) {
									tweetsOnly.set(reply.id, reply);
									reply.quotedTweet = tweet;
								} else {
									reply.isReply = true;
									tweet && (tweet["replies"] = [
										...tweet["replies"] = [],
										reply,
									]);
								}
							}
						}
					});
				};

				mapTweet([...data]);
				if (pathname === "") {
					state.tweets = [...state.tweets, ...tweetsOnly.values()];
				}
				if (pathname === "likes") {
					state.likes = [...state.likes, ...tweetsOnly.values()];
				}
				state.tweetsMap = { ...state.tweetsMap, ...tweetsMap };
				state.refTweets = { ...state.refTweets, ...refTweetsMap };
				state.users = { ...state.users, ...usersMap };
				state.media = { ...state.media, ...mediaMap };
			}

		}).addCase(fetchTweets.rejected, (state, action) => {
			state.tweetFetchingStatus = "failed";
			state.error = action.payload;
		});
		builder.addCase(createTweet.pending, state => {
			state.tweetManageStatus = "loading";
		}).addCase(createTweet.fulfilled, state => {
			state.tweetManageStatus = "succeeded";
		}).addCase(createTweet.rejected, (state, action) => {
			state.tweetManageStatus = "failed";
			state.error = action.payload;
		});
		builder.addMatcher(checkFriendshipActions, (state, action) => {
			if (state.users) {
				const user = state.users[action.meta.arg.target];
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
		});
	}
});

export const { clearTweetState, setTweetUsersRelationship } = tweetSlice.actions;
export default tweetSlice.reducer;

export const selectTweets = (state) => state.userTweets.tweets;
export const selectLikes = (state) => state.userTweets.likes;
export const selectTweetsUser = state => state.userTweets.users;
export const selectTweetFetchingStatus = (state) => state.userTweets.tweetFetchingStatus;
export const selectTweetManageStatus = (state) => state.userTweets.tweetManageStatus;

