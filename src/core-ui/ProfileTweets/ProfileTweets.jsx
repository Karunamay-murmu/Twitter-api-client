import React from "react";
import PropTypes from "prop-types";

import FeedPostContainer from "core-ui/FeedPost/FeedPostContainer";

import styles from "./ProfileTweets.module.css";

function ProfileTweets({ tweets, user, allTweets, refUsers, ...props }) {
	const referencedTweet = (tweet) => {
		if (tweet?.referenced_tweets && tweet?.in_reply_to_user_id) {
			const refTweet = allTweets[tweet?.referenced_tweets[0]?.id];
			const refUser = refUsers[tweet?.in_reply_to_user_id];
			if (!refTweet?.referenced_tweets) {
				return (<FeedPostContainer
					tweet={{ ...refTweet, hasReplies: true }}
					user={refUser}
					{...props}
				/>);
			} else {
				referencedTweet(refTweet);
			}
		} else {
			return null;
		}
	};
	return (
		<div >
			{tweets && tweets.map((tweet, idx) => {
				return (
					<div key={idx} className={styles.profile__tweet__wrapper}>
						{referencedTweet(tweet, idx)}
						<FeedPostContainer
							tweet={tweet}
							user={user}
							{...props}
						/>
					</div>
				);
			})}
		</div>
	);
}

ProfileTweets.propTypes = {
	pinnedTweet: PropTypes.arrayOf(PropTypes.object),
	user: PropTypes.object,
	tweets: PropTypes.array,
	allTweets: PropTypes.object,
	refUsers: PropTypes.object,
};

ProfileTweets.defaultProps = {
	pinnedTweet: [],
	user: {},
	refUsers: {},
	refTweets: {},
};

export default React.memo(ProfileTweets, (prev, next) => prev.tweets === next.tweets);
