import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


import TweetReplies from "core-ui/TweetReplies/TweetReplies";
import { fetchTweetReplies, selectReplies, selectStatus, selectMetaData } from "redux/slice/tweetRepliesSlice";
import { selectTweet } from "redux/slice/tweetDetailSlice";
import Spinner from "components/Spinner/Spinner";

function TweetRepliesContainer() {
	const tweet = useSelector(state => selectTweet(state))[0];
	// const user = useSelector(state => selectUser(state))[0];
	const replies = useSelector(state => selectReplies(state));
	const replyStatus = useSelector(state => selectStatus(state));
	const replyMetaData = useSelector(state => selectMetaData(state));

	const dispatch = useDispatch();
	const params = useParams();

	useEffect(() => {
		if (tweet && tweet.id !== replyMetaData?.arg?.id) {
			dispatch(fetchTweetReplies({ id: params.id, username: params.username }));
		}
	}, [params.id, tweet]);


	console.log(replies);

	return (
		replyStatus === "loading" ? <Spinner message="Loading Replies..." />
			: <TweetReplies replies={replies} />
	);
}

export default TweetRepliesContainer;
