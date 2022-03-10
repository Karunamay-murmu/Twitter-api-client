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

export const fetchFollowers = createAsyncThunk("[followers/following]/fetch", async ({ id, pathname }, { rejectWithValue, signal, getState }) => {
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
			headers: {
				"Authorization": "Bearer " + getState().auth.accessToken
			}
		});
		return {
			...response,
		};
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

const checkFriendshipActions = (action) => {
	return action.type.startsWith("user/manageFriendship") && action.type.endsWith("fulfilled") && !action.type.includes("show");
};

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
		builder.addCase(fetchFollowers.rejected, (state, action) => {
			state.error = action.payload;
			state.status = "failed";
		});
		builder.addMatcher(checkFriendshipActions, (state, action) => {
			const userId = action.meta.arg.target;
			const users = [].concat(state.following.data, state.followers.data).filter(user => user?.id === userId);
			if (users) {
				users.forEach(user => {
					let userConnections = user.connections.filter(connection => connection !== "none");
					const friendship = action.payload.data;
					if ("following" in friendship) {
						if (friendship.following) {
							userConnections.push("following");
						} else userConnections = userConnections.filter(connection => connection !== "following");
					}
					if ("muting" in friendship) {
						if (friendship.muting) {
							userConnections.push("muting");
						} else userConnections = userConnections.filter(connection => connection !== "muting");
					}
					if ("blocking" in friendship) {
						if (friendship.blocking) {
							userConnections.push("blocking");
						} else userConnections = userConnections.filter(connection => connection !== "blocking");
					}
					user.connections = userConnections;
				});
			}
		});
	}
});


export const { clearFollowerList } = followersSlice.actions;

export const selectFollowers = state => state.userFollowers.followers;
export const selectFollowing = state => state.userFollowers.following;
export const selectFollowedUserId = state => state.userFollowers.userId;
export const selectStatus = state => state.userFollowers.status;

export default followersSlice.reducer;