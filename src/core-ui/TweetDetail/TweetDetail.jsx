import React from "react";
import PropTypes from "prop-types";

import FeedHeader from "components/FeedHeader/FeedHeader";
import ProfileBasicInfo from "components/ProfileBasicInfo/ProfileBasicInfo";
import MoreOptionContainer from "components/MoreOption/MoreOptionContainer";
import TweetStats from "components/TweetStats/TweetStats";
import TweetActionBarContainer from "components/TweetActionBar/TweetActionBarContainer";
import FeedPostContainer from "core-ui/FeedPost/FeedPostContainer";

import styles from "./TweetDetail.module.css";

function TweetDetail({ displayName, username, moreOptions, tweet, reTweets, likes, quoteTweets }) {
	return (
		<div>
			<FeedHeader title="Tweet" />
			<div className={styles.tweet__wrapper}>
				<div className={styles.tweet__profile}>
					<ProfileBasicInfo displayName={displayName} username={username} />
					<MoreOptionContainer moreOptions={moreOptions} />
				</div>
				<div className={styles.tweet__content__wrapper}>
					<div className={styles.tweet__content}>{tweet ?? "Liftoff"}</div>
				</div>
				<div className={styles.tweet__date}>
					<span>11:51 AM</span> <span className={styles.dot}>&middot;</span>
					<span>Nov 24, 2021</span>
				</div>
				<div className={styles.tweet__stats__wrapper}>
					<TweetStats reTweets={reTweets} quoteTweets={quoteTweets} likes={likes} />
				</div>
				<TweetActionBarContainer />
			</div>
			<div>
				<FeedPostContainer />
			</div>
		</div>
	);
}

TweetDetail.propTypes = {
	displayName: PropTypes.string,
	username: PropTypes.string,
	moreOptions: PropTypes.arrayOf(PropTypes.object),
	tweet: PropTypes.object,
	reTweets: PropTypes.number,
	likes: PropTypes.number,
	quoteTweets: PropTypes.number
};

export default TweetDetail;
