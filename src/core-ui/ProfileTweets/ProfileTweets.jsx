import React from "react";
import PropTypes from "prop-types";

import FeedPostContainer from "core-ui/FeedPost/FeedPostContainer";

import styles from "./ProfileTweets.module.css";

function ProfileTweets({ tweets, pathname, user, ...props }) {
	const mapTweets = (tweets) => {
		if (!tweets.length) {
			return (
				<div className={styles.message__wrapper}>
					<div className={styles.message}>
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
		return tweets.map((tweet, idx) => (
			<div key={idx} className={`${!tweet?.referenced_tweets || tweet?.isLiked ? styles.profile__tweet__wrapper : ""}`}>
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
	pathname: PropTypes.string,
	user: PropTypes.object,
};

ProfileTweets.defaultProps = {
	tweets: [],
};

export default React.memo(ProfileTweets, (prev, next) => prev.tweets === next.tweets);
