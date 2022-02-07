import { apiSlice } from "features/api/api-slice";

export const userExtendedApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		fetchUser: builder.query({
			query: username => `users/by/username/${username}`,
		})
	})
});

export const { useFetchUserQuery } = userExtendedApiSlice;
export const selectUserResult = userExtendedApiSlice.endpoints.fetchUser.select();