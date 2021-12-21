import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Input from "components/Input/Input.jsx";

function InputContainer({ handleInputData, value, restrictInputChange = false, ...props }) {
	const [input, setInput] = useState("");
	const onInputChange = (e) => {
		!restrictInputChange && setInput(e.target.value);
		handleInputData(e);
	};
	useEffect(() => {
		setInput(value);
	}, [value]);
	return (
		<Input {...props} value={input} onInputChange={onInputChange} />
	);
}

InputContainer.propTypes = {
	value: PropTypes.string,
	handleInputData: PropTypes.func,
	restrictInputChange: PropTypes.bool,
};

export default InputContainer;
