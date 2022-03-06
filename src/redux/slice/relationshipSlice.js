import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import endpoints from "api/endpoints";
import Client, { cancelToken } from "api/client";
// import { updateRelationship } from "redux/slice/userSlice";

const initialState = {
	relationship: {},
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
			// if (response && friendship !== "show") {
			// 	switch (friendship) {
			// 		case "create":
			// 		case "destroy":
			// 			dispatch(updateRelationship({
			// 				relationshipType: "following",
			// 				data: response.data.following
			// 			}));
			// 			break;
			// 	}
			// }
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

const checkFulfilledFollowActions = (action, friendship) => {
	const actionType = action.type;
	if (actionType.endsWith("fulfilled")) {
		return friendship.some(action => actionType.includes(action));
	}
};


const relationshipSlice = createSlice({
	name: "relationship",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(showFriendship.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.relationship[action.payload.relationship.target.id_str] = action.payload.relationship;
		}).addMatcher(isFulfilledAction, state => {
			state.status = "succeeded";
		}).addMatcher(action => checkFulfilledFollowActions(action, ["create", "destroy"]), (state, action) => {
			const userId = action.meta.arg.target;
			state.relationship[userId].source.following = action.payload.data.following;
		}).addMatcher(action => checkFulfilledFollowActions(action, ["mute", "unmute"]), (state, action) => {
			const userId = action.meta.arg.target;
			state.relationship[userId].source.muting = action.payload.data.muting;
		}).addMatcher(action => checkFulfilledFollowActions(action, ["mute", "unmute"]), (state, action) => {
			const userId = action.meta.arg.target;
			state.relationship[userId].source.blocking = action.payload.data.blocking;
		}).addMatcher(isPendingAction, state => {
			state.status = "loading";
		}).addMatcher(isRejectedAction, (state, action) => {
			state.status = "failed";
			state.error = action.payload;
		});
	}
});

export default relationshipSlice.reducer;

export const selectRelationship = state => state.relationship.relationship;
export const selectRelationshipFetchingStatus = state => state.relationship.status;
