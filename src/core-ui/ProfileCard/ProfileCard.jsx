import React from "react";
import PropTypes from "prop-types";

import Avatar from "components/Avatar/Avatar.jsx";
import FollowButtonContainer from "components/FollowButton/FollowButtonContainer.jsx";
import DisplayName from "components/DisplayName/DisplayName.jsx";
import Username from "components/Username/Username.jsx";
import FollowInfo from "components/FollowInfo/FollowInfo.jsx";
import Bio from "components/Bio/Bio.jsx";

import styles from "./profilecard.module.css";

function ProfileCard({ displayName="DisplayName", username="Username", bio="Risk management, be ready to enjoy the best case, be ready to handle the worst case", following=187, followers="2.3M" }) {
	return (
		<div className={styles.profile__wrapper}>
			<div className={styles.profile__avatar}>
				<Avatar />
				<FollowButtonContainer />
			</div>
			<div className={styles.profile__info}>
				<DisplayName name={displayName} />
				<Username name={username} />
			</div>
			<Bio bio={bio} />
			<FollowInfo following={following} followers={followers}/>
		</div>
	);
}

ProfileCard.propTypes = {
	displayName: PropTypes.string,
	username: PropTypes.string,
	following: PropTypes.number,
	followers: PropTypes.number,
	bio: PropTypes.string
};

export default ProfileCard;
