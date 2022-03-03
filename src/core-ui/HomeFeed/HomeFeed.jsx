import React from "react";
import PropTypes from "prop-types";

import TweetContainer from "core-ui/Tweet/TweetContainer.jsx";
import MainFeedContainer from "core-ui/MainFeed/MainFeedContainer.jsx";

import styles from "./HomeFeed.module.css";
import FeedPostContainerList from "core-ui/FeedPostList/FeedPostListContainer";
import Spinner from "components/Spinner/Spinner";

function HomeFeed({ tweets, timelineStatus }) {
	return (
		<MainFeedContainer>
			<div className={styles.feed}>
				<header className={styles.feed__header}>
					<h2>Home</h2>
				</header>
				<div className={styles.feed__tweetbox}>
					<TweetContainer />
				</div>
				<div>
					{
						timelineStatus === "loading" ?
							<Spinner message="Loading tweets..." /> :
							<FeedPostContainerList tweets={tweets} />
					}
				</div>
			</div>
		</MainFeedContainer>
	);
}

HomeFeed.propTypes = {
	tweets: PropTypes.array.isRequired,
	timelineStatus: PropTypes.string.isRequired,
};

export default HomeFeed;
