import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import MainFeedContainer from "core-ui/MainFeed/MainFeedContainer";
import { selectUser, fetchUser } from "redux/slice/userSlice";

function ProfileFeedContainer() {

	const user = useSelector(state => selectUser(state));
	const dispatch = useDispatch();
	const params = useParams();

	console.log("ProfileFeedContainer", user);

	React.useEffect(() => {
		if (!user || params.username !== user.username) {
			dispatch(fetchUser(params.username));
		}
	}, [params.username]);

	return (
		<MainFeedContainer>
			<Outlet />
		</MainFeedContainer>
	);
}

export default ProfileFeedContainer;
