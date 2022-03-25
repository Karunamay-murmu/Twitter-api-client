import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_TWITTER_API_BASE_URL,
	}),
	endpoints: builder => ({
		getSingleUserByUsername: builder.query({
			query: (name) => `users/by/username/${name}`
		})
	})
});

export const { useGetSingleUserByUsernameQuery } = apiSlice;