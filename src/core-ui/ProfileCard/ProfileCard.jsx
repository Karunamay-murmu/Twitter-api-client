import React from "react";
import PropTypes from "prop-types";

import Avatar from "components/Avatar/Avatar.jsx";
import FollowButtonContainer from "components/FollowButton/FollowButtonContainer.jsx";
import DisplayName from "components/DisplayName/DisplayName.jsx";
import Username from "components/Username/Username.jsx";

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
			<div className={styles.profile__bio}>{bio}</div>
			<div className={styles["profile__follower-info"]}>
				<div className={styles.profile__follower}><span className={styles["profile__follower--count"]}>{following}</span>Following</div>
				<div className={styles.profile__follower}><span className={styles["profile__follower--count"]}>{followers}</span>Followers</div>
			</div>
		</div>
	);
}

ProfileCard.propTypes = {
	displayName: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	following: PropTypes.number.isRequired,
	followers: PropTypes.number.isRequired,
	bio: PropTypes.string
};

export default ProfileCard;
