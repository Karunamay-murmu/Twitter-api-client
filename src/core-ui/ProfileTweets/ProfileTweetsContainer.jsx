// import React from "react";
// import { useOutletContext } from "react-router-dom";
import React, { useEffect, useMemo } from "react";
// import PropTypes from "prop-types";
import { useDispatch, useSelector, } from "react-redux";

import ProfileTweets from "core-ui/ProfileTweets/ProfileTweets";
import useFetch from "hooks/useFetch";
import endpoints from "api/endpoints";
import { setTweet } from "redux/slice/userTweetSlice";

function ProfileTweetsContainer() {
	const tweets = useSelector(state => state.userTweets, (prev, next) => prev.data === next.data);
	const user = useSelector(state => state.userProfile, (prev, next) => prev.data === next.data);
	const api = useSelector(state => state.api);

	const dispatch = useDispatch();

	const [doFetch] = useFetch();

	const { id } = user.data.data;
	const endpoint = useMemo(() => endpoints.getTweetsByTweetId(id), []);

	useEffect(() => {
		if (user.data && !tweets.data) {
			doFetch(endpoint);
		}
	}, [user.data, tweets.id]);

	console.log(api);

	useEffect(() => {
		if (!tweets.data && api.data && (api.url === endpoint)) {
			console.log("rn");
			dispatch(setTweet({
				tweets: api.data,
				userId: id,
			}));
		}
	}, [api.url, api.data]);

	return (
		// {
		// 	tweets
		// }
		// <ProfileTweets tweets={tweets} user={user} />
		<ProfileTweets />
	);
}

// ProfileTweetsContainer.propTypes = {
// 	user: PropTypes.object.isRequired,
// 	tweets: PropTypes.object.isRequired,
// };

export default ProfileTweetsContainer;
