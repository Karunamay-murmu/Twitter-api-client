import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "pages/Home/Home.jsx";
import ProfilePageContainer from "pages/Profile/ProfilePageContainer.jsx";

import "./App.css";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/:username" element={<ProfilePageContainer />} />
			</Routes>
		</div>
	);
}

export default App;
