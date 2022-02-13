import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import endpoints from "api/endpoints";
import Client, { cancelToken } from "api/client";

const initialState = {
	isAuthenticated: false,
	authorizeUrl: null,
	token: null,
	status: "idle",
	error: null,
};

export const fetchRequestToken = createAsyncThunk("authentication/fetchRequestToken", async () => {
	try {
		return await Client.get(endpoints.fetchRequestToken);
	} catch (error) {
		console.log(error);
	}
});

export const authenticateUser = createAsyncThunk("authentication/authenticateUser", async ({ token, verifier }, { rejectWithValue, signal }) => {
	try {
		signal.addEventListener("abort", () => {
			cancelToken.cancel();
		});
		return await Client.get(endpoints.authenticateUser(token, verifier));
	} catch (error) {
		return rejectWithValue(error.message);
	}

});

const authenticationSlice = createSlice({
	name: "authentication",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchRequestToken.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchRequestToken.fulfilled, (state, { payload }) => {
			state.status = "succeeded";
			state.authorizeUrl = payload.authorize_url;
		});
		builder.addCase(fetchRequestToken.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.payload;
		});
		builder.addCase(authenticateUser.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(authenticateUser.fulfilled, (state, { payload }) => {
			state.status = "succeeded";
			state.isAuthenticated = true;
			state.token = payload?.token;
		});
		builder.addCase(authenticateUser.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.payload;
		});
	}
});


export default authenticationSlice.reducer;

export const selectToken = (state) => state.authentication.token;
export const selectIsAuthenticated = (state) => state.authentication.isAuthenticated;
export const selectAuthorizeUrl = (state) => state.authentication.authorizeUrl;
export const selectAuthenticationStatus = (state) => state.authentication.status;