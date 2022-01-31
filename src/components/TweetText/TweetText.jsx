import React from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import twemoji from "twemoji";

import styles from "./TweetText.module.css";

function TweetText({ text, handleClickOnAnchor, className }, ref) {
	const node = twemoji.parse(text);
	console.log(text);
	return (
		<p className={`${styles.text} ${className||""}`} onClick={handleClickOnAnchor} ref={ref} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(node.trim()) }}></p>
	);
}

TweetText.propTypes = {
	text: PropTypes.string.isRequired,
	handleClickOnAnchor: PropTypes.func,
	className: PropTypes.string
};

export default React.forwardRef(TweetText);
