import React from "react";
import PropTypes from "prop-types";

import FeedPostListContainer from "core-ui/FeedPostList/FeedPostListContainer";

function TweetReplies({ replies }) {
	return (
		<FeedPostListContainer tweets={replies} />
	);
}

TweetReplies.propTypes = {
	replies: PropTypes.array,
};

export default TweetReplies;
