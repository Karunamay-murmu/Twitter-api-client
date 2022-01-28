import React from "react";
// import React, { useState, useRef, useEffect } from "react";
// import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Username from "components/Username/Username";
import DisplayName from "components/DisplayName/DisplayName";
// import ProfileCardContainer from "components/ProfileCard/ProfileCardContainer";

import styles from "./Name.module.css";
// import { useCallback } from "react";
// import { display } from "@mui/system";

function Name({ user, className }) {
	// const [showCard, setShowCard] = useState(false);
	// // const [mouseOver, setMouseOver] = useState(false);

	// const cardRef = useRef(null);
	// const navigate = useNavigate();
	const { name, username, verified } = user;

	// const handleMouseEnter = () => {
	// 	setShowCard(true);
	// };

	// const handleMouseLeave = () => {
	// 	setShowCard(false);
	// };

	// useEffect(() => {
	// 	if (showCard) {
	// 		const element = cardRef.current.getBoundingClientRect();
	// 		if (element.top + element.height > window.innerHeight) {
	// 			cardRef.current.style.height = `${(element.height + 35) / 16}rem`;
	// 			cardRef.current.style.top = `-${(element.height + 16) / 16}rem`;
	// 			cardRef.current.style.alignItems = "flex-start";
	// 		} else {
	// 			cardRef.current.style.height = `${(element.height + 32) / 16}rem`;
	// 		}
	// 	}
	// }, [showCard]);


	const handleClick = (e) => {
		console.log(e.target);
		e.stopPropagation();
		// navigate(`/${username}`);
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
