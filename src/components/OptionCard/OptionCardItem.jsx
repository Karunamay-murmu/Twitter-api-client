import React from "react";
import PropTypes from "prop-types";

// import IdentifyTagHOC from "hoc/IdentifyTag.jsx";

import styles from "./OptionCard.module.css";


function OptionCardItem({ Icon, text }) {
	return (
		<div className={styles.card__item}>
			{Icon && <div className={styles.card__item__icon__wrapper}>
				<Icon className={styles.card__item__icon} />
			</div>}
			<span className={styles.card__item__text}>{text}</span>
		</div>
	);
}

OptionCardItem.propTypes = {
	Icon: PropTypes.elementType,
	text: PropTypes.string.isRequired,
	tag: PropTypes.string,
};

export default OptionCardItem;
