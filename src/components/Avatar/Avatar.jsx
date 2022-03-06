import React from "react";
import PropTypes from "prop-types";

import DefaultAvatar from "assets/images/avatar.jpg";

import styles from "./Avatar.module.css";

function Avatar({ image, className, style }) {
	return (
		<div className={`${styles.avatar__wrapper} ${className}`} style={style}>
			<img className={styles.avatar__img} src={image ?? DefaultAvatar} alt="" />
		</div>
	);
}

Avatar.propTypes = {
	image: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.object
};

Avatar.defaultProps = {
	image: "",
	className: "",
	style: {}
};

export default Avatar;
