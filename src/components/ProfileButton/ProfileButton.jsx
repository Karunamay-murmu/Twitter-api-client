import React from "react";
import PropTypes from "prop-types";

import Avatar from "components/Avatar/Avatar.jsx";
import FollowButtonContainer from "components/FollowButton/FollowButtonContainer.jsx";
import Verified from "components/Verified/Verified.jsx";
import ProfileCardContainer from "core-ui/ProfileCard/ProfileCardContainer.jsx";

import styles from "./profileButton.module.css";

function ProfileButton({ onShowProfileCard, showCard, verified = true, image, displayName, username, bio, follower, following }) {
	return (
		<React.Fragment>
			<div className={styles.profile__wrapper}>
				<div className={styles.profile__info} onClick={onShowProfileCard}>
					<Avatar className={styles.profile__avatar} image={image} />
					<div className={styles.profile__userinfo}>
						<div className={styles.profile__disname}>{displayName || "Karunamay"}
							{verified && <Verified />}
						</div>
						<div className={styles.profile__username}>@{username || "Karunamay"}</div>
					</div>
				</div>
				<div className={styles.profile__btn}>
					<FollowButtonContainer />
				</div>
			</div>
			{
				showCard && <ProfileCardContainer
					displayName={displayName}
					username={username}
					bio={bio}
					follower={follower}
					following={following}
				/>
			}
		</React.Fragment>
	);
}

ProfileButton.propTypes = {
	verified: PropTypes.bool,
	image: PropTypes.string,
	displayName: PropTypes.string,
	username: PropTypes.string,
	bio: PropTypes.string,
	following: PropTypes.string,
	follower: PropTypes.string,
	showCard: PropTypes.bool,
	onShowProfileCard: PropTypes.func
};

export default ProfileButton;