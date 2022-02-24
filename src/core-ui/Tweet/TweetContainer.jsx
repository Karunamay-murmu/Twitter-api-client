import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAuthUser } from "redux/slice/authSlice";

import Tweet from "core-ui/Tweet/Tweet.jsx";

function TweetContainer(props) {
	const [tweet, setTweet] = useState("");
	const authUser = useSelector(state => selectAuthUser(state));

	const handleInputData = e => {
		setTweet(e.target.value);
	};

	console.log("tweet", tweet);

	return (
		<Tweet {...props} user={authUser} value={tweet} handleInputData={handleInputData}/>
	);
}

export default TweetContainer;
