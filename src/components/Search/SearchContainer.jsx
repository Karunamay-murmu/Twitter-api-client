import React, { useState, useCallback } from "react";

import Search from "components/Search/Search.jsx";


function SearchContainer() {
	const [showSuggestion, setShowSuggestion] = useState(false);
	const [query, setQuery] = useState("");

	const onInputFocusIn = () => setShowSuggestion(true);
	const onInputFocusOut = () => setShowSuggestion(false);

	const handleInputData = useCallback((e) => {
		setQuery(e.target.value);
	});

	const handleSubmitSearchQuery = useCallback((e) => {
		e.preventDefault();
	});

	return (
		<Search
			showSuggestion={showSuggestion}
			onInputFocusIn={onInputFocusIn}
			onInputFocusOut={onInputFocusOut}
			handleInputData={handleInputData}
			handleSubmitSearchQuery={handleSubmitSearchQuery}
			query={query}
		/>
	);
}

export default SearchContainer;
