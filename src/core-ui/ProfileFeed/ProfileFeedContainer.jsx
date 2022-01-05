import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { Outlet } from "react-router";

import ProfileFeed from "core-ui/ProfileFeed/ProfileFeed.jsx";
import MainFeedContainer from "core-ui/MainFeed/MainFeedContainer";
import endpoints from "api/endpoints";
import useFetch from "hooks/useFetch";
import { setUser } from "redux/slice/userSlice";

function ProfileFeedContainer() {

	const user = useSelector(state => state.userProfile);
	const dispatch = useDispatch();
	const params = useParams();

	const [api, doFetch] = useFetch();

	const endpoint = useMemo(() => {
		return endpoints.getUserByUsername(params.username);
	}, [params.username]);

	useEffect(() => {
		doFetch(endpoint);
	}, [params.username]);

	useEffect(() => {
		if (api.data && (api.url === endpoint)) {
			dispatch(setUser(api.data));
		}
	}, [api.url, api.data]);

	return (
		<MainFeedContainer>
			{!user.data ? <div>Loading</div> :
				<ProfileFeed user={user.data} />
			}
		</MainFeedContainer>
	);
}

export default ProfileFeedContainer;
