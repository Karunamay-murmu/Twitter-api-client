import React, { useState } from "react";

import ProfileEditForm from "core-ui/Form/ProfileEditForm/ProfileEditForm";

function ProfileEditFormContainer(props) {
	const [profile_image, setProfileImage] = useState(null);

	const getInputDetails = (element) => {
		setProfileImage(element.value);
	};
	return (
		<ProfileEditForm getInputDetails={getInputDetails} profile_image={profile_image} {...props} />
	);
}

export default ProfileEditFormContainer;
