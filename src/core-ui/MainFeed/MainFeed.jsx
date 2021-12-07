import React from "react";
import PropTypes from "prop-types";

import WidgetBar from "core-ui/WidgetBar/WidgetBar";

import styles from "./MainFeed.module.css";

function MainFeedContainer({ children }) {
	return (
		<div className={styles.feed}>
			<div className={styles.feed__wrapper}>
				{children}
			</div>
			<div className={styles.feed__widget}>
				<WidgetBar />
			</div>
		</div>
	);
}

MainFeedContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

export default MainFeedContainer;
