import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import HomeFeed from "core-ui/HomeFeed/HomeFeed.jsx";

import { fetchHomeTimeline, selectTweets, selectStatus } from "redux/slice/homeTimelineSlice";

function HomeFeedContainer(props) {
	const tweets = useSelector(state => selectTweets(state));
	const status = useSelector(state => selectStatus(state));
	const dispatch = useDispatch();

	useEffect(() => {
		if (!tweets.length) {
			dispatch(fetchHomeTimeline());
		}
	}, [tweets]);

	return <HomeFeed tweets={tweets} timelineStatus={status} {...props} />;
}

export default HomeFeedContainer;
