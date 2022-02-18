import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Username from "components/Username/Username";
import DisplayName from "components/DisplayName/DisplayName";

import styles from "./Name.module.css";

function Name({ user, className, allowNavigate }) {

	const { name, username, verified } = user;

	const handleClick = (e) => e.stopPropagation();
	const Component = allowNavigate ? Link : "div";

	return (
		<div className={styles.name}>
			<Component to={`/${username}`} onClick={handleClick} className={`${styles.name__wrapper}${className ? " " + className : ""}`}>
				<DisplayName name={name} verified={verified} className={`${styles.name__displayname}`} />
				<Username name={username} />
			</Component>
			{/* {showCard &&
				<div className={styles.profile} ref={cardRef}>
					<ProfileCardContainer mouseLeave={handleMouseLeave} user={user} />
				</div>
			} */}
		</div>
	);
}

Name.defaultProps = {
	allowNavigate: true,
};

Name.propTypes = {
	user: PropTypes.object.isRequired,
	className: PropTypes.string,
	allowNavigate: PropTypes.bool,
	tag: PropTypes.any
};

export default Name;
