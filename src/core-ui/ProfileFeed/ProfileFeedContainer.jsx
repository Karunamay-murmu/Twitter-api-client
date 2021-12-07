import React from "react";
// import { Outlet } from "react-router";

import ProfileFeed from "core-ui/ProfileFeed/ProfileFeed.jsx";
import MainFeedContainer from "core-ui/MainFeed/MainFeedContainer";

function ProfileFeedContainer() {
	return (
		<MainFeedContainer>
			{/* <Outlet /> */}
			<ProfileFeed />
		</MainFeedContainer>
	);
}

export default ProfileFeedContainer;
