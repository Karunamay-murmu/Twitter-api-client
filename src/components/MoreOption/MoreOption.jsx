import React from "react";
import PropTypes from "prop-types";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

import OptionCardContainer from "components/OptionCard/OptionCardContainer";

import styles from "./MoreOption.module.css";

function MoreOption({ moreOptions, cardOpen, showCard, cardId, currentCardId }) {
	return (
		<div className={styles.more__container}>
			<div onClick={(e) => showCard(e)} data-card-id={cardId} className={`${styles.more__icon__wrapper}${cardOpen && (cardId == currentCardId) ? " " + styles["more__icon__wrapper--active"] : ""}`}>
				<MoreHorizRoundedIcon className={styles.more__icon} />
			</div>
			{cardOpen && moreOptions && (cardId === currentCardId) &&
				<div className={styles.more__options__wrapper} >
					<OptionCardContainer options={moreOptions} />
				</div>
			}
		</div>
	);
}

MoreOption.displayName = "MoreOption";

MoreOption.propTypes = {
	moreOptions: PropTypes.array.isRequired,
	cardOpen: PropTypes.bool.isRequired,
	showCard: PropTypes.func.isRequired,
	cardId: PropTypes.string,
	currentCardId: PropTypes.string
};

export default MoreOption;
