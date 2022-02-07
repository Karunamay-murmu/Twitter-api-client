import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";

import moreReducer from "redux/slice/moreSlice";
import modalReducer from "redux/slice/modalSlice";
import userProfileReducer from "redux/slice/userSlice";
import apiReducer from "redux/slice/apiSlice";
import tweetsReducer from "redux/slice/userTweetSlice";
import tweetDetailReducer from "redux/slice/tweetDetailSlice";
import tweetRepliesReducer from "redux/slice/tweetRepliesSlice";
import followersReducer from "redux/slice/followerSlice";
// import { apiSlice } from "redux/apiSlice";
import { apiSlice } from "features/api/api-slice";

const reducer = {
	more: moreReducer,
	modal: modalReducer,
	userProfile: userProfileReducer,
	api: apiReducer,
	userTweets: tweetsReducer,
	tweetDetail: tweetDetailReducer,
	tweetReplies: tweetRepliesReducer,
	userFollowers: followersReducer,
	[apiSlice.reducerPath]: apiSlice.reducer,
};

export default configureStore({
	reducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});

// middleware: getDefaultMiddleware =>
// 	getDefaultMiddleware().concat(apiSlice.middleware)