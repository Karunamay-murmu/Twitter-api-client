import React from "react";
import PropTypes from "prop-types";

import TweetText from "components/TweetText/TweetText";
// import Name from "components/Name/Name";

import styles from "./TweetText.module.css";
import FeedPost from "core-ui/FeedPost/FeedPost";
// import Avatar from "components/Avatar/Avatar";

function TweetTextContainer({ tweet }) {

	let { text, entities } = tweet;

	// const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/im;
	const hashtagRegex = /(#[a-z\d-_]+)/im;

	if (entities) {
		let description = text;
		for (const [key, value] of Object.entries(entities)) {
			if (value.length) {
				value.forEach(val => {
					if (key === "hashtags") {
						text = text.replace(hashtagRegex, val.tag);
					} else {
						const start = val.start;
						const end = val.end;
						if (key === "urls") {
							const url = description.slice(start, end);
							text = text.replace(url, "");
						}
						if (key === "mentions") {
							const mentions = description.slice(start, end);
							text = text.replace(mentions, `<span><a href="/${mentions}" target="_blank" rel="noopener noreferrer">${mentions}</a></span>`);
						}
					}
				});
			}
		}
	}

	const mentions = tweet?.entities?.mentions;

	return (
		<div className={styles.post}>
			{tweet?.in_reply_to_user_id && tweet?.in_reply_to_user_id !== tweet?.user?.id && (
				<div className={styles.post__mentions__wrapper}>
					<span className={styles.post__mentions__type}>
						Replying to
					</span>
					<div className={styles.post__mentions}>
						{
							mentions.slice(0, 2)?.map(user => (
								<a key={user.id} href={`/${user.username}`} target="_blank" rel="noopener noreferrer">@{user.username}</a>
							))
						}
						{mentions.length > 2 && (
							<span className={styles.post__mentions__others}>
								and {mentions.length - 2} others
							</span>
						)}
					</div>
				</div>
			)}
			<TweetText text={text} />
			{
				tweet?.entities?.urls?.map(url => {
					if (url?.title) {
						return (
							<a href={url.url} key={url} target="_blank" rel="noreferrer noopener" className={styles.url__preview__wrapper}>
								<div className={styles.url__preview__image}>
									<img src={url.images[1].url} alt="preview_image" />
								</div>
								<div className={styles.url__preview__info__wrapper}>
									<div className={styles.url__preview__info}>
										<div className={styles.url__preview__display}>{url.display_url.split("/")[0]}</div>
										<div className={styles.url__preview__title}>{url.title.slice(0, 25)}...</div>
										<div className={styles.url__preview__desc}>{url.description.slice(0, 80)}...</div>
									</div>
								</div>
							</a>
						);
					}
				})
			}
			{
				tweet?.quotedTweet && (
					// <div>
					// 	<Avatar image={tweet?.quotedTweet?.user?.profile_image_url} />
					// 	<Name user={tweet?.quotedTweet?.user} />
					// </div>
					// <TweetTextContainer tweet={tweet?.quotedTweet} />
					<div className={styles.quotedTweet__wrapper}>
						<FeedPost
							user={tweet.quotedTweet.user}
							tweet={tweet.quotedTweet}
							media={tweet.quotedTweet?.media}
						/>
					</div>
				)
			}
		</div>
	);
}

TweetTextContainer.propTypes = {
	tweet: PropTypes.object.isRequired
};

export default TweetTextContainer;
