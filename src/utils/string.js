export const trimText = ({ text, trim = false, replace = true, entities }) => {
	const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/im;
	const hashtagRegex = /(#[a-z\d-_]+)/im;
	if (entities) {
		for (const [key, value] of Object.entries(entities)) {
			if (value.length) {
				value.forEach(val => {
					if (key === "hashtags") {
						text = text.replace(hashtagRegex, val.tag);
					} else if (key === "urls") {
						if (trim) {
							text = text.replace(urlRegex, "");
						}
						if (replace) {
							text = text.replace(urlRegex, `<a href="${val.url}" target="_blank" rel="noopener noreferrer">${val.display_url}</a>`);
						}
					}
				});
			}
		}
	}
	return text;
};