import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import { fetchTweets, selectLikes, selectTweets, tweetStatus, clearTweetState } from "redux/slice/userTweetSlice";
import { selectPinnedTweet } from "redux/slice/userSlice";
import { selectUser } from "redux/slice/userSlice";
import Spinner from "components/Spinner/Spinner";
import ProfileTweets from "core-ui/ProfileTweets/ProfileTweets";

function ProfileTweetsContainer() {
	const user = useSelector(state => selectUser(state));
	const tweets = useSelector(state => selectTweets(state));
	const likes = useSelector(state => selectLikes(state));
	const userPinnedTweet = useSelector(state => selectPinnedTweet(state));
	const status = useSelector(state => tweetStatus(state));
	const params = useParams();

	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		let promise;

		if (params.username.toLowerCase() !== user.username.toLowerCase()) {
			dispatch(clearTweetState());
		}
		if (((!likes.length && location.pathname.includes("likes")) || !tweets.length) && user?.username.toLowerCase() === params.username.toLowerCase()) {
			promise = dispatch(fetchTweets({ userId: user.id, pathname: location.pathname }));
		}
		return () => {
			status === "loading" && promise.abort();
		};
	}, [user, params.username, location.pathname]);

	const tweetsData = useMemo(() => {
		if (location.pathname.includes("likes")) {
			return likes;
		}
		return userPinnedTweet ? [userPinnedTweet, ...tweets] : tweets;
	}, [tweets, userPinnedTweet, location.pathname, likes]);

	return (
		<>
			
			{
				!tweetsData || status === "loading" ? <div>
					<Spinner message="Loading tweets..." />
				</div> :
					<ProfileTweets
						pathname={location.pathname}
						tweets={tweetsData}
						user={user}
					/>
			}
		</>
	);
}

export default ProfileTweetsContainer;
