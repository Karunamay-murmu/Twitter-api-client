import React from "react";
import PropTypes from "prop-types";

import { short } from "utils/number";

import styles from "./FollowInfo.module.css";

function FollowInfo({ following = "1.1K", followers = "1.1K" }) {
	return (
		<div className={styles.follow}>
			<div className={styles.follow__wrapper}><span className={styles["follow--count"]}>{short(following)}</span>Following</div>
			<div className={styles.follow__wrapper}><span className={styles["follow--count"]}>{short(followers)}</span>Followers</div>
		</div>
	);
}

FollowInfo.propTypes = {
	following: PropTypes.string,
	followers: PropTypes.string
};


export default FollowInfo;
