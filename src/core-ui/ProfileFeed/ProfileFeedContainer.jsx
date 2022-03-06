import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import MainFeedContainer from "core-ui/MainFeed/MainFeedContainer";
import { selectUser, fetchUser } from "redux/slice/userSlice";
import { selectAuthUser } from "redux/slice/authSlice";

function ProfileFeedContainer() {

	const authUser = useSelector(state => selectAuthUser(state));
	const user = useSelector(state => selectUser(state));
	const dispatch = useDispatch();
	const params = useParams();

	useEffect(() => {
		if ((!user || params.username !== user.username) && authUser) {
			dispatch(fetchUser(params.username));
		}
	}, [params.username, authUser]);

	return (
		<MainFeedContainer>
			<Outlet />
		</MainFeedContainer>
	);
}

export default ProfileFeedContainer;
