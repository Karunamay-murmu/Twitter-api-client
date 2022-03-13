import React from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import twemoji from "twemoji";

import Bio from "components/Bio/Bio.jsx";

function BioContainer({ entities, bio, className }) {
	if (entities) {
		for (const [key, value] of Object.entries(entities)) {
			if (value.length) {
				value.forEach(val => {
					if (key === "urls") {
						const url = new RegExp(val.url, "ig");
						bio = bio.replace(url, `<span><a href=${val.url}>${val.display_url}</a></span>`);
					}
					if (key === "mentions") {
						const username = new RegExp(`@${val.username}`, "ig");
						bio = bio.replace(username, `<span><a href="/${val.username}" target="_blank" rel="noopener noreferrer">@${val.username.toLowerCase()}</a></span>`);
					}
					if (key === "hashtags") {
						const hashTag = new RegExp(`#${val.tag}`, "ig");
						bio = bio.replace(hashTag, `<span><a href="/hashtags/${val.tag}" target="_blank" rel="noopener noreferrer">#${val.tag}</a></span>`);
					}

				});
			}
		}
	}
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
