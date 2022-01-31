// import React from "react";
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";


import FeedPost from "core-ui/FeedPost/FeedPost.jsx";

import styles from "./FeedPost.module.css";

function FeedPostContainer({ tweet, ...props }) {
	const navigate = useNavigate();

	const id = tweet?.id;
	const user = tweet?.user;

	const navigateToTweetDetail = useCallback((e) => {
		e.preventDefault();
		if (id) {
			navigate(`/${user.username}/status/${id}`);
		}
	}, [tweet.id, user.username]);

	const mapTweet = (tweets) => {
		return tweets.map(tweet => (
			<div key={tweet.id} className={!tweet?.isReply ? styles.post__container : ""}>
				<FeedPost
					user={tweet.user}
					tweet={tweet}
					media={tweet.media}
					navigateToTweetDetail={navigateToTweetDetail}
					{...props}
				/>
				{tweet?.replies && mapTweet(tweet.replies)}
			</div>
		));
	};

	return (
		// <div className={!tweet?.isReply ? styles.post__container : ""}>
		// 	<FeedPost
		// 		user={tweet.user}
		// 		tweet={tweet}
		// 		media={tweet.media}
		// 		navigateToTweetDetail={navigateToTweetDetail}
		// 		{...props}
		// 	/>
		// 	{tweet?.replies && mapTweet(tweet.replies)}
		// </div>
		mapTweet([tweet])
	);
}

FeedPostContainer.propTypes = {
	isFollowing: PropTypes.bool,
	user: PropTypes.object,
	tweet: PropTypes.object,
};

export default React.memo(FeedPostContainer);
