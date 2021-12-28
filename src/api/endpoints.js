"use strict";

const FETCH_SINGLE_USER_BY_USERNAME = "users/by/username/";

const endpoints = {
	"user_by_username": FETCH_SINGLE_USER_BY_USERNAME,
	getUserByUsername: (username) => {
		return FETCH_SINGLE_USER_BY_USERNAME + username;
	},
};


// const getEndpoint = (endpoint) => {
// 	return endpoints[endpoint];
// };

export default endpoints;