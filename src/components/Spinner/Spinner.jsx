import React from "react";
import PropTypes from "prop-types";

import styles from "./Spinner.module.css";

function Spinner({ message }) {
	return (
		<div className={styles.spinner}>
			<div className={styles.spinner__outer}>
			</div>
			<div className={styles.spinner__message}>{message}</div>
		</div>
	);
}

Spinner.propTypes = {
	message: PropTypes.string
};

Spinner.defaultProps = {
	message: "Loading your tweets...",
};

export default Spinner;
