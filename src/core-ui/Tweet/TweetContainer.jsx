import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Tweet from "core-ui/Tweet/Tweet.jsx";
import { selectAuthUser } from "redux/slice/authSlice";
import { selectTweetManageStatus, createTweet } from "redux/slice/userTweetSlice";
import { addMessage } from "redux/slice/messageSlice";

function TweetContainer(props) {
	const [tweet, setTweet] = useState({
		text: "",
	});

	const authUser = useSelector(state => selectAuthUser(state));
	const manageTweetStatus = useSelector(state => selectTweetManageStatus(state));

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleInputData = e => {
		return setTweet({
			...tweet,
			[e.target.name]: e.target.value,
		});
	};

	const handleFormSubmit = () => {
		const formData = {
			text: tweet.text,
		};
		const promise = dispatch(createTweet(formData)).unwrap();
		promise.then(() => {
			dispatch(addMessage({
				type: "info",
				message: "Tweet was created",
			}));
			navigate(-1);
		}).catch(err => {
			dispatch(addMessage({
				type: "error",
				message: err,
			}));
		});
		setTweet({ ...tweet, text: "" });
	};

	return (
		<Tweet
			user={authUser}
			tweet={tweet}
			status={manageTweetStatus}
			handleInputData={handleInputData}
			handleFormSubmit={handleFormSubmit}
			{...props}
		/>
	);
}

export default TweetContainer;
