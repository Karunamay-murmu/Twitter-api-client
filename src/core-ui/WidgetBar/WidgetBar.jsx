import React from "react";
import PropTypes from "prop-types";

import SearchContainer from "components/Search/SearchContainer.jsx";
import WidgetContainer from "components/Widget/WidgetContainer.jsx";
import ProfileButtonContainer from "components/ProfileButton/ProfileButtonContainer";
import ProfileCard from "core-ui/ProfileCard/ProfileCardContainer.jsx";

import styles from "./WidgetBar.module.css";

function WidgetBar() {
	return (
		<div className={styles.widgetBar}>
			<header className={styles.widgetBar__header}>
				<SearchContainer />
			</header>
			<div className={styles.widgetBar__body}>
				<WidgetContainer header="You might like">
					<ProfileButtonContainer />
					<ProfileButtonContainer />
				</WidgetContainer>
			</div>
			<ProfileCard />
		</div>
	);
}

WidgetBar.propTypes = {
	widgetHeader: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default WidgetBar;
