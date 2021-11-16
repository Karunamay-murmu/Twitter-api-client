import React from "react";
import {Outlet} from "react-router-dom";

import Sidebar from "core-ui/Sidebar/Sidebar.jsx";
import HomeFeed from "core-ui/HomeFeed/HomeFeed.jsx";
import WidgetBar from "core-ui/WidgetBar/WidgetBar.jsx";

import styles from "./Home.module.css";

function Home() {
	return (
		<div className={styles.home}>
			<Sidebar />
			<Outlet />
			<WidgetBar />
		</div>
	);
}

export default Home;
