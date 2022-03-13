import React from "react";
import { Outlet } from "react-router-dom";

import MainFeedContainer from "core-ui/MainFeed/MainFeedContainer";

function ProfileFeedContainer() {
	return (
		<MainFeedContainer>
			<Outlet />
		</MainFeedContainer>
	);
}

export default ProfileFeedContainer;
