import React from "react";
import PropTypes from "prop-types";

import Avatar from "components/Avatar/Avatar.jsx";
import FollowButtonContainer from "components/FollowButton/FollowButtonContainer.jsx";
import Verified from "components/Verified/Verified.jsx";

import styles from "./profile.module.css";

function ProfileButton({ verified=true, image, displayName, username }) {
	return (
		<div className={styles.profile__wrapper}>
			<Avatar className={styles.profile__avatar} image={image} />
			<div className={styles.profile__info}>
				<div className={styles.profile__userinfo}>
					<div className={styles.profile__disname}>{displayName || "Karunamay"}
						{verified && <Verified />}
					</div>
					<div className={styles.profile__username}>@{username || "Karunamay"}</div>
				</div>
				<div className={styles.profile__btn}>
					<FollowButtonContainer />
				</div>
			</div>
		</div>
	);
}

ProfileButton.propTypes = {
	verified: PropTypes.bool,
	image: PropTypes.string,
	displayName: PropTypes.string,
	username: PropTypes.string,
};

export default ProfileButton;
