import React, { useState } from "react";
import PropTypes from "prop-types";

import InputBox from "components/InputBox/InputBox";

function InputBoxContainer(props) {
	const errorObj = {
		hasError: false,
		message: "",
		name: null,
		id: null,
		type: ""
	};
	const [error, setError] = useState(errorObj);
	const [inputLength, setInputLength] = useState(0);
	const [restrictInputChange, setRestrictInputChange] = useState(false);
	const [showMaxLength, setShowMaxLength] = useState(false);

	const handleInputError = (element) => {
		const { name, id } = element;
		if (element.required && !element.value) {
			setError({
				hasError: true,
				name,
				id,
				message: `${name} can't be blank`
			});
		} else {
			setError(errorObj);
		}
	};

	const handleInputData = (event) => {
		const { target } = event;
		handleInputError(target);
		setInputLength(target.value.length);
		inputLength > Number(props.maxLength) ? setRestrictInputChange(true) : setRestrictInputChange(false);
		props.getInputDetails(target);
	};

	const onInputFocusIn = () => setShowMaxLength(true);
	const onInputFocusOut = () => setShowMaxLength(false);

	return (
		<InputBox
			handleInputData={handleInputData}
			showMaxLength={showMaxLength}
			restrictInputChange={restrictInputChange}
			onInputFocusIn={onInputFocusIn}
			onInputFocusOut={onInputFocusOut}
			length={inputLength}
			error={error}
			{...props}
		/>
	);
}

InputBoxContainer.propTypes = {
	maxLength: PropTypes.string,
	getInputDetails: PropTypes.func,
};


export default InputBoxContainer;