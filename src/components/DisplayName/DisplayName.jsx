import React from "react";
import PropTypes from "prop-types";

import Verified from "components/Verified/Verified.jsx";

import styles from "./displayName.module.css";

function DisplayName({ name, verified, className }) {
	return (
		<div className={`${styles.name} ${className}`}>
			{name}
			{verified &&
				<span>
					<Verified />
				</span>
			}
		</div>
	);
}

DisplayName.propTypes = {
	name: PropTypes.string,
	verified: PropTypes.bool,
	className: PropTypes.string
};

DisplayName.defaultProps = {
	name: "DISPLAY NAME",
	verified: false,
	className: ""
};

export default DisplayName;
