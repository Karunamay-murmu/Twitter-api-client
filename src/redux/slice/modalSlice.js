import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	modalId: null,
	isOpen: false,
	location: null
};

const modal = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal: (state, action) => {
			state.modalId = action.payload.id;
			state.isOpen = true;
			state.location = action.payload.location;
		},
		closeModal: state => {
			state.modalId = null;
			state.isOpen = false;
			state.location = null;
		}
	}
});

export const { openModal, closeModal } = modal.actions;

export default modal.reducer;