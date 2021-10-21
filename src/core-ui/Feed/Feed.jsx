import React from "react";

import TweetContainer from "core-ui/Tweet/TweetContainer.jsx";

import styles from "./Feed.module.css";

function Feed() {
	return (
		<div className={styles.feed}>
			{/* Header */}
			<header className={styles["feed__header"]}>
				<h2>Home</h2>
			</header>
			{/* Tweet box */}
			<div className={styles["feed__tweetbox"]}>
				<TweetContainer />
			</div>
		</div>
	);
}

export default Feed;
