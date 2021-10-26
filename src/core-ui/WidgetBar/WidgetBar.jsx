import React from "react";
import PropTypes from "prop-types";

import SearchContainer from "components/Search/SearchContainer.jsx";
import WidgetContainer from "components/Widget/WidgetContainer.jsx";
import ProfileButtonContainer from "components/ProfileButton/ProfileButtonContainer";

import styles from "./WidgetBar.module.css";

function WidgetBar() {
	return (
		<div className={styles.widgetBar}>
			<SearchContainer />
			<WidgetContainer header="You might like">
				<ProfileButtonContainer />
			</WidgetContainer>
		</div>
	);
}

WidgetBar.propTypes = {
	widgetHeader: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default WidgetBar;
