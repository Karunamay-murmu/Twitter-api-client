import { apiSlice } from "features/api/api-slice";

export const tweetExtendedApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		fetchTweet: builder.query({
			query: username => `tweets/username/${username}`,
		}),
		fetchTweetWithReplies: builder.query({
			query: username => `tweets/username/${username}?replies=true`,
		}),
	})
});

export const { useFetchTweetQuery, useFetchTweetWithRepliesQuery } = tweetExtendedApiSlice;