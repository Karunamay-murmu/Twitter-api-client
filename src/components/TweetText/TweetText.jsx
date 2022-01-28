import React from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import twemoji from "twemoji";

import styles from "./TweetText.module.css";

function TweetText({ text, handleClickOnAnchor }, ref) {
	const node = twemoji.parse(text);
	return (
		<p className={styles.text} onClick={handleClickOnAnchor} ref={ref} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(node.trim()) }}></p>
	);
}

TweetText.propTypes = {
	text: PropTypes.string.isRequired,
	handleClickOnAnchor: PropTypes.func,
};

export default React.forwardRef(TweetText);
