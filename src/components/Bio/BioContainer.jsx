import React from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";

import Bio from "components/Bio/Bio.jsx";

function BioContainer({ entities, bio, className }) {
	if (entities) {
		const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/im;
		const hashtagRegex = /(#[a-z\d-_]+)/im;
		for (const [key, value] of Object.entries(entities)) {
			if (value.length) {
				value.forEach(val => {
					if (key === "hashtags") {
						bio = bio.replace(hashtagRegex, val.tag);
					} else if (key === "urls") {
						bio = bio.replace(urlRegex, `<a href="${val.url}" target="_blank" rel="noopener noreferrer">${val.display_url}</a>`);
					}
				});
			}
		}
	}

	return (
		<Bio className={className} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(bio) }} />
	);
}

BioContainer.propTypes = {
	bio: PropTypes.string.isRequired,
	className: PropTypes.string,
	entities: PropTypes.object,
};

export default BioContainer;
