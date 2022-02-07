import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
// import ModalContainer from "components/Modal/Modal";
import Store from "redux/store";

import "./static/style/index.css";


ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={Store}>
				<App />
				{/* <ModalContainer /> */}
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);