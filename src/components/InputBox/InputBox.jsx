import React from "react";
import PropTypes from "prop-types";

import InputContainer from "components/Input/InputContainer";

import styles from "./InputBox.module.css";

function InputBox({ label, value = "", error: { hasError, message }, showMaxLength, maxLength, length = value.length, children, ...props }) {
	return (
		<div className={styles.input}>
			<div className={`${styles.input__group} ${hasError ? styles["input__group--error"] : ""}`}>
				<InputContainer
					id={`id_${label}`}
					className={styles.input__field}
					value={value}
					{...props}
				/>
				{label &&
					<div className={styles.input__label__wrapper}>
						<label htmlFor={`id_${label}`} className={`${styles.input__label} ${hasError ? styles["input__label--error"] : ""}`}>
							{children || label}
						</label>
						{(showMaxLength || hasError) &&
							<div className={styles.input__length}>{`${length}/${maxLength}`}</div>
						}
					</div>
				}
			</div>
			{hasError &&
				<div className={styles.input__error}>
					<span className={styles.input__error__message}>{message}</span>
				</div>
			}
		</div>
	);
}

InputBox.propTypes = {
	label: PropTypes.string,
	tag: PropTypes.string,
	attributes: PropTypes.object,
	value: PropTypes.string,
	error: PropTypes.object,
	hasError: PropTypes.bool,
	message: PropTypes.string,
	getInputDetails: PropTypes.func,
	showMaxLength: PropTypes.bool,
	maxLength: PropTypes.string,
	length: PropTypes.string,
	restrictInputChange: PropTypes.bool,
	children: PropTypes.node,
};

export default InputBox;
