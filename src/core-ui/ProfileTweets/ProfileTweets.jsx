import React from "react";
import PropTypes from "prop-types";

import FeedPostContainer from "core-ui/FeedPost/FeedPostContainer";

function ProfileTweets({ user, pinnedTweet }) {
	return (
		<>
			{
				pinnedTweet && pinnedTweet.map((tweet, idx) => (
					<FeedPostContainer key={idx} user={user.data} tweet={tweet} />
				))
			}
			tweetsds
		</>
	);
}

ProfileTweets.propTypes = {
	pinnedTweet: PropTypes.arrayOf(PropTypes.object).isRequired,
	user: PropTypes.object.isRequired,
};

ProfileTweets.defaultProps = {
	pinnedTweet: [],
	user: {},
};

export default ProfileTweets;
