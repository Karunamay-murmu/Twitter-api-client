import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";


import App from "./App";
import Store from "redux/store";

import "./static/style/index.css";


ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Auth0Provider
				clientId={process.env.REACT_APP_AUTH0_ID}
				domain={process.env.REACT_APP_AUTH0_DOMAIN}
				redirectUri={window.location.origin}
				audience={process.env.REACT_APP_AUDIENCE}
				scope=""
			>
				<Provider store={Store}>
					<App />
				</Provider>
			</Auth0Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);