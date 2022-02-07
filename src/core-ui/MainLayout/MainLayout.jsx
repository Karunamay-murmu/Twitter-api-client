import React from "react";
import { Outlet } from "react-router-dom";

import SidebarContainer from "core-ui/Sidebar/SidebarContainer.jsx";
// import MainFeedContainer from "core-ui/MainFeed/MainFeedContainer";

import styles from "./MainLayout.module.css";

function MainLayout() {
	return (
		<div className={styles.main}>
			<header className={styles.main__header}>
				<SidebarContainer />
			</header>
			<main className={styles.main__content}>
				<Outlet />
			</main>
		</div>
	);
}

export default MainLayout;
