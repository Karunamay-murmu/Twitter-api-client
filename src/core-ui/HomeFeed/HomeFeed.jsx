import React from "react";

import TweetContainer from "core-ui/Tweet/TweetContainer.jsx";
import FeedPostContainer from "core-ui/FeedPost/FeedPostContainer.jsx";

import styles from "./HomeFeed.module.css";

function Feed() {
	return (
		<div className={styles.feed}>
			<header className={styles.feed__header}>
				<h2>Home</h2>
			</header>
			<div className={styles.feed__tweetbox}>
				<TweetContainer />
			</div>
			<div className={styles.feed__post}>
				<FeedPostContainer />
				<FeedPostContainer />
				<FeedPostContainer />
				<FeedPostContainer />
			</div>
		</div>
	);
}

export default Feed;