import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	tweets: null,
	media: null,
	data: null,
	userId: null,
};

export const tweetSlice = createSlice({
	name: "tweet",
	initialState,
	reducers: {
		setTweet: (state, action) => {
			const tweets = action.payload?.tweets?.data;
			const mediaData = action.payload?.tweets?.includes?.media;
			const attachments = {};
			if (mediaData) {
				for (const media of mediaData) {
					attachments[media.media_key] = media;
				}
			}
			const sortedTweets = [...tweets].sort((a, b) => {
				return new Date(b.created_at) - new Date(a.created_at);
			});
			state.media = { ...state.media, ...attachments };
			state.tweets = [...state.tweets, ...sortedTweets];
			state.data = action.payload.tweets;
			state.userId = action.payload.userId;
		},
		setPinnedTweet: (state, action) => {
			const pinnedTweet = action.payload?.data;
			const pinnedTweetMedia = action.payload?.includes?.media;
			const attachments = {};
			for (const media of pinnedTweetMedia) {
				attachments[media.media_key] = media;
			}
			state.media = { ...attachments };
			state.tweets = [{ ...pinnedTweet, isPinnedTweet: true }];
		}
	}
});

export const { setTweet, setPinnedTweet } = tweetSlice.actions;
export default tweetSlice.reducer;