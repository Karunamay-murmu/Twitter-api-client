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

	console.log(user);

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

	// const normalizeData = useMemo(() => {

	// 	if (!api.data) {
	// 		return;
	// 	}

	// 	const profile = api.data;
	// 	let { entities, description, url, created_at } = profile;

	// 	let expand_profile = {};

	// 	for (const value of Object.values(entities.url)) {
	// 		if (value.length) {
	// 			value.forEach(value => {
	// 				expand_profile = {
	// 					profile_display_url: value.display_url,
	// 					profile_url: value.url,
	// 					profile_expanded_url: value.expanded_url,
	// 				};
	// 			});
	// 		}
	// 	}

	// 	const date = new Date(created_at);
	// 	const year = date.getFullYear();
	// 	const month = date.toLocaleDateString("default", { month: "long" });

	// 	return {
	// 		...profile,
	// 		...expand_profile,
	// 		description,
	// 		entities,
	// 		url,
	// 		created_at: `${month} ${year}`,

	// 	};

	// }, [api.data]);

	return (
		<MainFeedContainer>
			{!user.data ? <div>Loading</div> :
				<ProfileFeed user={user} />
			}
		</MainFeedContainer>
	);
}

export default ProfileFeedContainer;
