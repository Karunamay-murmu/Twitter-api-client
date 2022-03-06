import React from "react";
import PropTypes from "prop-types";

import Avatar from "components/Avatar/Avatar.jsx";
// import FollowButtonContainer from "components/FollowButton/FollowButtonContainer.jsx";
import Name from "components/Name/Name";
import BioContainer from "components/Bio/BioContainer.jsx";

import styles from "./profileButton.module.css";
import FriendshipContainer from "components/Friendship/FriendshipContainer";

function ProfileButton({ user, showFollowButton, nameProps, bioProps, pathname }) {
	return (
		<div className={styles.profile__wrapper}>
			<Avatar image={user?.profile_image_url} />
			<div className={styles.profile__info}>
				{/* <div className={styles.profile__info__wrapper}> */}
				<Name user={user} className={styles.profile__name__wrapper} {...nameProps} />
				{/* </div> */}
				{
					user?.description &&
					<BioContainer entities={user?.entities?.description} bio={user?.description} {...bioProps} />
				}
			</div>
			{
				showFollowButton &&
				<div className={styles.profile__btn}>
					<FriendshipContainer userProfile={user} needFetchingRelationship={false} isFollowing={pathname === "following" ? true : false} />
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
	pathname: PropTypes.string
};

ProfileButton.defaultProps = {
	showFollowButton: true,
};

export default ProfileButton;