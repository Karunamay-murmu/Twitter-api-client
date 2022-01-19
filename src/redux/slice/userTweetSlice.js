import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import endpoints from "api/endpoints";
import Client from "api/client";

const initialState = {
	tweets: [],
	tweetsMap: null,
	media: null,
	refTweets: null,
	users: null,
	status: "idle",
	error: null,
};

const mapData = (dataSet, key) => {
	const map = {};
	for (const data of dataSet) {
		map[data[key] ?? data.id] = data;
	}
	return map;
};

export const fetchTweets = createAsyncThunk("tweet/fetch", async (id, { rejectWithValue }) => {
	try {
		return await Client.get(endpoints.userTweetTimeline(id));
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const tweetSlice = createSlice({
	name: "userTweet",
	initialState,
	reducers: {
		setTweet: (state, action) => {
			const tweets = action.payload?.tweets?.data;
			const mediaData = action.payload?.tweets?.includes?.media;
			const refUsers = action.payload?.tweets?.includes?.users;
			const refTweets = action.payload?.tweets?.includes?.tweets;
			if (mediaData) {
				state.media = { ...state.media || [], ...mapData(mediaData, "media_key") };
			}
			if (refUsers) {
				state.refUsers = mapData(refUsers);
			}
			if (refTweets) {
				state.refTweets = mapData(refTweets);
			}
			if (tweets) {
				const allTweets = {};

				for (const tweet of [...tweets, ...refTweets]) {
					allTweets[tweet.id] = tweet;
				}

				console.log(allTweets);

				const topLevelTweet = [];
				const repliesList = {};

				const checkRefTweet = (tweet) => {
					if (tweet.referenced_tweets) {
						const referencedTweets = tweet?.referencedTweets;
						if (referencedTweets) {
							for (const element of referencedTweets) {
								if (element.type === "replied_to") {
									const t = allTweets[element.id];
									repliesList[t.id] = { ...repliesList[t.id] || {}, replies: { ...t } };
									checkRefTweet(t);
								}
							}
						}
					} else {
						topLevelTweet.push(tweet);
					}
				};

				for (const tweet of tweets) {
					checkRefTweet(tweet);
				}

				console.log(topLevelTweet);
				console.log(repliesList);

				state.tweets = [...state.tweets, ...tweets];
				state.allTweets = allTweets;
			}
			state.userId = action.payload.userId;
		},
		setPinnedTweet: (state, action) => {
			const pinnedTweet = action.payload?.data;
			const pinnedTweetMedia = action.payload?.includes?.media;
			if (pinnedTweetMedia) {
				state.media = mapData(pinnedTweetMedia, "media_key");
			}
			state.pinnedTweet = [{ ...pinnedTweet, isPinnedTweet: true }];
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchTweets.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchTweets.fulfilled, (state, { payload: { data, includes: { users = [], media = [], tweets = [] } = {} } }) => {
			state.status = "succeeded";

			const tweetsMap = mapData(data);
			const refTweetsMap = mapData(tweets, "id");
			const usersMap = mapData(users, "id");
			const mediaMap = mapData(media, "media_key");

			const tweetsOnly = new Map();
			const replyStack = [];

			const mapTweet = (data) => {
				data?.forEach(tweet => {
					tweet["user"] = usersMap[tweet.author_id];
					tweet?.attachments?.media_keys?.forEach(mediaKey => {
						const media = mediaMap[mediaKey];
						media && (tweet["media"] = [...tweet["media"] ?? [], mediaMap[mediaKey]]);
					});
					if (tweet?.referenced_tweets) {
						replyStack.push(tweet);
						const refTweets = tweet?.referenced_tweets;
						const replies = [];
						if (refTweets) {
							for (const refTweet of refTweets) {
								const id = refTweet.id;
								const reply = refTweetsMap[id] ?? tweetsMap[id];
								replies.push(reply);
								if (refTweet.type === "retweeted") {
									reply.isRetweet = true;
								}
							}
							replies.length && mapTweet(replies);
						}
					} else {
						if (!tweetsOnly.has(tweet.id)) {
							tweetsOnly.set(tweet.id, tweet);
						}
					}
					if (replyStack.length) {
						const reply = replyStack.pop();
						if (!tweet.isRetweet) {
							tweet && (tweet["replies"] = [
								...tweet["replies"] = [],
								reply,
							]);
						}
					}
				});
			};
			mapTweet([...data]);

			state.tweets = [...state.tweets, ...tweetsOnly.values()];
			state.tweetsMap = {...state.tweetsMap, ...tweetsMap};
			state.refTweets = {...state.refTweets, ...refTweetsMap};
			state.users = {...state.users, ...usersMap};
			state.media = {...state.media, ...mediaMap};

		});
		builder.addCase(fetchTweets.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.payload;
		});
	}
});

export const { setTweet, setPinnedTweet } = tweetSlice.actions;
export default tweetSlice.reducer;

export const selectTweets = (state) => state.userTweets.tweets;
export const tweetStatus = (state) => state.userTweets.status;

