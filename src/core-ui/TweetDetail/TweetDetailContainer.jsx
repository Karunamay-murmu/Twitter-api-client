import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import BlockIcon from "@mui/icons-material/Block";
import CodeIcon from "@mui/icons-material/Code";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

import TweetDetail from "core-ui/TweetDetail/TweetDetail";
import MainFeedContainer from "core-ui/MainFeed/MainFeedContainer";
import { fetchTweetDetail, selectTweet, selectStatus } from "redux/slice/tweetDetailSlice";

function TweetDetailContainer({ isFollowing, username = "Karunamay", ...props }) {

	const moreOptions = [
		{
			"text": `${isFollowing ? "Unfollow" : "Follow"} @${username}`,
			"Icon": PersonAddAltOutlinedIcon,
		}, {
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

	const tweet = useSelector(state => selectTweet(state));
	const tweetStatus = useSelector(state => selectStatus(state));
	const dispatch = useDispatch();
	const param = useParams();

	useEffect(() => {
		if (tweetStatus === "idle") {
			dispatch(fetchTweetDetail(param.id));
		}
	}, [tweetStatus, dispatch, param.id]);

	return (
		<MainFeedContainer>
			<TweetDetail tweet={tweet} moreOptions={moreOptions} {...props} />
		</MainFeedContainer>
	);
}


TweetDetailContainer.propTypes = {
	username: PropTypes.string,
	isFollowing: PropTypes.bool,
};

export default TweetDetailContainer;
