import React from "react";
import PropTypes from "prop-types";

import styles from "./TweetStats.module.css";

function TweetStats({ reTweets=13, quoteTweets=11, likes=5 }) {
	return (
		<div className={styles.stats__wrapper}>
			<div className={styles.stats__data} ><span>{reTweets}</span> Retweets</div>
			<div className={styles.stats__data} ><span>{quoteTweets}</span> Quote Tweets</div>
			<div className={styles.stats__data} ><span>{likes}</span> Likes</div>
		</div>
	);
}

TweetStats.propTypes = {
	reTweets: PropTypes.number.isRequired,
	quoteTweets: PropTypes.number.isRequired,
	likes: PropTypes.number.isRequired
};

export default TweetStats;
