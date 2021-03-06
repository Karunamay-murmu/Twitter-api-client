import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import endpoints from "api/endpoints";
import Client, { cancelToken } from "api/client";

const initialState = {
	data: {},
	status: "idle",
	error: null
};

const manageFriendship = (friendship) => {
	return createAsyncThunk(`user/manageFriendship[${friendship}]`, async ({ source, target }, { rejectWithValue, signal, getState }) => {
		try {
			signal.addEventListener("abort", () => {
				cancelToken.cancel();
			});
			const endpoint = endpoints.manageFriendship(source, target) + `?friendship=${friendship}`;
			const response = await Client.get(endpoint, {
				headers: {
					"Authorization": "Bearer " + getState().auth.accessToken
				}
			});
			return response;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	});
};

export const showFriendship = manageFriendship("show");
export const createFriendship = manageFriendship("create");
export const destroyFriendship = manageFriendship("destroy");
export const muteFriendship = manageFriendship("mute");
export const unmuteFriendship = manageFriendship("unmute");
export const blockFriendship = manageFriendship("block");
export const unblockFriendship = manageFriendship("unblock");


const isPendingAction = action => action.type.endsWith("pending") && action.type.includes("manageFriendship");
const isRejectedAction = action => action.type.endsWith("rejected");
const isFulfilledAction = action => action.type.endsWith("fulfilled");

const checkFriendshipActions = (action) => {
	return action.type.startsWith("user/manageFriendship")
		&& action.type.endsWith("fulfilled")
		&& !action.type.includes("show");
};


const relationshipSlice = createSlice({
	name: "relationship",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(showFriendship.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.data = action.payload;
		}).addMatcher(isFulfilledAction, state => {
			state.status = "succeeded";
		}).addMatcher(checkFriendshipActions, (state, action) => {
			state.data = action.payload;
		}).addMatcher(isPendingAction, state => {
			state.status = "loading";
		}).addMatcher(isRejectedAction, (state, action) => {
			state.status = "failed";
			state.error = action.payload;
		});
	}
});

export default relationshipSlice.reducer;

export const selectRelationship = state => state.relationship.data;
export const selectRelationshipFetchingStatus = state => state.relationship.status;
