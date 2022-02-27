import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Tweet from "core-ui/Tweet/Tweet.jsx";
import { selectAuthUser } from "redux/slice/authSlice";
import { postTweet } from "redux/slice/userTweetSlice";

function TweetContainer(props) {
	const [tweet, setTweet] = useState("");
	const authUser = useSelector(state => selectAuthUser(state));

	const dispatch = useDispatch();

	const handleInputData = e => {
		setTweet(e.target.value);
	};

	const handleFormSubmit = e => {
		e.preventDefault();
		const formData = {
			text: tweet,
		};
		dispatch(postTweet(formData));
	};


	console.log("tweet", tweet);

	return (
		<Tweet {...props} user={authUser} value={tweet} handleInputData={handleInputData} handleFormSubmit={handleFormSubmit} />
	);
}

export default TweetContainer;
