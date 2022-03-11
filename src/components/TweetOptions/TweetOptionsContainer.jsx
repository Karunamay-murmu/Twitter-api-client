import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import BlockIcon from "@mui/icons-material/Block";
import CodeIcon from "@mui/icons-material/Code";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";

import TweetOptions from "components/TweetOptions/TweetOptions";
import useFriendship from "hooks/useFriendship";
import { destroyTweet, selectTweetsUser } from "redux/slice/userTweetSlice";
import { addMessage } from "redux/slice/messageSlice";
import { selectAuthUser } from "redux/slice/authSlice";
import { showFriendship } from "redux/slice/relationshipSlice";
import { selectHomeTimelineUsers } from "redux/slice/homeTimelineSlice";
import { selectTweetDetailsUsers } from "redux/slice/tweetDetailSlice";

function TweetOptionsCntainer({ tweet }) {
	const authUser = useSelector(state => selectAuthUser(state));
	const tweetUsers = useSelector(state => selectTweetsUser(state));
	const timelineUsers = useSelector(state => selectHomeTimelineUsers(state));
	const tweetDetailsUsers = useSelector(state => selectTweetDetailsUsers(state));

	const user = useMemo(() => {
		const userId = tweet.user?.id_str ?? tweet.user?.id;
		return tweetDetailsUsers[userId] ?? tweetUsers[userId] ?? timelineUsers[userId];
	}, [tweet, tweetUsers, timelineUsers, tweetDetailsUsers]);

	console.log("TweetOptionsCntainer", tweet, user);

	const { isFollowing, isMuting, isBlocking, handleMute, handleBlock, handleFollow } = useFriendship(user);

	const dispatch = useDispatch();

	const username = tweet?.user?.username ?? tweet?.user?.screen_name;

	const handleTweetDelete = useCallback((e) => {
		e.stopPropagation();
		const id = tweet?.id_str ?? tweet.id;
		const promise = dispatch(destroyTweet({ id })).unwrap();
		promise.then(() => {
			dispatch(addMessage({
				type: "info",
				message: "Tweet was deleted",
			}));
		}).catch(err => {
			dispatch(addMessage({
				type: "error",
				message: err,
			}));
		});
	}, [tweet]);

	const options = [
		{
			"text": `${isFollowing ? "Unfollow" : "Follow"} @${username}`,
			"Icon": PersonAddAltOutlinedIcon,
			"eventHandlers": {
				"onClick": handleFollow
			}
		}, {
			"text": `Add/remove @${username} from Lists`,
			"Icon": ListAltOutlinedIcon,
		}, {
			"text": `${isMuting ? "Unmute" : "Mute"} @${username}`,
			"Icon": VolumeOffOutlinedIcon,
			"eventHandlers": {
				"onClick": handleMute,
			},
		}, {
			"text": `${isBlocking ? "Unblock" : "Block"} @${username}`,
			"Icon": BlockIcon,
			"eventHandlers": {
				"onClick": handleBlock,
			},
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

	const authUserTweetOption = [
		{
			"text": "Delete",
			"Icon": DeleteOutlineRoundedIcon,
			"eventHandlers": {
				onClick: handleTweetDelete
			}
		},
		{
			"text": "Pin to your profile",
			"Icon": PushPinRoundedIcon
		},
		{
			"text": `Add/remove @${authUser.username} from Lists`,
			"Icon": ListAltOutlinedIcon
		},
		{
			"text": "Change who can reply",
			"Icon": ChatBubbleOutlineRoundedIcon
		},
		{
			"text": "Embed Tweet",
			"Icon": CodeRoundedIcon
		},
		{
			"text": "View Tweet activity",
			"Icon": BarChartRoundedIcon
		}
	];
	return (
		<TweetOptions
			options={authUser.username !== username ? options : authUserTweetOption}
			user={tweet.user}
			actionType={showFriendship}
		/>
	);
}

TweetOptionsCntainer.propTypes = {
	tweet: PropTypes.object.isRequired,
};

export default TweetOptionsCntainer;