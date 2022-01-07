import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProfileFeed from "core-ui/ProfileFeed/ProfileFeed.jsx";
import MainFeedContainer from "core-ui/MainFeed/MainFeedContainer";
import endpoints from "api/endpoints";
import useFetch from "hooks/useFetch";
import { setUser } from "redux/slice/userSlice";
import Spinner from "components/Spinner/Spinner";

function ProfileFeedContainer() {

	const user = useSelector(state => state.userProfile);
	const tweets = useSelector(state => state.userTweets);
	const api = useSelector(state => state.api, (prev, next) => prev.data === next.data);

	const dispatch = useDispatch();
	const params = useParams();

	const [doFetch] = useFetch();

	const profileEndpoint = useMemo(() => {
		return endpoints.showUser();
		// return endpoints.getUserByUsername(params.username);
	}, [params.username]);

	useEffect(() => {
		doFetch(profileEndpoint, {
			params: {
				screen_name: params.username
			}
		});
	}, [params.username]);

	useEffect(() => {
		if (api.data && (api.url === profileEndpoint)) {
			dispatch(setUser(api.data));
		}
	}, [api.url, api.data]);


	return (
		<MainFeedContainer>
			{!user.data ? <div>
				<Spinner message="Loading profile..." />
			</div> :
				<ProfileFeed user={user.data} tweets={tweets} />
			}
		</MainFeedContainer>
	);
}

export default ProfileFeedContainer;
