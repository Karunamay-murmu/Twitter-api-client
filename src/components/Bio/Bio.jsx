import React from "react";
import PropTypes from "prop-types";

import styles from "./Bio.module.css";

function DisplayName({ bio, className }) {
	return (
		<div className={`${styles.bio} ${className??""}`}>
			{bio}
		</div>
	);
}

DisplayName.propTypes = {
	bio: PropTypes.string.isRequired,
	className: PropTypes.string
};

export default DisplayName;
