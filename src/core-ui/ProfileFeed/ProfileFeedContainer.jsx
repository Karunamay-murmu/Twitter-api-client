// import React from "react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProfileFeed from "core-ui/ProfileFeed/ProfileFeed.jsx";
import MainFeedContainer from "core-ui/MainFeed/MainFeedContainer";
// import endpoints from "api/endpoints";
// import useFetch from "hooks/useFetch";
// import { setUser } from "redux/slice/userSlice";
// import { setPinnedTweet } from "redux/slice/userTweetSlice";
import Spinner from "components/Spinner/Spinner";
// import { useFetchUserQuery } from "features/api/api-slice";
import { fetchUser, selectUser } from "redux/slice/userSlice";

function ProfileFeedContainer() {

	const user = useSelector(state => selectUser(state));
	// const tweets = useSelector(state => state.userTweets);
	// const api = useSelector(state => state.api, (prev, next) => prev.data === next.data);

	const dispatch = useDispatch();
	const params = useParams();

	const userStatus = useSelector(state => state.userProfile.status);

	useEffect(() => {
		if (userStatus === "idle") {
			dispatch(fetchUser(params.username));
		}
	}, [userStatus, dispatch, params.username]);

	// console.log(user);

	// const { data = [], isLoading } = useFetchUserQuery(params.username);

	// const user = useMemo(() => data, [data]);

	// console.log("user", user);

	// const [doFetch] = useFetch();

	// const profileEndpoint = useMemo(() => {
	// 	return endpoints.getUserByUsername(params.username);
	// }, [params.username]);

	// useEffect(() => {
	// 	doFetch(profileEndpoint);
	// }, [params.username]);

	// useEffect(() => {
	// 	if (api.data && (api.url === profileEndpoint)) {
	// 		dispatch(setUser(api.data));
	// 		api.data.pinned_tweet && dispatch(setPinnedTweet(api.data.pinned_tweet));
	// 	}
	// }, [api.url, api.data]);

	// if (userStatus === "loading") {
	// 	return <Spinner message="Loading profile..." />;
	// }

	return (
		<MainFeedContainer>
			{userStatus === "loading" && <Spinner message="Loading profile..." />}
			{userStatus === "failed" && <div>Couldn&#39;t Load Profile</div>}
			{userStatus === "succeeded" && <ProfileFeed user={user} />}
		</MainFeedContainer>
	);
}

export default ProfileFeedContainer;
