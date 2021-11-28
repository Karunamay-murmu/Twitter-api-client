import React from "react";
import PropTypes from "prop-types";

import styles from "./username.module.css";

function Username({ name }) {
	return (
		<div className={styles.name}>@{name||"username"}</div>
	);
}

Username.propTypes = {
	name: PropTypes.string.isRequired
};

export default Username;
