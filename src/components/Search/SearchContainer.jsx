import React from "react";

import Search from "components/Search/Search.jsx";
import useFetch from "hooks/useFetch";


function SearchContainer() {
	const [showSuggestion, setShowSuggestion] = React.useState(false);
	// const [searchQuery, setSearchQuery] = React.useState("");
	const [, doFetch] = useFetch("user_by_username");

	const onInputFocusIn = () => setShowSuggestion(true);
	const onInputFocusOut = () => setShowSuggestion(false);

	const handleInputData = () => {
		// fetch search results real time
		console.log("searching...");
	};

	const handleSubmitSearchQuery = (e) => {
		// submit search query
		console.log("submit search query");
		e.preventDefault();
		const query = e.target.search.value;
		doFetch(query);
		// setSearchQuery(query);
	};

	console.log("call");



	return (
		<Search
			showSuggestion={showSuggestion}
			onInputFocusIn={onInputFocusIn}
			onInputFocusOut={onInputFocusOut}
			handleInputData={handleInputData}
			handleSubmitSearchQuery={handleSubmitSearchQuery}
		/>
	);
}

export default SearchContainer;
