import React from "react";
import PropTypes from "prop-types";

import styles from "./FollowInfo.module.css";

function FollowInfo({ following, followers }) {
	return (
		<div className={styles.follow}>
			<div className={styles.follow__wrapper}><span className={styles["follow--count"]}>{following||"1.2M"}</span>Following</div>
			<div className={styles.follow__wrapper}><span className={styles["follow--count"]}>{followers||"0"}</span>Followers</div>
		</div>
	);
}

FollowInfo.propTypes = {
	following: PropTypes.number.isRequired,
	followers: PropTypes.number.isRequired
};


export default FollowInfo;
