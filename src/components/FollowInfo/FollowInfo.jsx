import React from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";

import { short } from "utils/number";

import styles from "./FollowInfo.module.css";

function FollowInfo({ following, followers }) {

	const { username } = useParams();

	return (
		<div className={styles.follow}>
			<Link to={`/${username}/following`} className={styles.follow__wrapper}><span className={styles["follow--count"]}>{short(following)}</span>Following</Link>
			<Link to={`/${username}/followers`} className={styles.follow__wrapper}><span className={styles["follow--count"]}>{short(followers)}</span>Followers</Link>
		</div>
	);
}

FollowInfo.propTypes = {
	following: PropTypes.number,
	followers: PropTypes.number
};

FollowInfo.defaultProps = {
	following: 0,
	followers: 0
};


export default FollowInfo;
