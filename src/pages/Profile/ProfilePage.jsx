import React from "react";

import Sidebar from "core-ui/Sidebar/Sidebar.jsx";
import WidgetBar from "core-ui/WidgetBar/WidgetBar.jsx";
import FeedPostContainer from "core-ui/FeedPost/FeedPostContainer";
import ProfileContainer from "core-ui/Profile/ProfileContainer.jsx";

import styles from "./ProfilePage.module.css";

function Profile() {
	return (
		<div className={styles.wrapper}>
			<Sidebar />
			<div className={styles.feed}>
				<header className={styles.feed__header}>Username</header>
				<ProfileContainer />
				<div>
					<FeedPostContainer />
					<FeedPostContainer />
					<FeedPostContainer />
					<FeedPostContainer />
				</div>
			</div>
			<WidgetBar />
		</div>
	);
}

export default Profile;
