import React from "react";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";

import styles from "./FeedTweetActionBar.module.css";

function FeedTweetActionBar() {
	return (
		<div className={styles.actionbar__wrapper}>
			<div className={`${styles.actionbar__analytics} ${styles["actionbar__analytics--reply"]}`} title="Reply">
				<div className={`${styles.actionbar__icon__wrapper}`}>
					<ChatBubbleOutlineRoundedIcon className={styles.actionbar__icon} />
				</div>
				<span>4.9K</span>
			</div>
			<div className={`${styles.actionbar__analytics} ${styles["actionbar__analytics--retweet"]}`} title="Retweets">
				<div className={`${styles.actionbar__icon__wrapper}`}>
					<RepeatRoundedIcon className={styles.actionbar__icon} />
				</div>
				<span>59</span>
			</div>
			<div className={`${styles.actionbar__analytics} ${styles["actionbar__analytics--like"]}`} title="Like">
				<div className={`${styles.actionbar__icon__wrapper}`}>
					<FavoriteBorderRoundedIcon className={styles.actionbar__icon} />
				</div>
				<span>1.1M</span>
			</div>
			<div className={`${styles.actionbar__analytics} ${styles["actionbar__analytics--share"]}`} title="Share">
				<div className={`${styles.actionbar__icon__wrapper}`}>
					<IosShareRoundedIcon className={styles.actionbar__icon} />
				</div>
				<span>5</span>
			</div>
		</div>
	);
}

export default FeedTweetActionBar;
