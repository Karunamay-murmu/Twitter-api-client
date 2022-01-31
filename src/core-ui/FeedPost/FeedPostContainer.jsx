// import React from "react";
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";

import FeedPost from "core-ui/FeedPost/FeedPost.jsx";
import TweetDetailContainer from "core-ui/TweetDetail/TweetDetailContainer";

import styles from "./FeedPost.module.css";

function FeedPostContainer({ tweet, ...props }) {
	const navigate = useNavigate();
	const location = useLocation();

	const navigateToTweetDetail = useCallback((e) => {
		e.preventDefault();
		if (tweet?.id) {
			navigate(`/${tweet?.user?.username}/status/${tweet?.id}`, { state: { meta: { component: TweetDetailContainer } } });
		}
	}, [tweet?.id, tweet?.user?.username]);

	const mapTweet = (tweets) => {
		return tweets.map((tweet, idx) => (
			<div key={idx} className={!tweet?.isReply ? styles.post__container : ""}>
				<FeedPost
					user={tweet.user}
					tweet={tweet}
					media={tweet.media}
					navigateToTweetDetail={navigateToTweetDetail}
					location={location}
					{...props}
				/>
				{tweet?.replies && mapTweet(tweet.replies)}
			</div>
		));
	};

	return (
		mapTweet([tweet])
	);
}

FeedPostContainer.propTypes = {
	isFollowing: PropTypes.bool,
	user: PropTypes.object,
	tweet: PropTypes.object,
};

export default React.memo(FeedPostContainer);
