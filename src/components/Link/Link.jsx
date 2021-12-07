import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import styles from "./Link.module.css";

function Link({ to, title, info, Icon }) {
	return (
		<NavLink to={to} className={({ isActive }) => `${styles.link} ${isActive ? styles["link--active"] : ""}`}>
			<div className={styles.link__wrapper}>
				{Icon &&
					<div className={styles.link__icon__wrapper}>
						<Icon className={styles.link__icon} />
					</div>
				}
				<div className={styles.link__title__wrapper}>
					<span className={styles.link__title} >{title}</span>
					{info && <span className={styles.link__info} >{info}</span>}
				</div>
				<ChevronRightRoundedIcon className={styles.link__arrow} />
			</div>
		</NavLink>
	);
}

Link.propTypes = {
	to: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	info: PropTypes.string,
	Icon: PropTypes.elementType,
};

export default Link;
