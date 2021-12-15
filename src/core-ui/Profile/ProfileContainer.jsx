import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";

import Profile from "core-ui/Profile/Profile.jsx";
import { openModal } from "redux/slice/modalSlice";

function ProfileContainer(props) {
	const { isOpen } = useSelector(state => state.modal);
	const dispatch = useDispatch();
	const location = useLocation();

	console.log(location);

	const onEditProfile = () => {
		if (!isOpen) {
			dispatch(openModal({ id: uuid() }));
		}
	};

	return (
		<>
			<Profile {...props} routeLocation={location} editProfile={onEditProfile} isModalOpen={isOpen} />
		</>
	);
}

export default ProfileContainer;
