import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import endpoints from "api/endpoints";
import Client from "api/client";

const initialState = {
	csrf: null,
	jwt: null,
	status: "idle",
	error: null,
};

export const fetchCsrfToken = createAsyncThunk("csrfToken/fetch", async () => {
	try {
		return await Client.get(endpoints.fetchCsrfToken);
	} catch (error) {
		return error.message;
	}
});

const tokenSlice = createSlice({
	name: "token",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCsrfToken.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchCsrfToken.fulfilled, (state, { payload }) => {
			state.status = "succeeded";
			state.csrf = payload.csrf_token;
			state.jwt = payload.jwt_token;
		});
		builder.addCase(fetchCsrfToken.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.payload;
		});
	}
});

export default tokenSlice.reducer;

export const selectCsrfToken = (state) => state.token.csrfToken;