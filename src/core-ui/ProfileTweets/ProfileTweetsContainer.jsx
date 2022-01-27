import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { fetchTweets, selectLikes, selectTweets, tweetStatus } from "redux/slice/userTweetSlice";
import { selectPinnedTweet } from "redux/slice/userSlice";
import { selectUser } from "redux/slice/userSlice";
import Spinner from "components/Spinner/Spinner";
import ProfileTweets from "core-ui/ProfileTweets/ProfileTweets";
// import FeedHeader from "components/FeedHeader/FeedHeader";
// import DisplayName from "components/DisplayName/DisplayName";
// import ProfileContainer from "core-ui/Profile/ProfileContainer";
// import TweetMenuBarContainer from "components/TweetMenuBar/TweetMenuBarContainer";

// import styles from "./ProfileTweets.module.scss";

function ProfileTweetsContainer() {
	const user = useSelector(state => selectUser(state));
	const tweets = useSelector(state => selectTweets(state));
	const likes = useSelector(state => selectLikes(state));
	const userPinnedTweet = useSelector(state => selectPinnedTweet(state));
	const status = useSelector(state => tweetStatus(state));

	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		let promise;
		if ((!likes.length || !tweets.length) && user?.id) {
			promise = dispatch(fetchTweets({ userId: user.id, pathname: location.pathname }));
		}
		return () => {
			status === "loading" && promise.abort();
		};
	}, [user.id, location.pathname]);

	const tweetsData = useMemo(() => {
		if (location.pathname.includes("likes")) {
			return likes;
		}
		return userPinnedTweet ? [userPinnedTweet, ...tweets] : tweets;

	}, [tweets, userPinnedTweet, location.pathname, likes]);

	return (
		<>
			
			{
				status === "loading" ? <div>
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
