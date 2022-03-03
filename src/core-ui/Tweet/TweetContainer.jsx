import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Tweet from "core-ui/Tweet/Tweet.jsx";
import { selectAuthUser } from "redux/slice/authSlice";
import { selectTweetManageStatus, manageTweet } from "redux/slice/userTweetSlice";
import { addMessage } from "redux/slice/messageSlice";

function TweetContainer(props) {
	const [tweet, setTweet] = useState("");

	const authUser = useSelector(state => selectAuthUser(state));
	const manageTweetStatus = useSelector(state => selectTweetManageStatus(state));

	const dispatch = useDispatch();

	const handleInputData = e => setTweet(e.target.value);

	const handleFormSubmit = e => {
		e.preventDefault();		
		const formData = {
			text: tweet,
		};
		const promise = dispatch(manageTweet(formData)).unwrap();
		promise.then(() => {
			dispatch(addMessage({
				type: "info",
				message: "Tweet has been created",
			}));
		}).catch(err => {
			dispatch(addMessage({
				type: "error",
				message: err.message,
			}));
		});
		setTweet("");
	};

	return (
		<Tweet
			user={authUser}
			value={tweet}
			status={manageTweetStatus}
			handleInputData={handleInputData}
			handleFormSubmit={handleFormSubmit}
			{...props}
		/>
	);
}

export default TweetContainer;
