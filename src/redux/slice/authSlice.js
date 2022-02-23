import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import endpoints from "api/endpoints";
import Client, { cancelToken } from "api/client";

const initialState = {
	user: null,
	csrf: null,
	accessToken: null,
	status: "idle",
	error: null,
};

export const fetchAuthUser = createAsyncThunk("auth/fetchAuthUser", async (token, { rejectWithValue, signal, dispatch }) => {
	try {
		signal.addEventListener("abort", () => {
			cancelToken.cancel();
		});
		const response = await Client.get(endpoints.whoAmI(), {
			headers: {
				"Authorization": "Bearer " + token
			}
		});
		dispatch(setAccessToken({ token }));
		return response;
	} catch (error) {
		return rejectWithValue(error.message);
	}
});


const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAccessToken: (state, action) => { state.accessToken = action.payload.token; },
		removeAccessToken: state => { state.accessToken = null; }
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAuthUser.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchAuthUser.fulfilled, (state, { payload }) => {
			state.status = "succeeded";
			state.user = payload.user;
			state.csrf = payload.csrf_token;
			state.jwt = payload.jwt_token;
		});
		builder.addCase(fetchAuthUser.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.payload;
		});
	}
});


export default authSlice.reducer;

export const { setAccessToken, removeAccessToken } = authSlice.actions;

export const selectAuthUser = (state) => state.auth.user;
export const selectJwt = (state) => state.auth.jwt;
export const selectCsrf = (state) => state.auth.csrf;
export const selectAuthorizeUrl = (state) => state.authentication.authorizeUrl;
export const selectAuthenticationStatus = (state) => state.authentication.status;