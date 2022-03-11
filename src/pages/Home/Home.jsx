import React from "react";
import { Outlet } from "react-router-dom";

import SidebarContainer from "core-ui/Sidebar/SidebarContainer.jsx";
import WidgetBar from "core-ui/WidgetBar/WidgetBar.jsx";

import styles from "./Home.module.css";

function Home() {
	return (
		<div className={styles.home}>
			<SidebarContainer />
			<div className={styles.home__outlet}>
				<Outlet />
			</div>
		</div>
	);
}

export default Home;
