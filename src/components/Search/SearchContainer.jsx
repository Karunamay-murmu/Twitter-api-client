import React, { useCallback } from "react";

import Search from "components/Search/Search.jsx";
import useFetch from "hooks/useFetch";


function SearchContainer() {
	const [showSuggestion, setShowSuggestion] = React.useState(false);
	const [, doFetch] = useFetch();

	const onInputFocusIn = () => setShowSuggestion(true);
	const onInputFocusOut = () => setShowSuggestion(false);
	// TODO: memoize the handlers

	const handleInputData = useCallback(() => {

	});

	const handleSubmitSearchQuery = useCallback((e) => {
		e.preventDefault();
		const query = e.target.search.value;
		doFetch("user_by_username", query);
	});

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
