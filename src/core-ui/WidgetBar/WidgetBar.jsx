import React from "react";

import SearchContainer from "components/Search/SearchContainer.jsx";
import WidgetContainer from "components/Widget/WidgetContainer.jsx";

import styles from "./WidgetBar.module.css";

function WidgetBar() {
	return (
		<div className={styles.widgetBar}>
			<header className={styles.widgetBar__header}>
				<SearchContainer />
			</header>
			<div className={styles.widgetBar__body}>
				<WidgetContainer header="You might like">
				</WidgetContainer>
			</div>
		</div>
	);
}

export default WidgetBar;
