"use strict";

const endpoints = {
	getUserByUsername: (username) => {
		return "users/by/username/" + username;
	},
	userTweetTimeline: (id) => `users/${id}/tweets`,
	userLikedTweets: (id) => `users/${id}/liked_tweets`,
	recentTweetSearch: () => "tweets/search/recent",
	tweetDetail: (id) => `tweets/search/recent/${id}`,
	
	showUser: () => "users/show.json",
	showUserTimeline: () => "tweets/user_timeline",

};


// const getEndpoint = (endpoint) => {
// 	return endpoints[endpoint];
// };

export default endpoints;