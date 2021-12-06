import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentCardId: null,
	isOpen: false,
};

const more = createSlice({
	name: "more",
	initialState,
	reducers: {
		open: (state, action) => {
			const { id } = action.payload;
			state.currentCardId = id;
			state.isOpen = true;
		},
		close: (state) => {
			state.currentCardId = null;
			state.isOpen = false;
		},
	}
});

export const { open, close } = more.actions;

export default more.reducer;

