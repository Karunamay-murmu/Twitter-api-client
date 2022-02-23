import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Profile from "core-ui/Profile/Profile.jsx";
import Spinner from "components/Spinner/Spinner";
import { getOriginalImage } from "utils/image";
import { selectUser } from "redux/slice/userSlice";
import { selectAuthUser } from "redux/slice/authSlice";

function ProfileContainer(props) {
	const location = useLocation();
	const user = useSelector(state => selectUser(state));
	const authUser = useSelector(state => selectAuthUser(state));
	const userStatus = useSelector(state => state.userProfile.status);

	const normalizeData = useMemo(() => {
		if (!user) {
			return;
		}
		const profile = user;
		let { entities, description, url, created_at } = profile;
		let expand_profile = {};
		if (entities) {
			if (entities?.url) {
				for (const value of Object.values(entities.url)) {
					if (value.length) {
						value.forEach(value => {
							expand_profile = {
								profile_display_url: value.display_url,
								profile_url: value.url,
								profile_expanded_url: value.expanded_url,
							};
						});
					}
				}
			}
		}

		const date = new Date(created_at);
		const year = date.getFullYear();
		const month = date.toLocaleDateString("default", { month: "long" });

		return {
			...profile,
			...expand_profile,
			description,
			entities,
			url,
			created_at: `${month} ${year}`,
		};
	}, [user]);

	const originalImageVariant = useMemo(() => {
		if (!user) {
			return;
		}
		return getOriginalImage(user.profile_image_url);
	}, [user]);

	return (
		<>
			{(userStatus === "loading" || userStatus === "idle") && <Spinner message="Loading profile..." />}
			{userStatus === "failed" && <div>Couldn&#39;t Load Profile</div>}
			{userStatus === "succeeded" &&
				<Profile authUser={authUser} profile={{ ...normalizeData, profile_image_url: originalImageVariant }} routeLocation={location} {...props} />
			}
		</>
	);
}


export default ProfileContainer;
