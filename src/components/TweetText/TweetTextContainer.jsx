import React from "react";
import PropTypes from "prop-types";

import TweetText from "components/TweetText/TweetText";
// import Name from "components/Name/Name";

import styles from "./TweetText.module.css";
import FeedPost from "core-ui/FeedPost/FeedPost";
// import Avatar from "components/Avatar/Avatar";

function TweetTextContainer({ tweet }) {

	let { text, entities } = tweet;
	const hashtagRegex = /(#[a-z\d-_]+)/im;

	if (entities) {
		for (const [key, value] of Object.entries(entities)) {
			if (value.length) {
				value.forEach(val => {
					if (key === "hashtags") {
						text = text.replace(hashtagRegex, `<span><a href="/hashtags/${val.tag}" target="_blank" rel="noopener noreferrer">#${val.tag}</a></span>`);
					} else {
						if (key === "urls") {
							const url = new RegExp(val.url, "ig");
							if (!val?.display_url.includes("twitter.com")) {
								text = text.replace(url, `<span><a href="${val.url}" target="_blank" rel="noopener noreferrer">${val.display_url}</a></span>`);
							} else {
								text = text.replace(url, "");
							}
						}
						if (key === "mentions") {
							const username = new RegExp(`@${val.username}`, "ig");
							if (tweet?.in_reply_to_user_id && !tweet?.isReply) {
								text = text.replace(username, "");
							} else {
								console.log(text);
								text = text.replace(username, `<span><a href="/${val.username}" target="_blank" rel="noopener noreferrer">@${val.username}</a></span>`);
								console.log(text);
							}
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
										<div className={styles.url__preview__title}>{url.title.slice(0, 25)}{url.title.length > 25 && "..." }</div>
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
