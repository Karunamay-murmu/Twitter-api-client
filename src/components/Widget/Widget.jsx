import React from "react";
import PropTypes from "prop-types";

import styles from "./widget.module.css";

function Widget({ header, children }) {
	return (
		<div className={styles.widget__wrapper}>
			<header className={styles.widget__header}>{header}</header>
			<div className={styles.widget__body}>
				{children}
			</div>
			<footer className={styles.widget__footer}>
				Show more
			</footer>
		</div>
	);
}

Widget.propTypes = {
	header: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default Widget;
