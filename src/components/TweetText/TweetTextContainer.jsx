import React from "react";
import PropTypes from "prop-types";

import TweetText from "components/TweetText/TweetText";

import styles from "./TweetText.module.css";
import FeedPost from "core-ui/FeedPost/FeedPost";

function TweetTextContainer({ tweet }) {

	let { text, entities } = tweet;

	if (entities) {
		let description = text;
		for (const [key, value] of Object.entries(entities)) {
			if (value.length) {
				value.forEach(val => {
					const start = val.start;
					const end = val.end;
					if (key === "hashtags") {
						const hashTag = description.slice(start, end);
						text = text.replace(hashTag, `<span><a href="/hashtags/${val.tag}" target="_blank" rel="noopener noreferrer">#${val.tag}</a></span>`);
					}
					if (key === "urls") {
						const url = new RegExp(val.url, "ig");
						if (!val?.display_url.includes("twitter.com")) {
							text = text.replace(url, `<span><a href="${url}" target="_blank" rel="noopener noreferrer">${val.display_url}</a></span>`);
						} else {
							text = text.replace(url, "");
						}
					}
					if (key === "mentions") {
						const username = new RegExp(`@${val.username}`, "ig");
						if (tweet?.in_reply_to_user_id && !tweet?.isReply) {
							text = text.replace(username, "");
						} else {
							text = text.replace(username, `<span><a href="/${val.username}" target="_blank" rel="noopener noreferrer">@${val.username.toLowerCase()}</a></span>`);
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
							mentions.slice(0, 3)?.map((user, idx) => (
								<div className={styles.post__mentions__people} key={user.id}>
									{mentions.length >= 2 && mentions.length - idx === 1 && "and"}
									<a href={`/${user.username}`} target="_blank" rel="noopener noreferrer">@{user.username}</a>
								</div>
							))
						}
						{mentions.length > 3 && (
							<span className={styles.post__mentions__people}>
								and {mentions.length - 3} others
							</span>
						)}
					</div>
				</div>
			)}
			<TweetText text={text} />
			{
				tweet?.entities?.urls?.map((url, idx) => {
					if (url?.title) {
						return (
							<a href={url.url} key={idx} target="_blank" rel="noreferrer noopener" className={styles.url__preview__wrapper}>
								{url?.images && <div className={styles.url__preview__image}>
									<img src={url.images[1].url} alt="preview_image" />
								</div>}
								<div className={styles.url__preview__info__wrapper}>
									<div className={styles.url__preview__info}>
										{url?.display_url && <div className={styles.url__preview__display}>{url.display_url.split("/")[0]}</div>}
										{url?.title && <div className={styles.url__preview__title}>{url.title.slice(0, 25)}{url.title.length > 25 && "..."}</div>}
										{url?.description && <div className={styles.url__preview__desc}>{url.description.slice(0, 80)}...</div>}
									</div>
								</div>
							</a>
						);
					}
				})
			}
			{
				tweet?.quotedTweet && (
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
