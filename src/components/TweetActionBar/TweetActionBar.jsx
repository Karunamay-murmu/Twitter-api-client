import React from "react";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

import styles from "./TweetActionBar.module.css";

function TweetActionBar() {
	return (
		<div className={styles.tweetaction__wrapper}>
			{/* <LikeContainer /> */}
			<div className={styles.tweetaction__icon__wrapper} title="Reply">
				<ChatBubbleOutlineRoundedIcon className={styles.tweetaction__icon} />
			</div>
			<div className={styles.tweetaction__icon__wrapper} title="Retweets">
				<AutorenewRoundedIcon className={styles.tweetaction__icon} />
			</div>
			<div className={styles.tweetaction__icon__wrapper} title="Like">
				<FavoriteBorderRoundedIcon className={styles.tweetaction__icon} />
			</div>
			<div className={styles.tweetaction__icon__wrapper} title="Share">
				<FileUploadOutlinedIcon className={styles.tweetaction__icon} />
			</div>
		</div>
	);
}

export default TweetActionBar;
