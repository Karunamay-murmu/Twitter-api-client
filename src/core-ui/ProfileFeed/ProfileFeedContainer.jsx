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
	const dispatch = useDispatch();
	const params = useParams();
	const userStatus = useSelector(state => state.userProfile.status);

	useEffect(() => {
		if (userStatus === "idle") {
			dispatch(fetchUser(params.username));
		}
	}, [userStatus, dispatch, params.username]);

	return (
		<MainFeedContainer>
			{userStatus === "loading" && <Spinner message="Loading profile..." />}
			{userStatus === "failed" && <div>Couldn&#39;t Load Profile</div>}
			{userStatus === "succeeded" && <ProfileFeed user={user} />}
		</MainFeedContainer>
	);
}

export default ProfileFeedContainer;
