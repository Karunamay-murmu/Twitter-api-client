import React from "react";
// import { v4 as uuid } from "uuid";

import TweetContainer from "core-ui/Tweet/TweetContainer.jsx";
// import FeedPostContainer from "core-ui/FeedPost/FeedPostContainer.jsx";
import MainFeedContainer from "core-ui/MainFeed/MainFeedContainer.jsx";

import styles from "./HomeFeed.module.css";

function HomeFeed() {
	return (
		<MainFeedContainer>
			<div className={styles.feed}>
				<header className={styles.feed__header}>
					<h2>Home</h2>
				</header>
				<div className={styles.feed__tweetbox}>
					<TweetContainer />
				</div>
			</div>
		</MainFeedContainer>
	);
	// return (
	// 	<div className={styles.feed}>
	// 		<header className={styles.feed__header}>
	// 			<h2>Home</h2>
	// 		</header>
	// 		<div className={styles.feed__tweetbox}>
	// 			<TweetContainer />
	// 		</div>
	// 		<div className={styles.feed__post}>
	// 			<FeedPostContainer tweetId={uuid()} />
	// 			<FeedPostContainer tweetId={uuid()} />
	// 			<FeedPostContainer tweetId={uuid()} />
	// 			<FeedPostContainer tweetId={uuid()} />
	// 		</div>
	// 	</div>
	// );
}

export default HomeFeed;
