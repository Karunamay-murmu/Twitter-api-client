import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// import Home from "pages/Home/Home.jsx";
import ProfileFeedContainer from "core-ui/ProfileFeed/ProfileFeedContainer.jsx";
import TweetDetailContainer from "core-ui/TweetDetail/TweetDetailContainer";
import HomeFeed from "core-ui/HomeFeed/HomeFeed.jsx";
// import ModalContainer from "components/Modal/ModalContainer";
// import TweetContainer from "core-ui/Tweet/TweetContainer";
import TweetModal from "core-ui/TweetModal/TweetModal";
import MainLayout from "core-ui/MainLayout/MainLayout.jsx";
import SettingLayout from "core-ui/SettingLayout/SettingLayout";
import AccountSettingContainer from "core-ui/AccountSetting/AccountSettingContainer";


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
					<Route path="settings" element={<SettingLayout />}>
						<Route index path="account" element={<AccountSettingContainer />} />
					</Route>
				</Route>
			</Routes>
			{
				background &&
				<Routes>
					<Route path="compose/tweet" element={<TweetModal />} />
				</Routes>
			}
		</div>
	);
}

export default App;
