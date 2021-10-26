import React from "react";
import PropTypes from "prop-types";

import Button from "components/Button/Button.jsx";

import styles from "./FollowButton.module.css";

function FollowButton({ isFollowing, user }) {
	return (
		<div className={styles.btn__wrapper}>
			<Button attributes={{
				"aris-label": `follow ${user}`,
				"title": `follow ${user}`
			}} className={styles.btn__btn} >
				{isFollowing ? "Following" : "Follow"}
			</Button>
		</div>
	);
}

FollowButton.propTypes = {
	isFollowing: PropTypes.bool.isRequired,
	user: PropTypes.object.isRequired
};

export default FollowButton;
