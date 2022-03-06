// import React from "react";
import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
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

import FeedPost from "core-ui/FeedPostList/FeedPostList.jsx";
import { selectAuthUser } from "redux/slice/authSlice";

import styles from "./FeedPostList.module.css";

function FeedPostContainer({ tweets, ...props }) {
	const authUser = useSelector(state => selectAuthUser(state));
	const navigate = useNavigate();
	const location = useLocation();

	const navigateToTweetDetail = (e, tweet) => {
		e.preventDefault();
		navigate(`/${tweet.username}/status/${tweet.id}`);
	};
	
	const authUserMoreOption = [
		{
			"text": "Delete",
			"Icon": DeleteOutlineRoundedIcon,
			"eventHandlers": {
				"onClick": props.handleDestroyTweets
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

	const mapTweet = (tweets) => tweets?.map((tweet, idx) => {
		const username = tweet.user?.username && tweet.user?.screen_name;
		const moreOptions = [
			{
				"text": `follow ${username}`,
				"Icon": PersonAddAltOutlinedIcon,
			}, {
				"text": "Add/remove from Lists",
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
		return <div key={idx} className={!tweet?.isReply ? styles.post__container : ""}>
			<FeedPost
				tweet={tweet}
				media={tweet?.media ?? tweet?.extended_entities?.media}
				navigateToTweetDetail={navigateToTweetDetail}
				location={location}
				moreOptions={
					username !== authUser.username ?
						authUserMoreOption :
						moreOptions
				}
				{...props}
			/>
			{tweet?.replies && mapTweet(tweet.replies)}
		</div>;

	});

	return mapTweet(tweets);
}

FeedPostContainer.propTypes = {
	isFollowing: PropTypes.bool,
	user: PropTypes.object,
	tweet: PropTypes.object,
};

export default React.memo(FeedPostContainer);


