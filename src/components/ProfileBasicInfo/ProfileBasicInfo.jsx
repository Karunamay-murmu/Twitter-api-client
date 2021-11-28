import React from "react";
import PropTypes from "prop-types";

import DisplayName from "components/DisplayName/DisplayName";
import Username from "components/Username/Username";
import Avatar from "components/Avatar/Avatar";

import styles from "./ProfileBasicInfo.module.css";

function ProfileBasicInfo({ displayName, username, image, className = "" }) {
	return (
		<div className={`${className} ${styles.profile__info}`}>
			<Avatar className={styles.profile__avatar} image={image} />
			<div className={styles.profile__userinfo}>
				<DisplayName name={displayName} />
				<Username name={username} />
			</div>
		</div>
	);
}

ProfileBasicInfo.propTypes = {
	displayName: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	className: PropTypes.string,
	image: PropTypes.string
};

export default ProfileBasicInfo;
