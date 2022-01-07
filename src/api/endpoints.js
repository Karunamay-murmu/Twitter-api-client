"use strict";

const endpoints = {
	getUserByUsername: (username) => {
		return "users/by/username/" + username;
	},
	getTweetsByTweetId: (tweetId) => `users/${tweetId}/tweets`,
	showUser: () => "users/show.json",
};


// const getEndpoint = (endpoint) => {
// 	return endpoints[endpoint];
// };

export default endpoints;