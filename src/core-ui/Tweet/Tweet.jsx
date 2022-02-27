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

import styles from "./Tweet.module.css";

function Tweet({ inputPlaceholder, inputRow, user, value, handleInputData, handleFormSubmit }) {
	return (
		<div className={styles.tweet}>
			<div className={styles.tweet__avatar}>
				<Avatar image={user.profile_image_url} />
			</div>
			<div className={styles.tweet__wrapper}>
				<form method="post" encType="multipart/form-data" id="id_tweetForm" onSubmit={handleFormSubmit}>
					<InputContainer
						className={styles.tweet__input}
						tag="textarea"
						attributes={{
							placeholder: inputPlaceholder,
							rows: inputRow,
							name: "tweet"
						}}
						value={value}
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
					<Button attributes={{ "type": "submit", "form": "id_tweetForm" }} className={styles.tweet__btn}>Tweet</Button>
				</div>
			</div>
		</div>
	);
}

Tweet.propTypes = {
	inputPlaceholder: PropTypes.string,
	inputRow: PropTypes.string,
	user: PropTypes.object,
	value: PropTypes.string,
	handleInputData: PropTypes.func,
	handleFormSubmit: PropTypes.func
};

Tweet.defaultProps = {
	inputPlaceholder: "What's happening?",
	inputRow: "2",
};

export default Tweet;
