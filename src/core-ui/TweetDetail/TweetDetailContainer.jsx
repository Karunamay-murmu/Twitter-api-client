import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import TweetDetail from "core-ui/TweetDetail/TweetDetail";
import MainFeedContainer from "core-ui/MainFeed/MainFeedContainer";
import Spinner from "components/Spinner/Spinner";
import { fetchTweetDetail, selectTweet, selectMedia, selectMetaData, selectStatus } from "redux/slice/tweetDetailSlice";

function TweetDetailContainer() {

	const tweets = useSelector(state => selectTweet(state));
	const tweetStatus = useSelector(state => selectStatus(state));
	const tweetMetaData = useSelector(state => selectMetaData(state));
	const media = useSelector(state => selectMedia(state));

	const dispatch = useDispatch();
	const params = useParams();


	useEffect(() => {
		if (params.id !== tweetMetaData?.arg) {
			dispatch(fetchTweetDetail(params.id));
		}
	}, [params.id]);

	return (
		<MainFeedContainer>
			<>
				{
					!tweets || tweetStatus === "loading" ? <Spinner message="Loading tweet..." /> :
						<TweetDetail
							tweets={tweets}
							media={media}
						/>
				}
			</>
		</MainFeedContainer>
	);
}


TweetDetailContainer.propTypes = {
	isFollowing: PropTypes.bool,
};

export default TweetDetailContainer;
