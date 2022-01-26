import React from "react";

import ProfileCard from "components/ProfileCard/ProfileCard.jsx";

const ProfileCardContainer = React.forwardRef((props, ref) => {
	return (
		<ProfileCard {...props} ref={ref}/>
	);
});

ProfileCardContainer.displayName = "ProfileCardContainer";

export default ProfileCardContainer;
