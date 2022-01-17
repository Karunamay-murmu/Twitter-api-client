import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTweets, selectTweets, tweetStatus } from "redux/slice/userTweetSlice";
import { selectPinnedTweet } from "redux/slice/userSlice";
import { selectUser } from "redux/slice/userSlice";
import Spinner from "components/Spinner/Spinner";
import ProfileTweets from "core-ui/ProfileTweets/ProfileTweets";

function ProfileTweetsContainer() {
	const user = useSelector(state => selectUser(state));
	const tweets = useSelector(state => selectTweets(state));
	const userPinnedTweet = useSelector(state => selectPinnedTweet(state));
	const status = useSelector(state => tweetStatus(state));

	const dispatch = useDispatch();

	useEffect(() => {
		if (!tweets.length && user?.id) {
			dispatch(fetchTweets(user.id));
		}
	}, [user.id]);

	const allTweets = useMemo(() => userPinnedTweet ? [userPinnedTweet, ...tweets] : tweets, [tweets, userPinnedTweet]);

	return (
		<>
			{
				status === "loading" ? <div>
					<Spinner message="Loading tweets..." />
				</div> :
					<div>
						<ProfileTweets
							tweets={allTweets}
						/>
						
					</div>
			}
		</>
	);
}

export default ProfileTweetsContainer;
