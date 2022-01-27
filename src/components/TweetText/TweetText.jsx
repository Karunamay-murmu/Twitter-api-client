import React from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import twemoji from "twemoji";

import styles from "./TweetText.module.css";

function TweetText({ text }) {
	const node = twemoji.parse(text);
	return (
		<p className={styles.text} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(node.trim()) }}></p>
	);
}

TweetText.propTypes = {
	text: PropTypes.string.isRequired
};

export default TweetText;
