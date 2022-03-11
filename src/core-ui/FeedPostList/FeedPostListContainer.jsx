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

	const mapTweet = (tweets) => tweets?.map((tweet, idx) => {
		const username = tweet?.user?.screen_name ?? tweet?.user?.username;
		const tweetId = tweet?.id ?? tweet?.id_str;
		const isTweetDetail = location.pathname === `/${username}/status/${tweetId}`;
		return <div key={idx} className={!tweet?.isReply ? styles.post__container : ""}>
			<FeedPost
				tweet={tweet}
				media={tweet?.media ?? tweet?.extended_entities?.media}
				navigateToTweetDetail={navigateToTweetDetail}
				location={location}
				isTweetDetail={isTweetDetail}
				{...props}
			/>
			{tweet?.replies && mapTweet(tweet.replies)}
		</div>;

	});

	return mapTweet(tweets);
}

FeedPostContainer.propTypes = {
	isFollowing: PropTypes.bool,
	user: PropTypes.object,
	tweet: PropTypes.object,
};

export default React.memo(FeedPostContainer);


