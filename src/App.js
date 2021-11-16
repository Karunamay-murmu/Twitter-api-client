import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "pages/Home/Home.jsx";
import ProfileFeedContainer from "core-ui/ProfileFeed/ProfileFeedContainer.jsx";
import HomeFeed from "core-ui/HomeFeed/HomeFeed.jsx";

import "./App.css";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />}>
					<Route index element={<HomeFeed />} />
					<Route path=":username" element={<ProfileFeedContainer />} />
				</Route>
				{/* <Route path="/:username" element={<ProfilePageContainer />} /> */}
			</Routes>
		</div>
	);
}

export default App;
