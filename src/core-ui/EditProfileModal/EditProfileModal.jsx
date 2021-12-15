import React from "react";

import withModal from "hoc/withModal";
import ModalContainer from "components/Modal/ModalContainer";

function EditProfileModal() {
	return (
		<ModalContainer title="Edit Profile" btnText="Save" >
			Edit
		</ModalContainer>
	);
}

export default withModal(EditProfileModal);
