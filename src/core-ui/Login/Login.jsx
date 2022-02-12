import React from "react";
import PropTypes from "prop-types";
import TwitterIcon from "@mui/icons-material/Twitter";

// import background from "assets/images/lohp_en_1302x955.png";
import Button from "components/Button/Button";

import styles from "./Login.module.css";

function Login({ onLogin }) {
	return (
		<main className={styles.wrapper}>
			<div className={styles.wrapper__image__container}>
				<TwitterIcon className={styles.wrapper__image__icon} />
			</div>
			<div className={styles.wrapper__right}>
				<div>
					<TwitterIcon className={styles.wrapper__right__icon} />
				</div>
				<div className={styles.wrapper__text__container}>
					<h1 className={styles.wrapper__text__h1}>Happening now</h1>
					<p className={styles.wrapper__text__p}>Join Twitter today.</p>
					<div className={styles.wrapper__login__button}>
						<Button onClick={onLogin}>
							<TwitterIcon className={styles.wrapper__login__button__icon} />
							Sign in with Twitter
						</Button>
					</div>
				</div>
			</div>
		</main>
	);
}

Login.propTypes = {
	onLogin: PropTypes.func.isRequired,
};

export default Login;