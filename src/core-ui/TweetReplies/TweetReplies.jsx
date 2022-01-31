import React from "react";
import PropTypes from "prop-types";

import FeedPostContainer from "core-ui/FeedPost/FeedPostContainer";

function TweetReplies({ replies }) {
	return (
		<div>
			{replies.map((reply, idx) =>
				<div key={idx}>
					<FeedPostContainer tweet={reply} />
				</div>
			)}
		</div>
	);
}

TweetReplies.propTypes = {
	replies: PropTypes.array,
};

export default TweetReplies;
