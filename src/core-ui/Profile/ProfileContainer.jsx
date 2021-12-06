import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";

import Profile from "core-ui/Profile/Profile.jsx";
import { openModal } from "redux/slice/modalSlice";

function ProfileContainer(props) {
	const { isOpen } = useSelector(state => state.modal);
	const dispatch = useDispatch();

	const onEditProfile = () => {
		if (!isOpen) {
			dispatch(openModal({ id: uuid() }));
		}
	};

	return (
		<>
			<Profile {...props} editProfile={onEditProfile} isModalOpen={isOpen} />
		</>
	);
}

export default ProfileContainer;
