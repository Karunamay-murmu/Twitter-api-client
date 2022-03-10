import React from "react";
import PropTypes from "prop-types";

import Avatar from "components/Avatar/Avatar.jsx";
// import FollowButtonContainer from "components/FollowButton/FollowButtonContainer.jsx";
import Name from "components/Name/Name";
import BioContainer from "components/Bio/BioContainer.jsx";

import styles from "./profileButton.module.css";
import FriendshipContainer from "components/Friendship/FriendshipContainer";

function ProfileButton({ user, showFollowButton, nameProps, bioProps, isFollowing }) {
	return (
		<div className={styles.profile__wrapper}>
			<Avatar image={user?.profile_image_url} />
			<div className={styles.profile__info}>
				<Name user={user} className={styles.profile__name__wrapper} {...nameProps} />
				{
					user?.description &&
					<BioContainer entities={user?.entities?.description} bio={user?.description} {...bioProps} />
				}
			</div>
			{
				showFollowButton &&
				<div className={styles.profile__btn}>
					<FriendshipContainer user={user} needFetchingRelationship={false} initialFollowing={isFollowing} />
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
	isFollowing: PropTypes.bool
};

ProfileButton.defaultProps = {
	showFollowButton: true,
};

export default ProfileButton;