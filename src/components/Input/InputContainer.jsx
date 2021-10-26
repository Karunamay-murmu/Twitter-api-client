import React, { useState } from "react";

import Input from "components/Input/Input.jsx";

function InputContainer(props) {
	const [input, setInput] = useState("");
	const onInputChange = (e) => {
		setInput(e.target.value);
	};
	return (
		<Input {...props} value={input} onInputChange={onInputChange} />
	);
}

export default InputContainer;
