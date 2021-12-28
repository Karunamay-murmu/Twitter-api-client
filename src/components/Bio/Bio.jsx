import React from "react";
import PropTypes from "prop-types";

import styles from "./Bio.module.css";

function Bio({ dangerouslySetInnerHTML, className }) {
	console.log(dangerouslySetInnerHTML);
	return (

		<div className={`${styles.bio} ${className ?? ""}`} dangerouslySetInnerHTML={dangerouslySetInnerHTML}>
		</div>
	);
}

Bio.propTypes = {
	bio: PropTypes.string.isRequired,
	className: PropTypes.string,
	children: PropTypes.node,
	dangerouslySetInnerHTML: PropTypes.object,
};

export default Bio;
