import React from "react";
import PropTypes from "prop-types";

import styles from "./Button.module.css";


function Button({ reverseColor, allowDangerousActionHoverStyle, children, className, attributes, ...otherProps }) {
	return (
		<button 
			type="button" 
			className={`${className ? className + " " : ""}${styles.button}${reverseColor ? " " + styles.button__reverse : ""}${allowDangerousActionHoverStyle ? " " + styles.button__dangerousHover : ""}`}
			{...attributes}
			{...otherProps}
		>
			{children}
		</button>
	);
}

Button.propTypes = {
	attributes: PropTypes.object,
	children: PropTypes.string,
	className: PropTypes.string,
	reverseColor: PropTypes.bool, 
	allowDangerousActionHoverStyle: PropTypes.bool,
};

Button.defaultProps = {
	attributes: {},
	children: "",
	className: "",
	reverseColor: false,
	allowDangerousActionHoverStyle: false,
};


export default Button;
