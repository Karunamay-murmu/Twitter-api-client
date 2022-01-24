import React from "react";
import PropTypes from "prop-types";

import TweetText from "components/TweetText/TweetText";

import styles from "./TweetText.module.css";

function TweetTextContainer({ tweet }) {

	let { text, entities } = tweet;

	const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/im;
	const hashtagRegex = /(#[a-z\d-_]+)/im;

	if (entities) {
		for (const [key, value] of Object.entries(entities)) {
			if (value.length) {
				value.forEach(val => {
					if (key === "hashtags") {
						text = text.replace(hashtagRegex, val.tag);
					} else if (key === "urls") {
						text = text.replace(urlRegex, "");
					} else if (key === "mentions") {
						let html = `<a href="/${val.username}" target="_blank" rel="noopener noreferrer">@${val.username}</a>`;
						if (tweet?.in_reply_to_user_id) {
							text = text.replace(`@${val.username}`, "");
						}
						text = text.replace(`@${val.username}`, html);
					}
				});
			}
		}
	}

	return (
		<div className={styles.post}>
			{tweet?.in_reply_to_user_id && tweet?.in_reply_to_user_id !== tweet?.user?.id && (
				<div className={styles.post__mentions__wrapper}>
					<span className={styles.post__mentions__type}>
						Replying to
					</span>
					<div className={styles.post__mentions}>
						{
							tweet?.entities?.mentions?.map(user => (
								<a key={user.id} href={`/${user.username}`} target="_blank" rel="noopener noreferrer">@{user.username}</a>
							))
						}
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
										<div className={styles.url__preview__display}>{url.display_url}</div>
										<div className={styles.url__preview__title}>{url.title}</div>
										<div className={styles.url__preview__desc}>{url.description.slice(0, 104)}...</div>
									</div>
								</div>
							</a>
						);
					}
				})
			}
		</div>
	);
}

TweetTextContainer.propTypes = {
	tweet: PropTypes.object.isRequired
};

export default TweetTextContainer;
