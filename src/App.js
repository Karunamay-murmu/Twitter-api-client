import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// import Home from "pages/Home/Home.jsx";
import ProfileFeedContainer from "core-ui/ProfileFeed/ProfileFeedContainer.jsx";
import TweetDetailContainer from "core-ui/TweetDetail/TweetDetailContainer";
import HomeFeed from "core-ui/HomeFeed/HomeFeed.jsx";
// import ModalContainer from "components/Modal/ModalContainer";
// import TweetContainer from "core-ui/Tweet/TweetContainer";
import TweetModal from "core-ui/TweetModal/TweetModal";
import EditProfileModal from "core-ui/EditProfileModal/EditProfileModal";
import MainLayout from "core-ui/MainLayout/MainLayout.jsx";
import SettingLayoutContainer from "core-ui/SettingLayout/SettingLayoutContainer";
import AccountSettingContainer from "core-ui/AccountSetting/AccountSettingContainer";
import PrivacySettingContainer from "core-ui/PrivacySetting/PrivacySettingContainer";


// import { EDIT_PROFILE } from "routes/routes";

function App() {
	const location = useLocation();
	const background = location.state && location.state.background;
	console.log(background);
	return (
		<div className="app">
			<Routes location={background || location} >
				<Route path="/" element={<MainLayout />}>
					<Route index element={<HomeFeed />} />
					<Route path=":username" element={<ProfileFeedContainer />} />
					<Route path=":username/status/:tweetId" element={<TweetDetailContainer />} />
					<Route path="settings" element={<SettingLayoutContainer />}>
						<Route path="account" element={<AccountSettingContainer />} />
						<Route path="privacy_and_safety" element={<PrivacySettingContainer />} />
					</Route>
				</Route>
			</Routes>
			{
				background &&
				<Routes>
					<Route path="compose/tweet" element={<TweetModal />} />
					<Route path="settings/edit_profile" element={<EditProfileModal />}/>
				</Routes>
			}
		</div>
	);
}

export default App;
