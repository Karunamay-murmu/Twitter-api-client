import React from "react";
import PropTypes from "prop-types";

import FeedTweetActionBar from "components/FeedTweetActionBar/FeedTweetActionBar.jsx";

function FeedTweetActionBarContainer({ ...props }) {
	return (
		<FeedTweetActionBar {...props} />
	);
}

FeedTweetActionBarContainer.propTypes = {
	tweetId: PropTypes.string,
};

export default FeedTweetActionBarContainer;
