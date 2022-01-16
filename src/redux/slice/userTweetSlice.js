import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	pinnedTweet: null,
	tweets: [],
	media: null,
	refTweets: null,
	refUsers: null,
	topLevelTweet: null,
	userId: null,
};

const mapData = (dataSet, key) => {
	const map = {};
	for (const data of dataSet) {
		map[data[key] ?? data.id] = data;
	}
	return map;
};

export const tweetSlice = createSlice({
	name: "tweet",
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
	}
});

export const { setTweet, setPinnedTweet } = tweetSlice.actions;
export default tweetSlice.reducer;

