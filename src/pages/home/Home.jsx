import React from "react";

import Sidebar from "core-ui/Sidebar/Sidebar.jsx";
import Feed from "core-ui/Feed/Feed.jsx";

import styles from "./Home.module.css";

function Home() {
	return (
		<div className={styles.home}>
			<Sidebar />
			<Feed />
		</div>
	);
}

export default Home;
