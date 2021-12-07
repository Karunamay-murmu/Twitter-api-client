import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import Button from "components/Button/Button";

import styles from "./Modal.module.css";

function Modal({ children, title = "MODAL_TITLE", btnText = "BUTTON_TEXT", closeModal, emptyHeaderText=false, emptyHeaderBtn=false }) {
	return ReactDOM.createPortal(
		<div className={styles.modal}>
			<div className={styles.modal__wrapper}>
				<div className={styles.modal__header}>
					<div className={styles.modal__close__wrapper} onClick={closeModal}>
						<CloseRoundedIcon className={styles.modal__close__icon} />
					</div>
					{!emptyHeaderText &&
						<div className={styles.modal__title__wrapper}>
							<span className={styles.modal__title__text}>
								{title}
							</span>
						</div>
					}
					{!emptyHeaderBtn &&
						<div className={styles.modal__btn__wrapper}>
							<Button className={styles.modal__btn}>
								{btnText}
							</Button>
						</div>
					}

				</div>
				<div className={styles.modal__body}>{children}</div>
			</div>
		</div>,
		document.getElementById("modal")
	);
}

Modal.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string,
	btnText: PropTypes.string,
	closeModal: PropTypes.func.isRequired,
	emptyHeaderText: PropTypes.bool,
	emptyHeaderBtn: PropTypes.bool

};

export default Modal;
