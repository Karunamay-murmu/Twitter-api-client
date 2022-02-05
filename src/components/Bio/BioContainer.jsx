import React from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import twemoji from "twemoji";

import Bio from "components/Bio/Bio.jsx";

function BioContainer({ entities, bio, className }) {
	// const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/im;
	// const hashtagRegex = /(#[a-z\d-_]+)/im;

	if (entities) {
		// let description = bio;
		for (const [key, value] of Object.entries(entities)) {
			if (value.length) {
				value.forEach(val => {
					// const start = val.start;
					// const end = val.end;
					// if (key === "urls") {
					// 	const url = description.slice(start, end);
					// 	bio = bio.replace(url, `<span><a href="${url}" target="_blank" rel="noopener noreferrer">${val.display_url}</a></span>`);
					// }
					if (key === "urls") {
						const url = new RegExp(val.url, "ig");
						bio = bio.replace(url, `<span><a href=${val.url}>${val.display_url}</a></span>`);
						// if (!val?.display_url.includes("twitter.com")) {
						// 	bio = bio.replace(url, "");
						// } else {
						// }
					}
					// if (key === "mentions") {
					// 	const mentions = description.slice(start, end);
					// 	bio = bio.replace(mentions, `<span><a href="/${val.username}" target="_blank" rel="noopener noreferrer">${mentions}</a></span>`);
					// }
					if (key === "mentions") {
						const username = new RegExp(`@${val.username}`, "ig");
						bio = bio.replace(username, `<span><a href="/${val.username}" target="_blank" rel="noopener noreferrer">@${val.username.toLowerCase()}</a></span>`);
					}
					// if (key === "hashtags") {
					// 	const hashTag = description.slice(start, end);
					// 	bio = bio.replace(hashTag, `<span><a href="/hashtags/${val.tag}" target="_blank" rel="noopener noreferrer">#${val.tag}</a></span>`);
					// }
					if (key === "hashtags") {
						const hashTag = new RegExp(`#${val.tag}`, "ig");
						bio = bio.replace(hashTag, `<span><a href="/hashtags/${val.tag}" target="_blank" rel="noopener noreferrer">#${val.tag}</a></span>`);
					}

				});
			}
		}
	}
	// if (entities) {
	// 	const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/im;
	// 	const hashtagRegex = /(#[a-z\d-_]+)/im;
	// 	for (const [key, value] of Object.entries(entities)) {
	// 		if (value.length) {
	// 			value.forEach(val => {
	// 				if (key === "hashtags") {
	// 					bio = bio.replace(hashtagRegex, val.tag);
	// 				} else if (key === "urls") {
	// 					bio = bio.replace(urlRegex, `<span><a href="${val.url}" target="_blank" rel="noopener noreferrer">${val.display_url}</a></span>`);
	// 				}
	// 			});
	// 		}
	// 	}
	// }

	return (
		<Bio className={className} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(twemoji.parse(bio)) }} />
	);
}

BioContainer.propTypes = {
	bio: PropTypes.string.isRequired,
	className: PropTypes.string,
	entities: PropTypes.object,
};

export default BioContainer;
