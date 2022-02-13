"use strict";

const endpoints = {
	getUserByUsername: (username) => {
		return "users/by/username/" + username;
	},
	userTweetTimeline: (id) => `users/${id}/tweets`,
	userLikedTweets: (id) => `users/${id}/liked_tweets`,
	recentTweetSearch: () => "tweets/search/recent",
	tweetDetail: (id) => `tweets/${id}`,
	tweetReplies: (id, username) => `tweets/search/recent/${id}/${username}`,
	userFollowers: (id) => `users/${id}/followers`,
	userFollowing: (id) => `users/${id}/following`,
	fetchRequestToken: "oauth2/request_token",
	authenticateUser: (token, verifier) => `oauth2/login/${token}/${verifier}`,


	showUser: () => "users/show.json",
	showUserTimeline: () => "tweets/user_timeline",

};


// const getEndpoint = (endpoint) => {
// 	return endpoints[endpoint];
// };

export default endpoints;