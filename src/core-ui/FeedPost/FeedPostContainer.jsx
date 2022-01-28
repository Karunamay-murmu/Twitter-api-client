// import React from "react";
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import BlockIcon from "@mui/icons-material/Block";
import CodeIcon from "@mui/icons-material/Code";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

import FeedPost from "core-ui/FeedPost/FeedPost.jsx";

function FeedPostContainer({ isFollowing, user, tweet, ...props }) {
	const moreOptions = [
		{
			"text": `${isFollowing ? `Unfollow @${user?.username}` : `Follow @${user?.username}`}`,
			"Icon": PersonAddAltOutlinedIcon,
		}, {
			"text": "Add/remove from Lists",
			"Icon": ListAltOutlinedIcon,
		}, {
			"text": `Mute @${user?.username}`,
			"Icon": VolumeOffOutlinedIcon,
		}, {
			"text": "Mute this conversation",
			"Icon": VolumeOffOutlinedIcon,
		}
		, {
			"text": `Block @${user?.username}`,
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

	const navigate = useNavigate();

	const navigateToTweetDetail = useCallback((e) => {
		e.preventDefault();
		const id = tweet?.id;
		if (id) {
			console.log(e.target);
			navigate(`/${user.username}/status/${id}`);
		}
	}, [tweet.id, user.username]);

	return (
		<FeedPost
			moreOptions={moreOptions ?? null}
			user={user}
			tweet={tweet}
			{...props}
			navigateToTweetDetail={navigateToTweetDetail}
		/>
	);
}

FeedPostContainer.propTypes = {
	isFollowing: PropTypes.bool,
	user: PropTypes.object,
	tweet: PropTypes.object,
};

export default React.memo(FeedPostContainer);
