import { CheckBoxIcon } from "../Icons/CheckBoxIcon";
import ava from "../../img/ava.jpeg";
import uniqid from "uniqid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { searchFunction } from "../..";
import { closeModal } from "../Modals";
import { DeleteIcon } from "../Icons/DeleteIcon";
import { getUserDataFromUsersArray } from "../Home";

function ShareModal(props) {
	const [shareModalSearchUser, setShareModalSearchUser] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [picked, setPicked] = useState([]);
	const [buttonDisabled, setButtonDisabled] = useState(true);

	useEffect(() => {
		const shareModal = document.getElementById("share-modal");

		shareModal.addEventListener("click", (e) => {
			if (e.target === shareModal) {
				hideShareModal();
			}
		});
	}, []);

	function handleShareSearchUser(e) {
		const div = document.getElementById("share-to-modal-search-results");
		const notFound = document.getElementById("not-found-share-modal");
		const spinner = document.getElementById("spinner-share-modal");
		const smallSpinner = document.getElementById("small-spinner-share-modal");

		setShareModalSearchUser(e.target.value);

		if (e.target.value !== "") {
			if (searchResults.length === 0 && notFound.style.display === "none") {
				spinner.style.display = "flex";
			}

			smallSpinner.style.display = "flex";

			searchFunction(e.target.value).then((result) => {
				smallSpinner.style.display = "none";
				spinner.style.display = "none";

				const newResult = result.filter((res) => {
					if (!picked.includes(res)) {
						return res;
					}
				});

				setSearchResults(newResult);

				newResult.length === 0 && e.target.value !== ""
					? (notFound.style.display = "flex")
					: (notFound.style.display = "none");
			});
		}

		if (e.target.value !== "" && !div.classList.contains("results-active")) {
			div.classList.add("results-active");
		} else if (e.target.value === "") {
			div.classList.remove("results-active");
			notFound.style.display = "none";
			setSearchResults([]);
		}
	}

	function cleanInputsShareModal() {
		setShareModalSearchUser("");
		setSearchResults([]);
		setPicked([]);
		document.getElementById("share-modal-text-input-message").value = "";
		document.getElementById("send-share-button").disabled = "true";
		document.getElementById("share-to-modal-search-results").classList.remove("results-active");
		document.getElementById("share-modal-text-input-message").style.display = "none";
	}

	function hideShareModal() {
		const modal = document.getElementById("share-modal");
		modal.style.display = "none";
		window.history.back();
		cleanInputsShareModal();
	}

	function removeFromPicked(e) {
		const messageInput = document.getElementById("share-modal-text-input-message");
		const username = e.currentTarget.textContent;

		setPicked((oldPicked) => {
			const newPicked = oldPicked.filter((pick) => pick !== username);

			if (newPicked.length === 0) {
				setButtonDisabled(true);
				messageInput.style.display = "none";
			}

			return newPicked;
		});
	}

	function checkBoxOnClick(e) {
		const div = e.currentTarget;
		const divForSearchResults = document.getElementById("share-to-modal-search-results");
		const messageInput = document.getElementById("share-modal-text-input-message");

		setShareModalSearchUser("");

		setPicked([...picked, div.childNodes[1].textContent]);

		divForSearchResults.classList.remove("results-active");
		setButtonDisabled(false);
		messageInput.style.display = "block";
		setSearchResults([]);
	}

	return (
		<div id="share-modal" className="modal">
			<div id="share-modal-content">
				<div id="share-modal-header">
					<span>Share</span>
					{closeModal(hideShareModal)}
				</div>
				<div id="share-to-modal">
					<span>To:</span>
					<div id="sending-to-div-for-picked">
						{picked.map((name) => {
							return (
								<button key={uniqid()} onClick={(e) => removeFromPicked(e)} className="picked-button">
									{name}
									{DeleteIcon()}
								</button>
							);
						})}
					</div>
					<input
						autoComplete="off"
						onChange={(e) => handleShareSearchUser(e)}
						value={shareModalSearchUser}
						type="text"
						id="share-modal-text-input-search"
						className="share-modal-text-input"
						placeholder="Search..."
					/>
					<div id="small-spinner-share-modal" style={{ display: "none" }}>
						<FontAwesomeIcon icon={faSpinner} className="fa-spin" />
					</div>
				</div>
				<div id="share-to-modal-search-results" className="share-to-modal-search-results">
					<div style={{ display: "none" }} id="not-found-share-modal">
						No results found
					</div>
					<div id="spinner-share-modal">
						<FontAwesomeIcon icon={faSpinner} className="fa-spin" />
					</div>
					{searchResults.map((result) => {
						const userData = getUserDataFromUsersArray(props.users, result);
						return (
							<div
								onClick={(e) => checkBoxOnClick(e)}
								key={uniqid()}
								className="share-modal-single-result"
							>
								<img src={userData.avatar ? userData.avatar : ava} alt="" />
								<span>{result}</span>
								<div className="div-for-checkbox-button">{CheckBoxIcon()}</div>
							</div>
						);
					})}
				</div>
				<div id="send-button-div">
					<input
						autoComplete="off"
						type="text"
						id="share-modal-text-input-message"
						className="share-modal-text-input"
						placeholder="Write a message..."
					/>
					<button onClick={() => hideShareModal()} id="send-share-button" disabled={buttonDisabled}>
						Send
					</button>
				</div>
			</div>
		</div>
	);
}

function showShareModal() {
	const modal = document.getElementById("share-modal");
	if (!window.location.href.includes("shareM")) {
		window.history.pushState("shareM", "Title", "shareM");
	}

	modal.style.display = "flex";
}

export default ShareModal;
export { showShareModal };
