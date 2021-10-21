import React from "react";
import PropTypes from "prop-types";

import styles from "./Input.module.css";

function Input({ tag, className, attributes, ...otherProps }) {
	return (
		tag === "input"
			? <input className={`${styles.input} ${className}`} type="text" {...attributes} {...otherProps} />
			: <textarea className={`${styles.input} ${className}`} {...attributes} {...otherProps} />
	);
}

Input.propTypes = {
	attributes: PropTypes.object,
	tag: PropTypes.string,
	className: PropTypes.string,
};

export default Input;
