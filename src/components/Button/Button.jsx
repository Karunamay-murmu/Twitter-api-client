import React from "react";
import PropTypes from "prop-types";

import styles from "./Button.module.css";


function Button({ children, className, attributes, ...otherProps }) {
	console.log(attributes);
	return (
		<button type="button" className={`${styles.button} ${className}`} {...attributes} {...otherProps}>
			<span>{children}</span>
		</button>
	);
}

Button.propTypes = {
	attributes: PropTypes.object,
	children: PropTypes.string,
	className: PropTypes.string,
};


export default Button;
