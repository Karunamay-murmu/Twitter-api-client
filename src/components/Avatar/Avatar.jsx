import React from "react";
import PropTypes from "prop-types";

import DefaultAvatar from "assets/avatar.jpg";

import styles from "./Avatar.module.css";

function Avatar({ image }) {
	return (
		<div className={styles.avatar__wrapper}>
			<img className={styles.avatar__img} src={image ?? DefaultAvatar} alt="" />
		</div>
	);
}

Avatar.propTypes = {
	image: PropTypes.string,
};

export default Avatar;
