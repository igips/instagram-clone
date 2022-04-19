import ava from "../../img/ava.jpeg";
import uniqid from "uniqid";
import { useState } from "react";
import { searchFunction } from "../..";
import { closeModal } from "../Modals";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { homeIcon } from "../Icons/HomeIcon";


function SearchModal(props) {
	const [searchValue, setSearchValue] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	function hideSearchModal() {
		const modal = document.getElementById("search-modal-container");
		modal.style.display = "none";
		window.history.back();
		cancelSearch();
	}

	function handleSearch(e) {
		const notFound = document.getElementById("not-found-modal");
		const spinner = document.getElementById("spinner-modal");
		const smallSpinner = document.getElementById("small-spinner-modal");
		const closeSearch = document.getElementById("close-search-result-div-modal");

		function hideSearchResultDiv() {
			setSearchResults([]);
			notFound.style.display = "none";
			closeSearch.style.display = "none";
		}

		setSearchValue(e.target.value);

		if (e.target.value !== "") {
			if (searchResults.length === 0 && notFound.style.display === "none") {
				spinner.style.display = "flex";
			}

			closeSearch.style.display = "none";
			smallSpinner.style.display = "flex";

			searchFunction(e.target.value).then((result) => {
				smallSpinner.style.display = "none";
				spinner.style.display = "none";

				setSearchResults(result);

				result.length === 0 && e.target.value !== ""
					? (notFound.style.display = "flex")
					: (notFound.style.display = "none");

				closeSearch.style.display = "flex";
			});
		} else if (e.target.value === "") {
			hideSearchResultDiv();
		}
	}

	function cancelSearch() {
		setSearchResults([]);
		setSearchValue("");
		document.getElementById("not-found-modal").style.display = "none";
		document.getElementById("close-search-result-div-modal").style.display = "none";
	}

	return (
		<div id="search-modal-container">
			<div id="search-modal-header">
				<span>Search</span>
				{closeModal(hideSearchModal)}
			</div>
			<div id="search-div-modal-input-div">
				<input
					value={searchValue}
					onChange={(e) => handleSearch(e)}
					autoComplete="off"
					id="search-input-modal"
					className="search-input"
					type="text"
					placeholder="Search"
				/>
				<div onClick={() => cancelSearch()} id="close-search-result-div-modal" style={{ display: "none" }}>
					<FontAwesomeIcon icon={faCircleXmark} />
				</div>
				<div id="small-spinner-modal" style={{ display: "none" }}>
					<FontAwesomeIcon icon={faSpinner} className="fa-spin" />
				</div>
			</div>
			<div id="search-results-div-modal">
				<div id="spinner-modal">
					<FontAwesomeIcon icon={faSpinner} className="fa-spin" />
				</div>
				<div style={{ display: "none" }} id="not-found-modal">
					No results found
				</div>
				{searchResults.map((result) => {
					return (
						<Link
							key={uniqid()} 
							onClick={() => {
								window.history.pushState("/", "Title", "/");
								document.getElementById("search-modal-container").style.display = "none";
								cancelSearch();
								if(result !== props.yourUsername) {
									homeIcon();
								}
							}}
							to={`/profile/${result}`}
						>
							<div className="share-modal-single-result">
								<img src={ava} alt="" />
								<span>{result}</span>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}

export default SearchModal;
