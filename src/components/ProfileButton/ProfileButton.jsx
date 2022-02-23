import React from "react";
import PropTypes from "prop-types";

import Avatar from "components/Avatar/Avatar.jsx";
import FollowButtonContainer from "components/FollowButton/FollowButtonContainer.jsx";
import Name from "components/Name/Name";
import BioContainer from "components/Bio/BioContainer.jsx";

import styles from "./profileButton.module.css";

function ProfileButton({ user, showFollowButton, nameProps, bioProps }) {
	return (
		<div className={styles.profile__wrapper}>
			<div className={styles.profile__info}>
				<Avatar image={user?.profile_image_url} />
				<>
					<Name user={user} className={styles.profile__name__wrapper} {...nameProps} />
					{
						user?.description &&
						<BioContainer entities={user?.entities?.description} bio={user?.description} {...bioProps} />
					}
				</>
			</div>
			{/* TODO: implement friendship component */}
			{
				showFollowButton &&
				<div className={styles.profile__btn}>
					<FollowButtonContainer />
				</div>
			}
		</div>
	);
}

ProfileButton.propTypes = {
	user: PropTypes.object,
	showFollowButton: PropTypes.bool,
	nameProps: PropTypes.object,
	bioProps: PropTypes.object,
};

ProfileButton.defaultProps = {
	showFollowButton: true,
};

export default ProfileButton;