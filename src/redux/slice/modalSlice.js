import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const modal = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal: (state, action) => {
			state[action.payload.id] = {
				id: action.payload.id,
				isOpen: true,
				location: action.payload.location,
			};
		},
		closeModal: (state, action) => {
			delete state[action.payload.id];
		}
	}
});

export const { openModal, closeModal } = modal.actions;

export default modal.reducer;