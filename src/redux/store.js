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
import authenticationReducer from "redux/slice/authSlice";

// import { apiSlice } from "features/api/api-slice";

const reducer = {
	more: moreReducer,
	modal: modalReducer,
	userProfile: userProfileReducer,
	api: apiReducer,
	userTweets: tweetsReducer,
	tweetDetail: tweetDetailReducer,
	tweetReplies: tweetRepliesReducer,
	userFollowers: followersReducer,
	auth: authenticationReducer,
};

const store = configureStore({
	reducer,
	// middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;