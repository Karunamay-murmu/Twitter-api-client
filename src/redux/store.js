import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";

import moreReducer from "redux/slice/moreSlice";
import modalReducer from "redux/slice/modalSlice";
import userProfileReducer from "redux/slice/userSlice";
import apiReducer from "redux/slice/apiSlice";
import tweetsReducer from "redux/slice/userTweetSlice";
// import { apiSlice } from "redux/apiSlice";

const reducer = {
	more: moreReducer,
	modal: modalReducer,
	userProfile: userProfileReducer,
	api: apiReducer,
	userTweets: tweetsReducer,
	// [apiSlice.reducerPath]: apiSlice.reducer,
};

export default configureStore({
	reducer,
	// middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

// middleware: getDefaultMiddleware =>
// 	getDefaultMiddleware().concat(apiSlice.middleware)