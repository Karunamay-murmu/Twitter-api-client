import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// interface options {
// 	name: string;
// 	endpoint: string;
// 	thunkArgs: any;

// }

export default function thunkFetch(options) {
	const { name, endpoint, thunkArgs } = options;
	return createAsyncThunk(name, async (thunkArgs, { rejectWithValue, signal, getState }) => {
		try {
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
}

export const useThunk = createAsyncThunk("user/fetchUser", async (username, { rejectWithValue, signal, getState }) => {
	try {
		signal.addEventListener("abort", () => {
			cancelToken.cancel();
		});
		return await Client.get(endpoints.getUserByUsername(username), {
			headers: {
				"Authorization": "Bearer " + getState().auth.accessToken
			}
		});
	} catch (error) {
		return rejectWithValue(error.message);
	}
});