import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Username from "components/Username/Username";
import DisplayName from "components/DisplayName/DisplayName";

import styles from "./Name.module.css";

function Name({ user, className }) {

	const { name, username, verified } = user;

	const handleClick = (e) => {
		e.stopPropagation();
	};

	return (
		<div className={styles.name}>
			<Link to={`/${username}`} onClick={handleClick} className={`${styles.name__wrapper} ${className}`}>
				<DisplayName name={name} verified={verified} className={styles.name__displayname} />
				<Username name={username} />
			</Link>
			{/* {showCard &&
				<div className={styles.profile} ref={cardRef}>
					<ProfileCardContainer mouseLeave={handleMouseLeave} user={user} />
				</div>
			} */}
		</div>
	);
}

Name.propTypes = {
	user: PropTypes.object.isRequired,
	className: PropTypes.string
};

export default Name;
