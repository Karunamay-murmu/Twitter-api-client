import React from "react";
import PropTypes from "prop-types";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

import InputBoxContainer from "components/InputBox/InputBoxContainer";
import Avatar from "components/Avatar/Avatar";

import styles from "./ProfileEditForm.module.css";

function ProfileEditForm(props) {
	return (
		<div className={styles.form__wrapper}>
			<form action="" className={styles.form} encType="multipart/form-data">
				<div className={styles.form__input__wrapper}>
					<InputBoxContainer
						label="cover_photo"
						tag="input"
						attributes={{
							"type": "file",
							"accept": "image/*",
							"name": "cover_photo",
							"aria-label": "cover photo",
						}}
						{...props}
					>
						<img className={styles.image_placeholder} id="id_cover_photo_placeholder" src="" alt="" srcSet="" />
						<CameraAltOutlinedIcon className={styles.image_picker} />
					</InputBoxContainer>
				</div>
				<div className={`${styles.form__input__wrapper} ${styles.form__input__wrapper__profile__photo}`}>
					<InputBoxContainer
						label="profile_photo"
						tag="input"
						attributes={{
							"type": "file",
							"accept": "image/*",
							"name": "profile_photo",
							"aria-label": "profile photo",
						}}
						{...props}
					>
						<Avatar image={props.profile_image} className={styles.image_placeholder} />
						<CameraAltOutlinedIcon className={styles.image_picker} />
					</InputBoxContainer>
				</div>
				<div className={styles.form__input__wrapper}>
					<InputBoxContainer
						label="name"
						tag="input"
						maxLength="50"
						attributes={{
							"type": "text",
							"name": "name",
							"aria-label": "name",
							"placeholder": " ",
							"required": true,
							"maxLength": "50"
						}}
						{...props}
					/>
				</div>
				<div className={styles.form__input__wrapper}>
					<InputBoxContainer
						label="bio"
						tag="textarea"
						maxLength="160"
						attributes={{
							"type": "text",
							"name": "bio",
							"aria-label": "bio",
							"placeholder": " ",
							"required": false,
							"maxLength": "160",
							"rows": "3"
						}}
						{...props}
					/>
				</div>
				<div className={styles.form__input__wrapper}>
					<InputBoxContainer
						label="location"
						tag="input"
						maxLength="30"
						attributes={{
							"type": "text",
							"name": "location",
							"aria-label": "location",
							"placeholder": " ",
							"required": false,
							"maxLength": "30",
						}}
						{...props}
					/>
				</div>
				<div className={styles.form__input__wrapper}>
					<InputBoxContainer
						label="website"
						tag="input"
						maxLength="30"
						attributes={{
							"type": "text",
							"name": "website",
							"aria-label": "website",
							"placeholder": " ",
							"required": false,
							"maxLength": "30",
						}}
						{...props}
					/>
				</div>
			</form >
		</div >
	);
}

ProfileEditForm.propTypes = {
	getInputDetails: PropTypes.func,
	error: PropTypes.object,
	inputLength: PropTypes.string,
	profile_image: PropTypes.string,
};

export default ProfileEditForm;
