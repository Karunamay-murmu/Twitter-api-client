import React from "react";
import PropTypes from "prop-types";

import FeedPostContainer from "core-ui/FeedPost/FeedPostContainer";

function ProfileTweets({ tweets, ...props }) {
	return (
		<div>
			{tweets && tweets.map((tweet, idx) => (
				<FeedPostContainer
					key={idx}
					tweet={tweet}
					{...props}
				/>
			))}
		</div>
	);
}

ProfileTweets.propTypes = {
	pinnedTweet: PropTypes.arrayOf(PropTypes.object),
	user: PropTypes.object.isRequired,
	tweets: PropTypes.array,
};

ProfileTweets.defaultProps = {
	pinnedTweet: [],
	user: {},
};

export default React.memo(ProfileTweets, (prev, next) => prev.tweets === next.tweets);
