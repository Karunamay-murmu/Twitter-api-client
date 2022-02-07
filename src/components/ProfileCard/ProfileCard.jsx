import React from "react";
import PropTypes from "prop-types";

import Avatar from "components/Avatar/Avatar.jsx";
import FollowButtonContainer from "components/FollowButton/FollowButtonContainer.jsx";
import DisplayName from "components/DisplayName/DisplayName.jsx";
import Username from "components/Username/Username.jsx";
// import Name from "components/Name/Name.jsx";
import FollowInfo from "components/FollowInfo/FollowInfo.jsx";
import BioContainer from "components/Bio/BioContainer.jsx";

import styles from "./profilecard.module.css";

const ProfileCard = React.forwardRef(({ user, className, mouseLeave }, ref) => {
	const { name, username, verified, profile_image_url, description, public_metrics: { followers_count, following_count }, entities } = user;
	return (
		<div className={`${styles.profile__wrapper} ${className}`} ref={ref} onMouseLeave={mouseLeave}>
			<div className={styles.profile__avatar}>
				<Avatar image={profile_image_url} />
				<FollowButtonContainer />
			</div>
			<div className={styles.profile__info}>
				<DisplayName name={name} verified={verified} />
				<Username name={username} />
			</div>
			<BioContainer entities={entities?.description} bio={description} />
			<FollowInfo following={following_count} followers={followers_count} />
		</div>
		// 		<div className={styles.profile}>
		// </div>
	);
});

ProfileCard.displayName = "ProfileCard";

ProfileCard.propTypes = {
	user: PropTypes.object.isRequired,
	className: PropTypes.string,
	mouseOver: PropTypes.func,
	mouseLeave: PropTypes.func
};

ProfileCard.defaultProps = {
	className: ""
};

export default ProfileCard;
