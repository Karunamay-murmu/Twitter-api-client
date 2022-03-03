import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import ProfileFeedContainer from "core-ui/ProfileFeed/ProfileFeedContainer.jsx";
import TweetDetailContainer from "core-ui/TweetDetail/TweetDetailContainer";
import TweetModal from "core-ui/TweetModal/TweetModal";
import EditProfileModal from "core-ui/EditProfileModal/EditProfileModal";
import SettingLayoutContainer from "core-ui/SettingLayout/SettingLayoutContainer";
import AccountSettingContainer from "core-ui/AccountSetting/AccountSettingContainer";
import PrivacySettingContainer from "core-ui/PrivacySetting/PrivacySettingContainer";
import ProfileTweetsContainer from "core-ui/ProfileTweets/ProfileTweetsContainer";
import ProfileContainer from "core-ui/Profile/ProfileContainer";
import FollowerListContainer from "core-ui/FollowerList/FollowerListContainer";
import MainLayoutContainer from "core-ui/MainLayout/MainLayoutContainer";
import LoginContainer from "components/Login/LoginContainer";
import Spinner from "components/Spinner/Spinner";
import { fetchAuthUser, selectAuthUser } from "redux/slice/authSlice";
import AccountInformationSetting from "core-ui/AccountInformationSetting/AccountInformationSetting";
import HomeFeedContainer from "core-ui/HomeFeed/HomeFeedContainer";

function App() {
	const authUser = useSelector(state => selectAuthUser(state));
	const { isOpen } = useSelector(state => state.modal);
	const location = useLocation();
	const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			if (isAuthenticated) {
				const token = await getAccessTokenSilently();
				if (token) {
					dispatch(fetchAuthUser(token));
				}
			}
		})();
	}, [isAuthenticated]);

	const background = location.state && location.state.background;
	const style = {
		overflow: isOpen ? "hidden" : "inherit"
	};

	if (isLoading) {
		return <Spinner message="Loading..." />;
	}

	return (
		<div className="app" style={style}>
			<Routes location={background || location} >
				<Route path="login" element={<LoginContainer isAuthenticated={isAuthenticated} />} />
				<Route path="/" element={<MainLayoutContainer authUser={authUser} isAuthenticated={isAuthenticated} />}>
					<Route index element={<HomeFeedContainer />} />
					<Route path=":username" element={<ProfileFeedContainer />}>
						{
							["followers", "following"].map((path, idx) =>
								<Route key={idx} path={path} element={<FollowerListContainer path={path} />} />
							)
						}
						<Route path="" element={<ProfileContainer />}>
							{
								["", "with_replies", "likes"].map((path, idx) => {
									return (
										<Route key={idx} path={path} element={<ProfileTweetsContainer />} />
									);
								})
							}
						</Route>
						<Route state={{ name: "tweet" }} path="status/:id" element={<TweetDetailContainer />} />
					</Route>
					<Route path="settings" element={<SettingLayoutContainer />}>
						<Route path="account" element={<AccountSettingContainer />} />
						<Route path="your_twitter_data/account" element={<AccountInformationSetting />} />
						<Route path="privacy_and_safety" element={<PrivacySettingContainer />} />
					</Route>
					<Route path="compose/tweet" element={<TweetModal />} />
				</Route>
			</Routes>
			{
				authUser && background &&
				<Routes>
					<Route path="compose/tweet" element={<TweetModal />} />
					<Route path="settings/edit_profile" element={<EditProfileModal />} />
				</Routes>
			}
		</div>
	);
}

export default App;
