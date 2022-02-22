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

const token ="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Il9uSWQzZXVkWWRmVEtaUzJGWFMxSCJ9.eyJpc3MiOiJodHRwczovL2Rldi11NThmOHh5ay5hdS5hdXRoMC5jb20vIiwic3ViIjoidHdpdHRlcnw4NzU5MDUzMDMyNDU3Mjk3OTMiLCJhdWQiOlsiaHR0cHM6Ly9kamFuZ28tdHdpdHRlcjIuMC9hcGkiLCJodHRwczovL2Rldi11NThmOHh5ay5hdS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjQ1NTAyNjY0LCJleHAiOjE2NDU1ODkwNjQsImF6cCI6InpjYlhhbTVxY2RGSGVBdEZSbzlsYWx4eTdsYm9FdTJwIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.LX_pIpOCOvjX_w2mZvc6wgKPLrizmYmwZ2VnwEjDhVkcWihIohcMNP2HmAk8eHWqeHUTyWEkeFL6NJq2v28FQiMQMHfpb8CSiTYOftJT3bjyGLPKIoIZjbrMK5UzHzum7XG7zg9KTvP8ZTix6s7DZO394nEmL3zXRHAfqhvN2zV0-XCi6xI5SP_a521GJjIU4lbwQHxck4DCUKg2CVz7YknXBNfVaxZ4qIbRqMcNTTftkukvPX0UdfsMoJhgL055SEgA8pJC4azVdFRdgZ-9Wnp0D4woQFI73L_zOPNbIJmwWQSUMjxF14mJhGsr4UI99f2odAjlIX-0ez3nW98_ng";

export const fetchAuthUser = createAsyncThunk("auth/fetchAuthUser", async (arg, { rejectWithValue, signal, dispatch }) => {
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