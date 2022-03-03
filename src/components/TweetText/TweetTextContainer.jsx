import React, { useRef } from "react";
import PropTypes from "prop-types";

import TweetText from "components/TweetText/TweetText";

import styles from "./TweetText.module.css";
import FeedPostListContainer from "core-ui/FeedPostList/FeedPostListContainer";

function TweetTextContainer({ tweet, ...props }) {

	const textRef = useRef();

	const { entities } = tweet;
	let text = tweet?.text ?? tweet?.full_text;
	const mentions = tweet?.entities?.mentions;

	if (entities) {
		for (const [key, value] of Object.entries(entities)) {
			if (value.length) {
				value.forEach(val => {
					if (key === "hashtags") {
						const hashTag = new RegExp(`#\\b${val?.tag ?? val?.text}\\b`, "g");
						text = text.replace(hashTag, `<span><a href="/hashtags/${val?.tag ?? val?.text}" target="_blank" rel="noopener noreferrer">#${val?.tag ?? val?.text}</a></span>`);
					}
					if (key === "urls") {
						const url = new RegExp(`\\b${val.url}\\b`, "g");
						if (!val?.display_url.includes("twitter.com")) {
							text = text.replace(url, `<span><a href="${val.url}" target="_blank" rel="noopener noreferrer">${val.display_url}</a></span>`);
						} else {
							text = text.replace(url, "");
						}
					}
					if (key === "mentions" || key === "user_mentions") {
						const username = new RegExp(`@\\b${val?.username ?? val?.screen_name}\\b`, "g");
						if (tweet?.in_reply_to_user_id) {
							text = text.replace(username, "");
						} else {
							text = text.replace(username, `<span><a href="/${val?.username ?? val?.screen_name}" target="_blank" rel="noopener noreferrer">@${val?.username ?? val?.screen_name.toLowerCase()}</a></span>`);
						}
					}
				});
			}
		}
	}

	const handleClickOnAnchor = (e) => {
		const element = textRef.current;
		if (element && element.contains(e.target) && e.target.tagName === "A" || e.target.tagName === "SPAN") {
			e.stopPropagation();
		}
	};

	return (
		<div className={styles.post}>
			{tweet?.in_reply_to_user_id && tweet?.in_reply_to_user_id !== tweet?.user?.id && (
				<div className={styles.post__mentions__wrapper}>
					<span className={styles.post__mentions__type}>
						Replying to
					</span>
					<div className={styles.post__mentions}>
						{
							mentions.slice(0, 2)?.map((user, idx) => (
								<div className={styles.post__mentions__people} key={user.id}>
									{mentions.length >= 2 && mentions.length - idx === 1 && "and"}
									<a onClick={(e) => e.stopPropagation()} href={`/${user.username}`} target="_blank" rel="noopener noreferrer">@{user.username}</a>
								</div>
							))
						}
						{mentions.length > 3 && (
							<span className={styles.post__mentions__people}>
								and {mentions.length - 2} others
							</span>
						)}
					</div>
				</div>
			)}
			<TweetText text={text} ref={textRef} handleClickOnAnchor={handleClickOnAnchor} {...props} />
			{
				tweet?.entities?.urls?.map((url, idx) => {
					if (url?.title) {
						return (
							<a onClick={(e) => e.stopPropagation()} href={url.url} key={idx} target="_blank" rel="noreferrer noopener" className={styles.url__preview__wrapper}>
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
				(tweet?.quotedTweet || tweet?.is_quote_status) && (
					<div className={styles.quotedTweet__wrapper}>
						<FeedPostListContainer tweets={[tweet?.quoted_status ?? tweet?.quotedTweet]} />
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
