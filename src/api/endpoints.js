"use strict";

const FETCH_SINGLE_USER_BY_USERNAME = "/users/by/username/";

const endpoints = {
	"user_by_username": FETCH_SINGLE_USER_BY_USERNAME
};

const getEndpoint = (endpoint) => {
	return endpoints[endpoint];
};

export default getEndpoint;