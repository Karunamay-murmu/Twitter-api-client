import React from "react";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";

import InputContainer from "components/Input/InputContainer";
// import OptionCardContainer from "components/OptionCard/OptionCardContainer";

import styles from "./Search.module.css";

function Search({ showSuggestion, handleSubmitSearchQuery, ...props }) {
	return (
		<div className={styles.search}>
			<div className={styles.search__bar}>
				<form action="" method="GET" onSubmit={handleSubmitSearchQuery} className={styles.search__bar__wrapper}>
					<SearchIcon className={styles.search__bar__icon} />
					<InputContainer
						tag="input"
						attributes={{
							type: "text",
							name: "search",
							placeholder: "Search Twitter",
							"aria-label": "Search query",
							"aria-autocomplete": "list"
						}}
						{...props}
					/>
				</form>
			</div>
			{showSuggestion && <div className={styles.search__suggestion}>
				<span>Try searching for people, topics or keywords</span>
			</div>}
		</div>
	);
}

Search.propTypes = {
	showSuggestion: PropTypes.bool,
	handleSubmitSearchQuery: PropTypes.func,
};

export default Search;
