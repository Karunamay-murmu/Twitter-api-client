// import React from "react";
// import { useOutletContext } from "react-router-dom";
import React, { useEffect, useMemo } from "react";
// import PropTypes from "prop-types";
import { useDispatch, useSelector, } from "react-redux";

import ProfileTweets from "core-ui/ProfileTweets/ProfileTweets";
import useFetch from "hooks/useFetch";
import endpoints from "api/endpoints";
import { setTweet } from "redux/slice/userTweetSlice";
import Spinner from "components/Spinner/Spinner";

function ProfileTweetsContainer() {
	const tweets = useSelector(state => state.userTweets, (prev, next) => prev === next);
	const media = useSelector(state => state.userTweets.media, (prev, next) => prev === next);
	const user = useSelector(state => state.userProfile, (prev, next) => prev.data === next.data);
	const api = useSelector(state => state.api);

	const dispatch = useDispatch();

	const [doFetch] = useFetch();

	const { id } = user.data.data;
	const endpoint = useMemo(() => endpoints.showUserTimeline(), []);

	useEffect(() => {
		if (user.data && !tweets.data) {
			doFetch(endpoint, {
				params: {
					user_id: user.data.data.id
				}
			});
		}
	}, [user.data]);

	useEffect(() => {
		if (!tweets.data && api.data && (api.url === endpoint)) {
			dispatch(setTweet({
				tweets: api.data,
				userId: id,
			}));
		}
	}, [api.url, api.data]);

	return (
		<>
			{
				!tweets.data ? <div>
					<Spinner message="Loading tweets..." />
				</div> :
					<ProfileTweets
						tweets={tweets.tweets}
						user={user.data.data}
						media={media}
					/>
			}
		</>
	);
}

export default ProfileTweetsContainer;
