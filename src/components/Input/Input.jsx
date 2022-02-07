import React from "react";
import PropTypes from "prop-types";

import styles from "./Input.module.css";

function Input({ tag, className, attributes, value, onInputChange, onInputFocusIn, onInputFocusOut, ...props }) {
	return (
		tag === "input"
			? <input className={`${styles.input} ${className}`} {...attributes} {...props} value={value} onChange={onInputChange} onFocus={onInputFocusIn} onBlur={onInputFocusOut} />
			: <textarea className={`${styles.input} ${className}`} {...attributes} {...props} value={value} onChange={onInputChange} onFocus={onInputFocusIn} onBlur={onInputFocusOut} />
	);
}

Input.propTypes = {
	attributes: PropTypes.object,
	tag: PropTypes.string,
	className: PropTypes.string,
	value: PropTypes.string,
	onInputChange: PropTypes.func,
	onInputFocusIn: PropTypes.func,
	onInputFocusOut: PropTypes.func,
};

export default Input;
