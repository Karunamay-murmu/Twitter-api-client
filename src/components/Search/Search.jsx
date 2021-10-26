import React from "react";
import SearchIcon from "@mui/icons-material/Search";

import InputContainer from "components/Input/InputContainer";

import styles from "./Search.module.css";

function SearchContainer() {
	return (
		<div className={styles.searchbar}>
			<div className={styles.searchbar__wrapper}>
				<SearchIcon className={styles.searchbar__icon} />
				<InputContainer
					tag="input"
					attributes={{
						type: "text",
						name: "search",
						placeholder: "Search Twitter",
						"aria-label": "Search query",
						"aria-autocomplete": "list"
					}}
				/>
			</div>
		</div>
	);
}

export default SearchContainer;
