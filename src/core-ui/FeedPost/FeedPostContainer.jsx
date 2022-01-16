import React from "react";
import PropTypes from "prop-types";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import BlockIcon from "@mui/icons-material/Block";
import CodeIcon from "@mui/icons-material/Code";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

import FeedPost from "core-ui/FeedPost/FeedPost.jsx";

function FeedPostContainer({ isFollowing, ...props }) {
	const moreOptions = [
		{
			"text": `${isFollowing ? "Unfollow" : "Follow"} `,
			"Icon": PersonAddAltOutlinedIcon,
		},
		{
			"text": "Add/remove from Lists",
			"Icon": ListAltOutlinedIcon,
		}, {
			"text": "Mute ",
			"Icon": VolumeOffOutlinedIcon,
		}, {
			"text": "Mute this conversation",
			"Icon": VolumeOffOutlinedIcon,
		}
		, {
			"text": "Block ",
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
	isFollowing: PropTypes.bool,
	user: PropTypes.object,
};

export default React.memo(FeedPostContainer);
