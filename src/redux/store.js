import { configureStore } from "@reduxjs/toolkit";

import { more } from "redux/slice";

const reducer = {
	more: more.reducer,
};

export default configureStore({
	reducer,

});