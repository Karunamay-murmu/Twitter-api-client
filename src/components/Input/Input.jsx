import React from "react";
import PropTypes from "prop-types";

import styles from "./Input.module.css";

function Input({ tag, className, attributes, value, onInputChange, ...otherProps }) {
	return (
		tag === "input"
			? <input className={`${styles.input} ${className}`} {...attributes} {...otherProps} value={value} onChange={onInputChange}/>
			: <textarea className={`${styles.input} ${className}`} {...attributes} {...otherProps} value={value} onChange={onInputChange}/>
	);
}

Input.propTypes = {
	attributes: PropTypes.object,
	tag: PropTypes.string,
	className: PropTypes.string,
	value: PropTypes.string,
	onInputChange: PropTypes.func,
};

export default Input;
