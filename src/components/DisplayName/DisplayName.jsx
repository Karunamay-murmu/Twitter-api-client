import React from "react";
import PropTypes from "prop-types";

import Verified from "components/Verified/Verified.jsx";

import styles from "./displayName.module.css";

function DisplayName({ name, verified=false, className }) {
	return (
		<div className={`${styles.name} ${className}`}>
			{name||"Larunamay"}
			{verified &&
				<span>
					<Verified />
				</span>
			}
		</div>
	);
}

DisplayName.propTypes = {
	name: PropTypes.string.isRequired,
	verified: PropTypes.bool.isRequired,
	className: PropTypes.string
};

export default DisplayName;
