import React from "react";
import PropTypes from "prop-types";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

import OptionCardContainer from "components/OptionCard/OptionCardContainer";

import styles from "./MoreOption.module.css";

function MoreOption({ moreOptions, cardOpen, showCard }) {
	return (
		<div className={styles.more__container}>
			<div onClick={showCard} className={`${styles.more__icon__wrapper}${cardOpen ? " " + styles["more__icon__wrapper--active"] : ""}`}>
				<MoreHorizRoundedIcon className={styles.more__icon} />
			</div>
			{cardOpen && moreOptions &&
				<div className={styles.more__options__wrapper}>
					<OptionCardContainer options={moreOptions} />
				</div>
			}
		</div>
	);
}

MoreOption.propTypes = {
	moreOptions: PropTypes.array.isRequired,
	cardOpen: PropTypes.bool.isRequired,
	showCard: PropTypes.func.isRequired,
};

export default MoreOption;
