import React from "react";
import PropTypes from "prop-types";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import GifOutlinedIcon from "@mui/icons-material/GifOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";

import InputContainer from "components/Input/InputContainer.jsx";
import Button from "components/Button/Button.jsx";
import Avatar from "components/Avatar/Avatar.jsx";
import Name from "components/Name/Name";

import styles from "./Tweet.module.css";
import Spinner from "components/Spinner/Spinner";
import TweetTextContainer from "components/TweetText/TweetTextContainer";


function Tweet({ replyingTweet, inputPlaceholder, inputRow, user, tweet, status, handleInputData, handleFormSubmit }) {
	return (
		<div className={styles.tweet}>
			{status === "loading" &&
				<>
					<Spinner message="Tweet posting ..." className={styles.tweet__loader} />
					<div className={styles.tweet__overlay}>
					</div>
				</>
			}
			{/* {replyingTweets && <FeedPostListContainer tweets={replyingTweets} />}
			 */}
			{
				replyingTweet &&
				<div className={styles.tweet__container} style={status === "loading" ? { filter: "blur(1px)" } : {}}>
					<div className={styles.tweet__avatar}>
						<Avatar image={replyingTweet?.user.profile_image_url} />
					</div>
					<div className={styles.tweet__wrapper} style={{ paddingLeft: "1rem" }}>
						<Name user={replyingTweet.user} allowNavigate={false} />
						<TweetTextContainer tweet={replyingTweet} className={styles.tweet__wrapper__text} />
						<div className={styles.tweet__wrapper__people}>
							<span>Replying to</span>
							<a href={`/${replyingTweet.user?.username ?? replyingTweet.user?.screen_name}`} target="_blank" rel="noopener noreferrer">
								@{replyingTweet.user?.username ?? replyingTweet.user?.screen_name}
							</a>
						</div>
					</div>
				</div>
			}
			<div className={styles.tweet__container} style={status === "loading" ? { filter: "blur(1px)" } : {}}>
				<div className={styles.tweet__avatar}>
					<Avatar image={user.profile_image_url} />
				</div>
				<div className={styles.tweet__wrapper}>
					<form id="id_tweetForm">
						<InputContainer
							className={styles.tweet__input}
							tag="textarea"
							attributes={{
								placeholder: inputPlaceholder,
								rows: inputRow,
								name: "text",
							}}
							value={tweet.text}
							handleInputData={handleInputData}
						/>
					</form>
					<div className={styles.tweet__privacy}>
						<PublicOutlinedIcon className={styles["tweet__privacy--icon"]} />
						<span>Everyone can reply</span>
					</div>
					<div className={styles.tweet__footer}>
						<div className={styles.tweet__options}>
							<div className={styles.tweet__options__icon__wrapper}>
								<ImageOutlinedIcon className={styles["tweet__options--icon"]} />
							</div>
							<div className={styles.tweet__options__icon__wrapper}>
								<GifOutlinedIcon className={styles["tweet__options--icon"]} />
							</div>
							<div className={styles.tweet__options__icon__wrapper}>
								<PollOutlinedIcon className={styles["tweet__options--icon"]} />
							</div>
							<div className={styles.tweet__options__icon__wrapper}>
								<EmojiEmotionsOutlinedIcon className={styles["tweet__options--icon"]} />
							</div>
							<div className={styles.tweet__options__icon__wrapper}>
								<ScheduleOutlinedIcon className={styles["tweet__options--icon"]} />
							</div>
						</div>
						<Button onClick={handleFormSubmit} className={styles.tweet__btn}>Tweet</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

Tweet.propTypes = {
	replyingTweet: PropTypes.array,
	inputPlaceholder: PropTypes.string,
	inputRow: PropTypes.string,
	user: PropTypes.object,
	tweet: PropTypes.object,
	status: PropTypes.string,
	handleInputData: PropTypes.func,
	handleFormSubmit: PropTypes.func
};

Tweet.defaultProps = {
	inputPlaceholder: "What's happening?",
	inputRow: "2",
};

export default Tweet;
