import React from "react";
import PropTypes from "prop-types";

import styles from "./Button.module.css";


function Button({ children, className, attributes, ...otherProps }) {
	return (
		<button type="button" className={`${className ? className + " " : ""}${styles.button}`} {...attributes} {...otherProps}>
			{children}
		</button>
	);
}

Button.propTypes = {
	attributes: PropTypes.object,
	children: PropTypes.string,
	className: PropTypes.string,
};

Button.defaultProps = {
	attributes: {},
	children: "",
	className: "",
};


export default Button;
