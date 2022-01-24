import React from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";

import styles from "./TweetText.module.css";

function TweetText({ text }) {
	return (
		<p className={styles.text} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text.trim()) }}></p>
	);
}

TweetText.propTypes = {
	text: PropTypes.string.isRequired
};

export default TweetText;
