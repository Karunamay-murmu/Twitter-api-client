import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import OptionCardItem from "components/OptionCard/OptionCardItem.jsx";

import styles from "./OptionCard.module.css";

const OptionCardContainer = React.forwardRef(({ options }, ref) => {
	return (
		<div className={styles.card__wrapper} ref={ref} >
			{options.map((item, idx) =>
				Object.prototype.hasOwnProperty.call(item, "href")
					? <Link to={`${item.href}`}>
						<OptionCardItem key={idx} {...item} />
					</Link>
					: <OptionCardItem key={idx} {...item} />
			)}
		</div>
	);
});

OptionCardContainer.displayName = "OptionCardContainer";

OptionCardContainer.propTypes = {
	options: PropTypes.arrayOf(PropTypes.object).isRequired,

};

export default OptionCardContainer;
