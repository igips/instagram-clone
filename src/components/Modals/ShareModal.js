import { CheckBoxIcon } from "../Icons/CheckBoxIcon";
import ava from "../../img/ava.jpeg";
import uniqid from "uniqid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getUsers, searchFunction } from "../..";
import { closeModal } from "../Modals";
import { DeleteIcon } from "../Icons/DeleteIcon";
import { getUserDataFromUsersArray } from "../Home";
import { arrayRemove, arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import { getDocId } from "../../index";
import { useSelector } from "react-redux";

function ShareModal(props) {
	const [shareModalSearchUser, setShareModalSearchUser] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [picked, setPicked] = useState([]);
	const [buttonDisabled, setButtonDisabled] = useState(true);

	const yourUsername = useSelector((state) => state.user.username);
	const firestoreDocId = useSelector((state) => state.user.firestoreDocId);
	const users = useSelector((state) => state.usersAndPosts.users);

	
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
		setButtonDisabled(true);
		document.getElementById("share-modal-text-input-message").value = "";
		document.getElementById("share-to-modal-search-results").classList.remove("results-active");
		document.getElementById("share-modal-text-input-message").style.display = "none";
	}

	function sendMessage() {
		const messageValue = document.getElementById("share-modal-text-input-message").value;

		picked.forEach(async (pick) => {
			const users = await getUsers();
			const user = getUserDataFromUsersArray(users, pick);
			let found = false;
			const db = getFirestore();

			for (let m of user.messages) {
				if (m.username === pick || m.username2 === pick) {
					// eslint-disable-next-line no-loop-func
					await getDocId(pick).then(async (id) => {
						await updateDoc(doc(db, "usernames", id), { messages: arrayRemove(m) });
						await updateDoc(doc(db, "usernames", firestoreDocId), { messages: arrayRemove(m) });

						m.conversation.push({
							date: Date.now(),
							username: yourUsername,
							text: messageValue,
						});
						m.date = Date.now();

						await updateDoc(doc(db, "usernames", id), {unReadMessages: arrayUnion(yourUsername), messages: arrayUnion(m) });
						await updateDoc(doc(db, "usernames", firestoreDocId), {
							messages: arrayUnion(m),
						});
					});
					found = true;
					break;
				}
			}

			if (!found) {
				const docID = await getDocId(pick);
				const date = Date.now();

				await updateDoc(doc(db, "usernames", docID), {
					unReadMessages: arrayUnion(yourUsername),
					messages: arrayUnion({
						conversation: [
							{
								date: date,
								username: yourUsername,
								text: messageValue,
							},
						],
						date: date,
						username: pick,
						username2: yourUsername,
					}),
				});

				const user = getUserDataFromUsersArray(users, yourUsername);

				let found2 = false;

				for (let m of user.messages) {
					if (m.username === pick || m.username2 === pick) {
						await updateDoc(doc(db, "usernames", firestoreDocId), { messages: arrayRemove(m) });

						m.conversation.push({
							date: date,
							username: yourUsername,
							text: messageValue,
						});
						m.date = date;

						await updateDoc(doc(db, "usernames", firestoreDocId), {
							messages: arrayUnion(m),
						});
						found2 = true;
						break;
					}
				}

				if (!found2) {
					await updateDoc(doc(db, "usernames", firestoreDocId), {
						messages: arrayUnion({
							conversation: [
								{
									date: date,
									username: yourUsername,
									text: messageValue,
								},
							],
							date: date,
							username: pick,
							username2: yourUsername,
						}),
					});
				}
			}
		});
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
					<span>New Message</span>
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
						const userData = getUserDataFromUsersArray(users, result);
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
					<button
						onClick={() => {
							sendMessage();
							hideShareModal();
						}}
						id="send-share-button"
						disabled={buttonDisabled}
					>
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
