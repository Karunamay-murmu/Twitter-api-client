import { configureStore } from "@reduxjs/toolkit";

import moreReducer from "redux/slice/moreSlice";
import modalReducer from "redux/slice/modalSlice";
import userProfileReducer from "redux/slice/userProfileSlice";
import apiReducer from "redux/slice/apiSlice";

const reducer = {
	more: moreReducer,
	modal: modalReducer,
	userProfile: userProfileReducer,
	api: apiReducer
};

export default configureStore({
	reducer,
});