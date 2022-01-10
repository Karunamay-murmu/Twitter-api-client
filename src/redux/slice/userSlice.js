import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	data: null,
	pinnedTweets: null,
	pinnedTweetMedia: null,
};

const userProfileSlice = createSlice({
	name: "userProfile",
	initialState,
	reducers: {
		setUser: (state, action) => {
			const pinned = action.payload?.includes?.tweets;
			const pinnedTweets = pinned?.map(tweet => {
				return { ...tweet, isPinnedTweet: true };
			});
			const pinnedMedia = action.payload?.includes?.pinned_tweet_media;
			state.pinnedTweetMedia = pinnedMedia;
			state.pinnedTweets = pinnedTweets;
			state.data = action.payload;
		}
	}
});


export const { setUser } = userProfileSlice.actions;

export default userProfileSlice.reducer;
