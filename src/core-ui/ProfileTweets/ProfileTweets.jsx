import React from "react";
import PropTypes from "prop-types";

import FeedPostContainer from "core-ui/FeedPost/FeedPostContainer";

import styles from "./ProfileTweets.module.css";

function ProfileTweets({ tweets, ...props }) {
	const mapTweets = (tweets) => {
		return tweets.map((tweet, idx) => (
			<div key={idx} className={`${!tweet?.referenced_tweets ? styles.profile__tweet__wrapper : "" }`}>
				<FeedPostContainer
					tweet={tweet}
					user={tweet.user}
					media={tweet.media}
					{...props}
				/>
				{tweet?.replies && mapTweets(tweet.replies)}
			</div>
		));
	};
	return (
		<>
			{mapTweets(tweets)}
		</>
	);
}

ProfileTweets.propTypes = {
	tweets: PropTypes.array,
};

ProfileTweets.defaultProps = {
	tweets: [],
};

export default React.memo(ProfileTweets, (prev, next) => prev.tweets === next.tweets);
