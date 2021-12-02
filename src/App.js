import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "pages/Home/Home.jsx";
import ProfileFeedContainer from "core-ui/ProfileFeed/ProfileFeedContainer.jsx";
import TweetDetailContainer from "core-ui/TweetDetail/TweetDetailContainer";
import HomeFeed from "core-ui/HomeFeed/HomeFeed.jsx";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />}>
					<Route index element={<HomeFeed />} />
					<Route path=":username" element={<ProfileFeedContainer />} />
					<Route path=":username/status/:tweetId" element={<TweetDetailContainer />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
