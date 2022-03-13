import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
	const location = useLocation();

	const replyingTweet = location.state?.tweet;

	useEffect(() => {
		if (replyingTweet) {
			setTweet({
				"reply": {
					"in_reply_to_tweet_id": replyingTweet?.id ?? replyingTweet?.id_str,
				}
			});
		}
	}, []);

	const handleInputData = e => {
		return setTweet({
			...tweet,
			[e.target.name]: e.target.value,
		});
	};

	const handleFormSubmit = () => {
		const promise = dispatch(createTweet(tweet)).unwrap();
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
			replyingTweet={replyingTweet}
			tweet={tweet}
			status={manageTweetStatus}
			handleInputData={handleInputData}
			handleFormSubmit={handleFormSubmit}
			{...props}
		/>
	);
}

export default TweetContainer;
