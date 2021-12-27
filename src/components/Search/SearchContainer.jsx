import React, { useCallback } from "react";

import Search from "components/Search/Search.jsx";
import useFetch from "hooks/useFetch";


function SearchContainer() {
	const [showSuggestion, setShowSuggestion] = React.useState(false);
	const [query, setQuery] = React.useState("");
	const [, doFetch] = useFetch();

	const onInputFocusIn = () => setShowSuggestion(true);
	const onInputFocusOut = () => setShowSuggestion(false);
	// TODO: memoize the handlers

	const handleInputData = useCallback((e) => {
		setQuery(e.target.value);
	});

	const handleSubmitSearchQuery = useCallback((e) => {
		e.preventDefault();
		const query = e.target.search.value;
		doFetch("user_by_username", query);
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
