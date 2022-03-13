import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TweetReplies from "core-ui/TweetReplies/TweetReplies";
import { fetchTweetReplies, selectReplies, selectStatus } from "redux/slice/tweetRepliesSlice";
import { selectTweet } from "redux/slice/tweetDetailSlice";
import Spinner from "components/Spinner/Spinner";

function TweetRepliesContainer() {
	let tweet = useSelector(state => selectTweet(state))[0];
	const replies = useSelector(state => selectReplies(state));
	const replyStatus = useSelector(state => selectStatus(state));

	const dispatch = useDispatch();

	useEffect(() => {
		while (tweet?.replies) {
			tweet = tweet.replies[0];
		}
		dispatch(fetchTweetReplies({ id: tweet.id, username: tweet.user.username }));
	}, [tweet]);

	return (
		replyStatus === "loading" ? <Spinner message="Loading Replies..." />
			: <TweetReplies replies={replies} />
	);
}

export default TweetRepliesContainer;
