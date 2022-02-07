import React from "react";
import PropTypes from "prop-types";

import Avatar from "components/Avatar/Avatar.jsx";
import FollowButtonContainer from "components/FollowButton/FollowButtonContainer.jsx";
import Name from "components/Name/Name";
import BioContainer from "components/Bio/BioContainer.jsx";

import styles from "./profileButton.module.css";

function ProfileButton({ user }) {
	return (
		<div className={styles.profile__wrapper}>
			<div className={styles.profile__info}>
				<Avatar image={user?.profile_image_url} />
				<div>
					<Name user={user} className={styles.profile__name__wrapper} />
					<BioContainer entities={user?.entities?.description} bio={user?.description} />
				</div>
			</div>
			<div className={styles.profile__btn}>
				<FollowButtonContainer />
			</div>
		</div>
	);
}

ProfileButton.propTypes = {
	user: PropTypes.object,
};

export default ProfileButton;