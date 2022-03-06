import React from "react";
import PropTypes from "prop-types";

import styles from "./OptionCard.module.css";


function OptionCardItem({ Icon, text, eventHandlers }) {
	return (
		<div className={styles.card__item} {...eventHandlers}>
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
	eventHandlers: PropTypes.func
};

OptionCardItem.defaultProps = {
	eventHandlers: () => { }
};

export default OptionCardItem;
