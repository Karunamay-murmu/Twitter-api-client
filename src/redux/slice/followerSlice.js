import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import endpoints from "api/endpoints";
import Client, { cancelToken } from "api/client";

const initialState = {
	followers: {
		data: null,
		userId: null,
	},
	following: {
		data: null,
		userId: null,
	},
	status: "idle",
	error: null,
};

export const fetchFollowers = createAsyncThunk("[followers/following]/fetch", async ({ id, pathname }, { rejectWithValue, signal }) => {
	try {
		let endpoint;
		if (pathname === "followers") {
			endpoint = endpoints.userFollowers(id);
		}
		if (pathname === "following") {
			endpoint = endpoints.userFollowing(id);
		}
		signal.addEventListener("abort", () => {
			cancelToken.cancel();
		});
		const response = await Client.get(endpoint, {
			cancelRequest: signal,
		});
		return {
			...response,
		};
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const followersSlice = createSlice({
	name: "followers/following",
	initialState,
	reducers: {
		clearFollowerList: (state, action) => {
			const { pathname } = action.payload;
			state[pathname].data = null;
			state[pathname].userId = null;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchFollowers.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchFollowers.fulfilled, (state, action) => {
			const { payload: { data }, meta } = action;
			state[meta.arg.pathname].data = data;
			state[meta.arg.pathname].userId = meta.arg.id;
			state.status = "succeeded";
		});
		// builder.addCase(fetchFollowers.fulfilled, (state, action) => {
		// 	console.log(action);
		// 	const pathname = action.meta.arg.pathname;
		// 	if (pathname.includes("followers")) {
		// 		state.followers.data = action.payload.data;
		// 		state.followers.userId = action.meta.arg.id;
		// 	}
		// 	if (pathname.includes("following")) {
		// 		state.following.data = action.payload.data;
		// 		state.following.userId = action.meta.arg.id;
		// 	}
		// 	state.status = "succeeded";
		// });
		builder.addCase(fetchFollowers.rejected, (state, action) => {
			state.error = action.payload;
			state.status = "failed";
		});
	}
});

// builder.addCase(fetchFollowers.fulfilled, (state, action) => {
// 	const { payload: { data, pathname }, meta } = action;
// 	state[pathname].data = data;
// 	state[pathname].userId = meta.arg.id;
// 	state.status = "succeeded";
// });

export const { clearFollowerList } = followersSlice.actions;

export const selectFollowers = state => state.userFollowers.followers;
export const selectFollowing = state => state.userFollowers.following;
export const selectFollowedUserId = state => state.userFollowers.userId;
export const selectStatus = state => state.userFollowers.status;

export default followersSlice.reducer;