import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "tweetApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_TWITTER_API_BASE_URL,
	}),
	endpoints: (builder) => ({
		fetchUser: builder.query({
			query: username => `users/by/username/${username}`,
		})
	})
});

export const { useFetchUserQuery } = apiSlice;