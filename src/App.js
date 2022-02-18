import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import ProfileFeedContainer from "core-ui/ProfileFeed/ProfileFeedContainer.jsx";
import TweetDetailContainer from "core-ui/TweetDetail/TweetDetailContainer";
import HomeFeed from "core-ui/HomeFeed/HomeFeed.jsx";
import TweetModal from "core-ui/TweetModal/TweetModal";
import EditProfileModal from "core-ui/EditProfileModal/EditProfileModal";
import SettingLayoutContainer from "core-ui/SettingLayout/SettingLayoutContainer";
import AccountSettingContainer from "core-ui/AccountSetting/AccountSettingContainer";
import PrivacySettingContainer from "core-ui/PrivacySetting/PrivacySettingContainer";
import ProfileTweetsContainer from "core-ui/ProfileTweets/ProfileTweetsContainer";
import ProfileContainer from "core-ui/Profile/ProfileContainer";
import FollowerListContainer from "core-ui/FollowerList/FollowerListContainer";
import MainLayoutContainer from "core-ui/MainLayout/MainLayoutContainer";
import LoginContainer from "core-ui/Login/LoginContainer";
import Spinner from "components/Spinner/Spinner";
import useFetch from "hooks/useFetch";
import endpoints from "api/endpoints";
import { selectCsrfToken, fetchCsrfToken } from "redux/slice/tokenSlice";
import { fetchAuthUser, selectAuthUser } from "redux/slice/authSlice";


function App() {
	const csrfToken = useSelector(state => selectCsrfToken(state));
	const authUser = useSelector(state => selectAuthUser(state));
	const { isOpen } = useSelector(state => state.modal);
	const location = useLocation();
	const { user, isAuthenticated, isLoading } = useAuth0();
	const dispatch = useDispatch();

	const [makeRequest] = useFetch();

	console.log(authUser);
	console.log(user);
	console.log(makeRequest);
	console.log(endpoints);


	const background = location.state && location.state.background;
	const style = {
		overflow: isOpen ? "hidden" : "inherit"
	};

	useEffect(() => {
		if (!csrfToken) {
			dispatch(fetchCsrfToken());
		}
	}, [csrfToken]);

	useEffect(() => {
		(async () => {
			if (isAuthenticated && csrfToken) {
				dispatch(fetchAuthUser(user.sub));
			}
		})();
	}, [isAuthenticated]);

	if (isLoading) {
		return <Spinner message="Loading..." />;
	}

	return (
		<div className="app" style={style}>
			<Routes location={background || location} >
				<Route path="login" element={<LoginContainer />} />
				<Route path="/" element={<MainLayoutContainer authUser={authUser} />}>
					<Route index element={<HomeFeed />} />
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
						<Route path="status/:id" element={<TweetDetailContainer />} />
					</Route>
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
					<Route path="settings/edit_profile" element={<EditProfileModal />} />
				</Routes>
			}
		</div>
	);
}

export default App;
