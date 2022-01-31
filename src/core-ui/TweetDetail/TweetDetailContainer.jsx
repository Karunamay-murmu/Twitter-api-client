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
import { fetchTweetDetail, selectTweet, selectUser, selectMedia, selectStatus, selectMetaData } from "redux/slice/tweetDetailSlice";
import Spinner from "components/Spinner/Spinner";

function TweetDetailContainer({ isFollowing, username = "Karunamay" }) {

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

	const tweets = useSelector(state => selectTweet(state));
	const tweetStatus = useSelector(state => selectStatus(state));
	const tweetMetaData = useSelector(state => selectMetaData(state));
	const user = useSelector(state => selectUser(state));
	const media = useSelector(state => selectMedia(state));
	const dispatch = useDispatch();
	const params = useParams();

	console.log("render");

	useEffect(() => {
		// let promise;
		// if (tweetStatus === "idle") {
		// TODO: check if the tweet is already in the store
		if (params.id !== tweetMetaData?.arg) {
			dispatch(fetchTweetDetail(params.id));
		}
		// // promise = dispatch(fetchTweetDetail(params.id));
		// // }
		// return () => {
		// 	dispatch(clearTweetDetailState());
		// };

	}, [params.id]);

	return (
		<MainFeedContainer>
			{
				tweetStatus === "loading" ? <Spinner message="Loading tweet..." /> :
					tweets?.map(tweet => <TweetDetail key={tweet.id} tweet={tweet} moreOptions={moreOptions} user={user[0]} media={media} />)
			}
		</MainFeedContainer>
	);
}


TweetDetailContainer.propTypes = {
	username: PropTypes.string,
	isFollowing: PropTypes.bool,
};

export default TweetDetailContainer;
