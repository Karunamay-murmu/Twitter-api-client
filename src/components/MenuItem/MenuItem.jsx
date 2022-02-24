import React from "react";
import PropTypes from "prop-types";

import styles from "./MenuItem.module.css";

function MenuItem({ active, Icon, text }) {
	return (
		<div className={`${active ? styles["menu--active"] + " " : ""}${styles.menu__wrapper}`}>
			<Icon className={styles.menu__icon} />
			<p className={styles.menu__text}>{text}</p>
		</div>
	);
}


MenuItem.propTypes = {
	Icon: PropTypes.elementType,
	text: PropTypes.string.isRequired,
	active: PropTypes.bool,
};

export default MenuItem;
