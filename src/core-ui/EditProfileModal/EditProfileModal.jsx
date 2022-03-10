import React from "react";

import ModalContainer from "components/Modal/ModalContainer";
import ProfileEditFormContainer from "core-ui/Form/ProfileEditForm/ProfileEditFormContainer";

import styles from "./EditProfileModal.module.css";

function EditProfileModal() {
	return (
		<ModalContainer className={styles.modal} title="Edit Profile" btnText="Save" >
			<ProfileEditFormContainer />
		</ModalContainer>
	);
}

export default EditProfileModal;
