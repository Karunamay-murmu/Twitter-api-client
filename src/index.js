import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import Store from "redux/store";

import "./static/style/index.css";


ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={Store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);