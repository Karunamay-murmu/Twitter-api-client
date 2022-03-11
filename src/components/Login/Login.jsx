import React from "react";
import PropTypes from "prop-types";
import TwitterIcon from "@mui/icons-material/Twitter";

import Spinner from "components/Spinner/Spinner";
import Button from "components/Button/Button";

import styles from "./Login.module.css";

function Login({ onLogin, status, isAuthenticated, oauth_token, oauth_verifier }) {
	return (
		<main className={styles.wrapper}>
			{
				(!isAuthenticated && oauth_token && oauth_verifier) ?
					<Spinner message="Authenticating..." /> :
					<>
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
										{status === "loading" ?
											<Spinner hideMessage />
											:
											<>
												<TwitterIcon className={styles.wrapper__login__button__icon} />
												Sign in with Twitter
											</>
										}
									</Button>
								</div>
							</div>
						</div>
					</>
			}
		</main>
	);
}

Login.propTypes = {
	onLogin: PropTypes.func.isRequired,
	status: PropTypes.string.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	oauth_token: PropTypes.string,
	oauth_verifier: PropTypes.string,
};

export default Login;