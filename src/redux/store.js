import { configureStore } from "@reduxjs/toolkit";

import moreReducer from "redux/slice/moreSlice";
import modalReducer from "redux/slice/modalSlice";

const reducer = {
	more: moreReducer,
	modal: modalReducer,
};

export default configureStore({
	reducer,
});