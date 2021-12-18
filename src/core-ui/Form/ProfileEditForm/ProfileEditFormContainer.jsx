import React from "react";

import ProfileEditForm from "core-ui/Form/ProfileEditForm/ProfileEditForm";

function ProfileEditFormContainer(props) {
	// const errorObj = {
	// 	hasError: false,
	// 	message: "",
	// 	name: null,
	// 	id: null,
	// 	type: ""
	// };
	// const [error, setError] = useState(errorObj);
	// // const [inputLength, setInputLength] = useState(0);

	// const handleInputError = (error) => {
	// 	setError(error);
	// };

	return (
		<ProfileEditForm {...props} />
	);
}

export default ProfileEditFormContainer;
