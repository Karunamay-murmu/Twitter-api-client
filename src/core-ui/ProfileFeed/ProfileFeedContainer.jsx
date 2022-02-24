import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import MainFeedContainer from "core-ui/MainFeed/MainFeedContainer";
import { selectUser, fetchUser, showFriendship } from "redux/slice/userSlice";
import { selectAuthUser } from "redux/slice/authSlice";

function ProfileFeedContainer() {

	const authUser = useSelector(state => selectAuthUser(state));
	const user = useSelector(state => selectUser(state));
	const dispatch = useDispatch();
	const params = useParams();

	React.useEffect(() => {
		let promise;
		if ((!user || params.username !== user.username) && authUser) {
			promise = dispatch(fetchUser(params.username)).unwrap();
			promise.then(({ data }) => {
				dispatch(showFriendship({
					sourceUser: authUser.twitter_id,
					targetUser: data.id,
				}));
			});
		}
		// TODO: Fix promise abort 
		// return () => promise.abort();
	}, [params.username, authUser]);

	return (
		<MainFeedContainer>
			<Outlet />
		</MainFeedContainer>
	);
}

export default ProfileFeedContainer;
