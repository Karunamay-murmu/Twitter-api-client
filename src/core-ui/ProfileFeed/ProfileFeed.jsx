import React from "react";
import PropTypes from "prop-types";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

// import Sidebar from "core-ui/Sidebar/Sidebar.jsx";
// import WidgetBar from "core-ui/WidgetBar/WidgetBar.jsx";
import FeedPostContainer from "core-ui/FeedPost/FeedPostContainer";
import ProfileContainer from "core-ui/Profile/ProfileContainer.jsx";
import DisplayName from "components/DisplayName/DisplayName";
// import Verified from "components/Verified/Verified.jsx";

import styles from "./ProfileFeed.module.css";

function ProfileFeed({ username, tweetcount, ...props }) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.feed}>
				<header className={styles.feed__header}>
					<div className={styles.feed__header__container}>
						<div className={styles.feed__back}>
							<ArrowBackOutlinedIcon className={styles.feed__back__icon} />
						</div>
						<div className={styles.feed__info}>
							<DisplayName name={username} className={styles.feed__username}/>
							<div className={styles.feed__tweetcount}>
								{tweetcount || "15.5K"} Tweets
							</div>
						</div>
					</div>
				</header>
				<ProfileContainer {...props} />
				<div>
					<FeedPostContainer />
					<FeedPostContainer />
					<FeedPostContainer />
					<FeedPostContainer />
				</div>
			</div>
		</div>
	);
}

ProfileFeed.propTypes = {
	username: PropTypes.string.isRequired,
	tweetcount: PropTypes.string.isRequired,
};


export default ProfileFeed;
