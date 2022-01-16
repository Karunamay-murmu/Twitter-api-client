"use strict";

const endpoints = {
	getUserByUsername: (username) => {
		return "users/by/username/" + username;
	},
	userTweetTimeline: (id) => `users/${id}/tweets`,
	showUser: () => "users/show.json",
	showUserTimeline: () => "tweets/user_timeline",
};


// const getEndpoint = (endpoint) => {
// 	return endpoints[endpoint];
// };

export default endpoints;