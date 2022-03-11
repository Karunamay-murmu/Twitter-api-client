import React from "react";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

import InputContainer from "components/Input/InputContainer";

import styles from "./Search.module.css";

function Search({ showSuggestion, handleSubmitSearchQuery, query, ...props }) {
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
				<div className={styles.search__suggestion__list}>
					{
						query ?
							<>
								<div className={styles.search__suggestion__list__item}>Search for &#34;{query}&#34;</div>
								<Link to={`/${query}`} className={styles.search__suggestion__list__item}>Go to @{query}</Link>
							</>

							:
							<div className={styles.search__suggestion__list__item}>Try searching for people, topics or keywords</div>
					}
				</div>
			</div>}
		</div>
	);
}

Search.propTypes = {
	showSuggestion: PropTypes.bool,
	handleSubmitSearchQuery: PropTypes.func,
	query: PropTypes.string,
	queryChanging: PropTypes.bool
};

export default Search;
