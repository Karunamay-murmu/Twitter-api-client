import { configureStore } from "@reduxjs/toolkit";

import moreReducer from "redux/slice/moreSlice";
import modalReducer from "redux/slice/modalSlice";
import userProfileReducer from "redux/slice/userSlice";
import apiReducer from "redux/slice/apiSlice";
import tweetsReducer from "redux/slice/userTweetSlice";
import tweetDetailReducer from "redux/slice/tweetDetailSlice";
import tweetRepliesReducer from "redux/slice/tweetRepliesSlice";
import followersReducer from "redux/slice/followerSlice";
import authenticationReducer from "redux/slice/authSlice";
import messageReducer from "redux/slice/messageSlice";
import homeTimeline from "redux/slice/homeTimelineSlice";
import relationshipSlice from "./slice/relationshipSlice";


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
	message: messageReducer,
	homeTimeline: homeTimeline,
	relationship: relationshipSlice
};

const store = configureStore({
	reducer,
});

export default store;