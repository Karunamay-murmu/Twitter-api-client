import {
	createSlice, nanoid
} from "@reduxjs/toolkit";

const initialState = {
	messages: {},
	isLoading: false,
	isError: false,
};

const messageSlice = createSlice({
	name: "message",
	initialState,
	reducers: {
		addMessage: (state, action) => {
			const id = nanoid();
			const {
				message,
				status
			} = action.payload;
			state.messages[id] = {
				id,
				message,
				status
			};
		},
		removeMessage: (state, action) => {
			const id = action.payload;
			delete state.messages[id];
		}
	}
});


export const {
	addMessage,
	removeMessage
} = messageSlice.actions;
export const selectMessages = state => state.message.messages;


export default messageSlice.reducer;