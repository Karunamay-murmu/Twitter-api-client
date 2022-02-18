import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import endpoints from "api/endpoints";
import Client, { cancelToken } from "api/client";

const initialState = {
	user: null,
	status: "idle",
	error: null,
};

export const fetchAuthUser = createAsyncThunk("auth/fetchAuthUser", async (sub, { rejectWithValue, signal }) => {
	try {
		signal.addEventListener("abort", () => {
			cancelToken.cancel();
		});
		return await Client.get(endpoints.whoAmI(sub));
	} catch (error) {
		return rejectWithValue(error.message);
	}
});


const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchAuthUser.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchAuthUser.fulfilled, (state, { payload }) => {
			state.status = "succeeded";
			state.user = payload.user;
		});
		builder.addCase(fetchAuthUser.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.payload;
		});
	}
});


export default authSlice.reducer;

export const selectAuthUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.authentication.isAuthenticated;
export const selectAuthorizeUrl = (state) => state.authentication.authorizeUrl;
export const selectAuthenticationStatus = (state) => state.authentication.status;