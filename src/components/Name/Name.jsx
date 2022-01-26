import React, { useState, useRef, useEffect } from "react";
// import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import Username from "components/Username/Username";
import DisplayName from "components/DisplayName/DisplayName";
import ProfileCardContainer from "components/ProfileCard/ProfileCardContainer";

import styles from "./Name.module.css";

function Name({ user, className }) {

	const [showCard, ] = useState(false);
	// const [mouseLeave, setMouseLeave] = useState(false);
	// const [cursorOnCard, setCursorOnCard] = useState(false);

	const cardRef = useRef(null);

	const { name, username, verified } = user;

	// const handleMouseEnter = () => {
	// 	// setTimeout(() => {
	// 	// 	// setShowCard(true);
	// 	// }, 500);
	// };

	useEffect(() => {
		document.addEventListener("mousedown", () => {
			console.log("mouse down");
		});
	}, []);


	// const handleMouseLeave = () => {
	// 	setMouseLeave(true);
	// };

	// const closeCardTimeout = () => {
	// 	setTimeout(() => {
	// 		setShowCard(false);
	// 	}, 500);
	// };

	// useEffect(() => {
	// 	if (showCard) {
	// 		if (mouseLeave && !cursorOnCard) {
	// 			setShowCard(false);
	// 		} else {
	// 			closeCardTimeout();
	// 		}
	// 	}
	// 	return () => clearTimeout(closeCardTimeout);
	// }, [mouseLeave, cursorOnCard]);

	// const handleMouseEnterCard = () => {
	// 	setCursorOnCard(true);
	// };

	// const handleMouseLeaveCard = () => {
	// 	setCursorOnCard(false);
	// };

	useEffect(() => {
		if (showCard) {
			const element = cardRef.current.getBoundingClientRect();
			if (element.top + element.height > window.innerHeight) {
				cardRef.current.style.top = `-${(element.height + 16) / 16}rem`;
				// setCardStyle({display: "initial"});
			}
		}

	}, [showCard]);


	return (
		<div className={styles.name}>
			<a href={`/${username}`} className={`${styles.name__wrapper} ${className}`}>
				<DisplayName name={name} verified={verified} className={styles.name__displayname} />
				<Username name={username} />
			</a>
			{showCard &&
				<ProfileCardContainer  ref={cardRef} className={styles.profile} user={user} />
				// <div>
				// 	</div>
			}
		</div>
	);
}

Name.propTypes = {
	user: PropTypes.object.isRequired,
	className: PropTypes.string
};

export default Name;
