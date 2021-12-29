import React from "react";
import PropTypes from "prop-types";

import styles from "./Bio.module.css";

function Bio({ dangerouslySetInnerHTML, className }) {
	return (
		<div className={`${styles.bio} ${className ?? ""}`} dangerouslySetInnerHTML={dangerouslySetInnerHTML}>
		</div>
	);
}

Bio.propTypes = {
	bio: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node,
	dangerouslySetInnerHTML: PropTypes.object,
};

export default Bio;
