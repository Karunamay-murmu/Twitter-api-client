const endpoints = {
	getUserByUsername: (username) => "users/by/username/" + username,
	userTweetTimeline: (id) => `users/${id}/tweets`,
	userLikedTweets: (id) => `users/${id}/liked_tweets`,
	userFollowers: (id) => `users/${id}/followers`,
	userFollowing: (id) => `users/${id}/following`,
	whoAmI: () => "users/whoami/",
	manageFriendship: (source_user, target_user) => `users/friendships/manage/${source_user}/${target_user}`,
	homeTimeline: () => "users/home_timeline",

	manageTweet: () => "tweets/",
	showUserTimeline: () => "tweets/user_timeline",
	recentTweetSearch: () => "tweets/search/recent",
	tweetDetail: (id) => `tweets/${id}`,
	tweetReplies: (id, username) => `tweets/search/recent/${id}/${username}`,

	fetchRequestToken: "oauth2/request_token",
	authenticateUser: (token, verifier) => `oauth2/login/${token}/${verifier}`,

	
	

};

export default endpoints;