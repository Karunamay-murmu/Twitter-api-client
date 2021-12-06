import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	modalId: null,
	isOpen: false,
};

const modal = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal: (state, action) => {
			state.modalId = action.payload.id;
			state.isOpen = true;
		},
		closeModal: state => {
			state.modalId = null;
			state.isOpen = false;
		}
	}
});

export const { openModal, closeModal } = modal.actions;

export default modal.reducer;