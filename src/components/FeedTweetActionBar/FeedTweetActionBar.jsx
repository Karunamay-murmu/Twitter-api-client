import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";

import { short } from "utils/number";

import styles from "./FeedTweetActionBar.module.css";

function FeedTweetActionBar({
	id,
	replyCount,
	likeCount,
	retweetCount,
}) {
	const location = useLocation();
	return (
		<>
			<div className={styles.actionbar__wrapper}>
				<Link to="/compose/tweet" state={{ background: location, id }} className={`${styles.actionbar__analytics} ${styles["actionbar__analytics--reply"]}`} title="Reply">
					<div className={`${styles.actionbar__icon__wrapper}`}>
						<ChatBubbleOutlineRoundedIcon className={styles.actionbar__icon} />
					</div>
					<span>{short(replyCount)}</span>
				</Link>
				<div className={`${styles.actionbar__analytics} ${styles["actionbar__analytics--retweet"]}`} title="Retweets">
					<div className={`${styles.actionbar__icon__wrapper}`}>
						<RepeatRoundedIcon className={styles.actionbar__icon} />
					</div>
					<span>{short(retweetCount)}</span>
				</div>
				<div className={`${styles.actionbar__analytics} ${styles["actionbar__analytics--like"]}`} title="Like">
					<div className={`${styles.actionbar__icon__wrapper}`}>
						<FavoriteBorderRoundedIcon className={styles.actionbar__icon} />
					</div>
					<span>{short(likeCount)}</span>
				</div>
				<div className={`${styles.actionbar__analytics} ${styles["actionbar__analytics--share"]}`} title="Share">
					<div className={`${styles.actionbar__icon__wrapper}`}>
						<IosShareRoundedIcon className={styles.actionbar__icon} />
					</div>
					<span>5</span>
				</div>
			</div>
			{/* {
				isModalOpen && (modalId === tweetId) &&
				<Routes>
					<Route path="/compose/tweet" element={
						<ModalContainer emptyHeaderBtn emptyHeaderText>
							<TweetContainer inputPlaceholder="Tweet your reply" inputRow="5" />
						</ModalContainer>
					} />
				</Routes>
			} */}
		</>
	);
}

FeedTweetActionBar.propTypes = {
	id: PropTypes.string,
	replyCount: PropTypes.number,
	likeCount: PropTypes.number,
	retweetCount: PropTypes.number,
	isModalOpen: PropTypes.bool,
};

export default FeedTweetActionBar;
