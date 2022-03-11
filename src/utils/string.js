export const tweetText = (tweet) => {
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
						text = text.replace(urlRegex, `<a href="${val.url}" target="_blank" rel="noopener noreferrer">${val.display_url}</a>`);
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
	return text.trim();
};