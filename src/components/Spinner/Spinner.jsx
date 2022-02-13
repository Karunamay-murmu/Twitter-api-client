import React from "react";
import PropTypes from "prop-types";

import styles from "./Spinner.module.css";

function Spinner({ message, hideMessage }) {
	return (
		<div className={styles.spinner}>
			<div className={styles.spinner__outer}>
			</div>
			{
				!hideMessage && <div className={styles.spinner__message}>{message}</div>
			}
		</div>
	);
}

Spinner.propTypes = {
	message: PropTypes.string,
	hideMessage: PropTypes.bool,
};

Spinner.defaultProps = {
	message: "Loading your tweets...",
	hideMessage: false
};

export default Spinner;
