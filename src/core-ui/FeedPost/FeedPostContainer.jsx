import React from "react";
import PropTypes from "prop-types";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import BlockIcon from "@mui/icons-material/Block";
import CodeIcon from "@mui/icons-material/Code";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

import FeedPost from "core-ui/FeedPost/FeedPost.jsx";

function FeedPostContainer({ isFollowing, username, ...props }) {
	const moreOptions = [
		{
			"text": `${isFollowing ? "Unfollow" : "Follow"} @${username}`,
			"Icon": PersonAddAltOutlinedIcon,
		},
		{
			"text": `Add/remove @${username} from Lists`,
			"Icon": ListAltOutlinedIcon,
		}, {
			"text": `Mute @${username}`,
			"Icon": VolumeOffOutlinedIcon,
		}, {
			"text": "Mute this conversation",
			"Icon": VolumeOffOutlinedIcon,
		}
		, {
			"text": `Block @${username}`,
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

	return (
		<FeedPost
			moreOptions={moreOptions ?? null}
			{...props}
		/>
	);
}

FeedPostContainer.propTypes = {
	isFollowing: PropTypes.bool.isRequired,
	username: PropTypes.string.isRequired,
};

export default FeedPostContainer;
