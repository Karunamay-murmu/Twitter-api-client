import {
	createSlice,
	createAsyncThunk
} from "@reduxjs/toolkit";

import endpoints from "api/endpoints";
import Client, {
	cancelToken
} from "api/client";

const initialState = {
	replies: [],
	repliesMap: null,
	refTweetsMap: null,
	users: null,
	meta: null,
	status: "idle",
	error: null,
};


export const fetchTweetReplies = createAsyncThunk("tweetReplies/fetch", async ({ id, username }, {
	rejectWithValue,
	signal,
	getState
}) => {
	try {
		const endpoint = endpoints.tweetReplies(id, username);
		signal.addEventListener("abort", () => {
			cancelToken.cancel();
		});
		return await Client.get(endpoint, {
			headers: {
				"Authorization": "Bearer " + getState().auth.accessToken
			}
		});
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

const mapData = (dataSet, key) => {
	const map = {};
	if (dataSet) {
		for (const data of dataSet) {
			map[data[key] ?? data.id] = data;
		}
	}
	return map;
};

export const tweetRepliesSlice = createSlice({
	name: "tweetReplies",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchTweetReplies.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchTweetReplies.fulfilled, (state, action) => {
			state.status = "succeeded";

			if (action.payload.meta.result_count !== 0) {

				const data = action?.payload?.data;
				const includeUser = action?.payload?.includes?.users;
				const includeMedia = action?.payload?.includes?.media;
				const includeTweets = action?.payload?.includes?.tweets;


				const repliesMap = mapData(data, "id");
				const userMap = mapData(includeUser, "id");
				const refTweetsMap = mapData(includeTweets, "id");
				const mediaMap = mapData(includeMedia, "media_key");

				const replyData = {};
				const replyStack = [];

				const serializeData = (tweets) => {
					tweets.forEach((tweet) => {
						tweet["user"] = userMap[tweet.author_id];
						tweet?.attachments?.media_keys?.forEach((mediaKey) => {
							const media = mediaMap[mediaKey];
							media && (tweet["media"] = [...tweet["media"] ?? [], mediaMap[mediaKey]]);
						});
						const referenced_tweets = tweet.referenced_tweets;
						if (referenced_tweets && !replyData[tweet.id]) {
							const parent = [];
							for (const refTweet of referenced_tweets) {
								const replyOf = refTweetsMap[refTweet.id] || repliesMap[refTweet.id];
								if (refTweet.type === "replied_to" && replyOf?.conversation_id !== replyOf?.id && replyOf) {
									replyStack.push(tweet);
									replyOf && parent.push(replyOf);
								} else {
									!replyData[tweet.id] && (replyData[tweet.id] = tweet);
									continue;
								}
							}
							if (parent.length) {
								serializeData(parent);
							}
						}
						if (replyStack.length) {
							const reply = replyStack.pop();
							reply.isReply = true;
							tweet && (tweet["replies"] = [...tweet["replies"] = [], reply]);
						}
					});
				};

				serializeData(data);

				const replies = Object.values(replyData);

				state.repliesMap = repliesMap;
				state.refTweetsMap = refTweetsMap;
				state.replies = replies;
				state.users = userMap;
			}

			state.meta = action.meta;

		});
		builder.addCase(fetchTweetReplies.rejected, (state, action) => {
			state.error = action.payload;
			state.status = "failed";
		});
	},
});

export const selectMetaData = state => state.tweetReplies.meta;
export const selectReplies = state => state.tweetReplies.replies;
export const selectStatus = state => state.tweetReplies.status;

export default tweetRepliesSlice.reducer;