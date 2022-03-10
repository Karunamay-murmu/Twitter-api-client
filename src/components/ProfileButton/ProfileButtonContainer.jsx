import React, { useMemo } from "react";
import PropTypes from "prop-types";

import ProfileButton from "components/ProfileButton/ProfileButton.jsx";

function ProfileButtonContainer({ user, ...props }) {
	const isFollowing = useMemo(() => {
		return user?.connections?.includes("following");
	}, [user?.connections]);

	return <ProfileButton user={user} isFollowing={isFollowing} {...props} />;
}

ProfileButtonContainer.propTypes = {
	user: PropTypes.object
};

export default ProfileButtonContainer;

