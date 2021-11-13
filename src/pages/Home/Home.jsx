import React from "react";

import Sidebar from "core-ui/Sidebar/Sidebar.jsx";
import Feed from "core-ui/Feed/Feed.jsx";
import WidgetBar from "core-ui/WidgetBar/WidgetBar.jsx";

import styles from "./Home.module.css";

function Home() {
	return (
		<div className={styles.home}>
			<Sidebar />
			<Feed />
			<WidgetBar />
		</div>
	);
}

export default Home;
