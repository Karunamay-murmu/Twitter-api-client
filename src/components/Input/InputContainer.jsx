import React, { useState } from "react";
import PropTypes from "prop-types";

import Input from "components/Input/Input.jsx";

function InputContainer({ handleInputData, value, restrictInputChange, ...props }) {
	const [input, setInput] = useState(value);
	const onInputChange = (e) => {
		if (!restrictInputChange) {
			setInput(e.target.value);
			handleInputData(e);
		}
	};
	return (
		<Input {...props} value={input} onInputChange={onInputChange} />
	);
}

InputContainer.propTypes = {
	value: PropTypes.string,
	handleInputData: PropTypes.func,
	restrictInputChange: PropTypes.bool,
};

InputContainer.defaultProps = {
	value: "",
	restrictInputChange: false
};

export default InputContainer;
