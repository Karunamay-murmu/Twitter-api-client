import React from "react";
import PropTypes from "prop-types";

import styles from "./username.module.css";

function Username({ name }) {
	return (
		<div className={styles.name}>@{name}</div>
	);
}

Username.propTypes = {
	name: PropTypes.string.isRequired
};

Username.defaultProps = {
	name: "USERNAME"
};

export default Username;
