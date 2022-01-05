import React from "react";
import PropTypes from "prop-types";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import BlockIcon from "@mui/icons-material/Block";
import CodeIcon from "@mui/icons-material/Code";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

import FeedPost from "core-ui/FeedPost/FeedPost.jsx";

function FeedPostContainer({ isFollowing, user, tweet,...props }) {
	console.log(tweet);
	console.log(user);
	const moreOptions = [
		{
			"text": `${isFollowing ? "Unfollow" : "Follow"}`,
			"Icon": PersonAddAltOutlinedIcon,
		},
		{
			"text": "Add/remove from Lists",
			"Icon": ListAltOutlinedIcon,
		}, {
			"text": "Mute",
			"Icon": VolumeOffOutlinedIcon,
		}, {
			"text": "Mute this conversation",
			"Icon": VolumeOffOutlinedIcon,
		}
		, {
			"text": "Block",
			"Icon": BlockIcon,
		}
		, {
			"text": "Embed Tweet",
			"Icon": CodeIcon,
		}
		, {
			"text": "Report Tweet",
			"Icon": FlagOutlinedIcon,
		}
	];

	// const {
	// 	id,
	// 	username,
	// 	name,
	// 	verified,
	// 	public_metrics: {
	// 		tweet_count,
	// 		follower_count,
	// 		following_count,
	// 		likes_count,
	// 		retweet_count,

	// } = tweet;


	return (
		<FeedPost
			moreOptions={moreOptions ?? null}
			{...user}
			{...props}
		/>
	);
}

FeedPostContainer.propTypes = {
	isFollowing: PropTypes.bool,
	user: PropTypes.object,
	tweet: PropTypes.array,
};

export default React.memo(FeedPostContainer);
