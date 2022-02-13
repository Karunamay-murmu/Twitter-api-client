import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";


import App from "./App";
// import ModalContainer from "components/Modal/Modal";
import Store from "redux/store";

import "./static/style/index.css";


console.log(process.env.REACT_APP_AUTH0_DOMAIN);

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Auth0Provider clientId={process.env.REACT_APP_AUTH0_ID} domain={process.env.REACT_APP_AUTH0_DOMAIN} redirectUri={window.location.origin}>
				<Provider store={Store}>
					<App />
					{/* <ModalContainer /> */}
				</Provider>
			</Auth0Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);