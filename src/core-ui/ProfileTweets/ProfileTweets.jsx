import React from "react";
import PropTypes from "prop-types";

import FeedPostContainer from "core-ui/FeedPostList/FeedPostListContainer";

import styles from "./ProfileTweets.module.css";

function ProfileTweets({ tweets, pathname, user, status, ...props }) {
	if (status === "successed" || tweets.length === 0 || !tweets) {
		return (
			<div className={styles.message__wrapper}>
				<div className={styles.message}>
					{pathname.includes("/") && (
						<div className={styles.message__main}>@{user.username} hasn&#39;t post any Tweets</div>
					)}
					{pathname.includes("likes") && (
						<div className={styles.message__main}>@{user.username} hasn&#39;t liked any Tweets</div>
					)}
					{pathname.includes("media") && (
						<div className={styles.message__main}>@{user.username} hasn&#39;t Tweeted any photos or videos</div>
					)}
					<div className={styles.message__meta}>When they do, those Tweets will show up here.</div>
				</div>
			</div>
		);
	}

	return (<FeedPostContainer
		tweets={tweets}
		{...props}
	/>);
}

ProfileTweets.propTypes = {
	tweets: PropTypes.array,
	pathname: PropTypes.string,
	user: PropTypes.object,
	status: PropTypes.string,
};

ProfileTweets.defaultProps = {
	tweets: [],
};

export default React.memo(ProfileTweets, (prev, next) => prev.tweets === next.tweets);
