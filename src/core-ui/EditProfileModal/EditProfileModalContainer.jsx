import React from "react";

import EditProfileModal from "core-ui/EditProfileModal/EditProfileModal";
import withModal from "hoc/withModal";

function EditProfileModalContainer(props) {
	return (
		<EditProfileModal {...props} />
	);
}


export default withModal(EditProfileModalContainer);
