import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import styles from "./TweetMenuBar.module.css";

function TweetMenuBar({ menuItems = [] }) {
	return (
		<div className={styles.menu}>
			{menuItems.map((item, idx) => (
				<NavLink end to={item.href} key={idx} className={({ isActive }) => isActive ? `${styles["menu__item--active"]} ${styles.menu__item__wrapper}` : styles.menu__item__wrapper}>
					<div className={styles.menu__item}>
						<div className={styles.menu__item__content}>
							{item.name}
						</div>
					</div>
				</NavLink>
			))}
		</div>
	);
}

TweetMenuBar.propTypes = {
	menuItems: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		href: PropTypes.string.isRequired
	})).isRequired,
};

export default TweetMenuBar;
