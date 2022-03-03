// import React from "react";
import React from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";

import FeedPost from "core-ui/FeedPostList/FeedPostList.jsx";

import styles from "./FeedPostList.module.css";

function FeedPostContainer({ tweets, ...props }) {
	const navigate = useNavigate();
	const location = useLocation();

	const navigateToTweetDetail = (e, tweet) => {
		e.preventDefault();
		navigate(`/${tweet.username}/status/${tweet.id}`);
	};

	const mapTweet = (tweets) => {
		return tweets.map((tweet) => (
			<div key={tweet?.id_str ?? tweet.id} className={!tweet?.isReply ? styles.post__container : ""}>
				<FeedPost
					user={tweet.user}
					tweet={tweet}
					media={tweet?.media ?? tweet?.extended_entities?.media}
					navigateToTweetDetail={navigateToTweetDetail}
					location={location}
					{...props}
				/>
				{tweet?.replies && mapTweet(tweet.replies)}
			</div>
		));
	};

	return mapTweet(tweets);
}

FeedPostContainer.propTypes = {
	isFollowing: PropTypes.bool,
	user: PropTypes.object,
	tweet: PropTypes.object,
};

export default React.memo(FeedPostContainer);
