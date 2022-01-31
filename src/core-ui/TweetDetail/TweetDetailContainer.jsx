import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
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

function TweetDetailContainer({ isFollowing }) {

	const tweets = useSelector(state => selectTweet(state));
	const tweetStatus = useSelector(state => selectStatus(state));
	const tweetMetaData = useSelector(state => selectMetaData(state));
	const user = useSelector(state => selectUser(state));
	const media = useSelector(state => selectMedia(state));
	const dispatch = useDispatch();
	const params = useParams();
	const location = useLocation();

	const moreOptions = useMemo(() => [
		{
			"text": `${isFollowing ? "Unfollow" : "Follow"} @${user && user[0]?.username}`,
			"Icon": PersonAddAltOutlinedIcon,
		}, {
			"text": `Add/remove @${user && user[0]?.username} from Lists`,
			"Icon": ListAltOutlinedIcon,
		}, {
			"text": `Mute @${user && user[0]?.username}`,
			"Icon": VolumeOffOutlinedIcon,
		}, {
			"text": "Mute this conversation",
			"Icon": VolumeOffOutlinedIcon,
		}
		, {
			"text": `Block @${user && user[0]?.username}`,
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
	]);

	useEffect(() => {
		if (params.id !== tweetMetaData?.arg) {
			dispatch(fetchTweetDetail(params.id));
		}
	}, [params.id]);

	return (
		<MainFeedContainer>
			<>
				{
					tweetStatus === "loading" ? <Spinner message="Loading tweet..." /> :
						tweets?.map(tweet =>
							<TweetDetail
								key={tweet.id}
								tweet={tweet}
								moreOptions={moreOptions}
								user={user[0]}
								media={media}
								location={location}
							/>
						)
				}
			</>
		</MainFeedContainer>
	);
}


TweetDetailContainer.propTypes = {
	isFollowing: PropTypes.bool,
};

export default TweetDetailContainer;
