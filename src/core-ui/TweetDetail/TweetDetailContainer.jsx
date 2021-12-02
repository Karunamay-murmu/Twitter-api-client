import React from "react";
import PropTypes from "prop-types";
import PersonRemoveAlt1OutlinedIcon from "@mui/icons-material/PersonRemoveAlt1Outlined";

import TweetDetail from "core-ui/TweetDetail/TweetDetail";

function TweetDetailContainer({ follow, ...props }) {

	const moreOptions = [
		{
			"text": `${follow ? "unfollow" : "follow"} @${props.username}`,
			"Icon": PersonRemoveAlt1OutlinedIcon,

		}
	];

	return (
		<TweetDetail moreOptions={moreOptions} {...props} />
	);
}


TweetDetailContainer.propTypes = {
	username: PropTypes.string.isRequired,
	follow: PropTypes.bool.isRequired,
};

export default TweetDetailContainer;
