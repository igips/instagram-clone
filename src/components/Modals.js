import favi from "../img/favicon.jpg";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import ava from "../img/ava.jpeg";
import { showSignUpModal } from "./Home";
import testPic from "../img/test-img.jpg";
import "../styles/Modals.css";
import { shareIcon } from "./PictureCard";
import uniqid from "uniqid";
import { followButtonForNoti, homeIcon, searchFunction, showSignInModal } from "./Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import ReactTimeAgo from "react-time-ago";

function closeModal(modal) {
	return (
		<svg
			onClick={() => modal()}
			id="close-likes-modal"
			aria-label="Close"
			color="#262626"
			fill="#262626"
			height="18"
			role="img"
			viewBox="0 0 24 24"
			width="18"
		>
			<polyline
				fill="none"
				points="20.643 3.357 12 12 3.353 20.647"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="3"
			></polyline>
			<line
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="3"
				x1="20.649"
				x2="3.354"
				y1="20.649"
				y2="3.354"
			></line>
		</svg>
	);
}

function SignUpModal() {
	useEffect(() => {
		const signUpModal = document.getElementById("register-modal");

		signUpModal.addEventListener("click", (e) => {
			if (e.target === signUpModal) {
				closeSignUpModal();
				clearSignUpInputs();
			}
		});
	}, []);

	function closeSignUpModal() {
		const signUpModal = document.getElementById("register-modal");
		// window.history.back();

		if (document.getElementById("comments-modal").style.display === "flex") {
			window.history.back();
		} else {
			window.history.pushState("/", "Title", "/");
		}
		signUpModal.style.display = "none";
	}

	function clearSignUpInputs() {
		document.getElementById("password-input").value = "";
		document.getElementById("email-input").value = "";
		document.getElementById("password-input-rep").value = "";
		document.getElementById("username-input").value = "";
	}

	function checkIfPasswordMatch() {
		const passwordInput = document.getElementById("password-input-rep");
		const passwordInput2 = document.getElementById("password-input");

		if (passwordInput.value !== passwordInput2.value) {
			passwordInput.setCustomValidity("Password Must be Matching.");
		} else {
			passwordInput.setCustomValidity("");
		}
	}

	async function usernameAvailable() {
		const userName = document.getElementById("username-input");
		const data = await getDocs(collection(getFirestore(), "usernames"));
		let check = true;

		data.forEach((doc) => {
			if (doc.data().username === userName.value) {
				check = false;
			}
		});

		return Boolean(check);
	}

	function signUp(e) {
		e.preventDefault();

		const email = document.getElementById("email-input");
		const pass = document.getElementById("password-input-rep");
		const userName = document.getElementById("username-input");
		const formSubmitButton = document.getElementById("submit-sign-up-form-button");

		usernameAvailable().then((avail) => {
			if (avail) {
				createUserWithEmailAndPassword(getAuth(), email.value, pass.value)
					.then((userCredential) => {
						const user = userCredential.user;

						addDoc(collection(getFirestore(), "usernames"), {
							uid: user.uid,
							username: userName.value,
							following: [],
							followers: [],
							posts: [],
							unReadNoti: 0,
							notifications: [],
						});

						closeSignUpModal();
						clearSignUpInputs();
					})
					.catch((error) => {
						if (error.code === "auth/email-already-in-use") {
							email.setCustomValidity("Email already used!");
							formSubmitButton.click();
						}
					});
			} else {
				userName.setCustomValidity("Username already taken!");
				formSubmitButton.click();
			}
		});
	}

	return (
		<div id="register-modal" className="modal">
			<div className="modal-content">
				<span
					onClick={() => {
						closeSignUpModal();
						clearSignUpInputs();
					}}
					className="close-modal"
				>
					&times;
				</span>
				<img className="img-modal" src={favi} alt="" />
				<p>Sign Up</p>
				<form onSubmit={(e) => signUp(e)} id="reg-form">
					<input
						maxLength="15"
						required
						id="username-input"
						className="input-modal"
						type="text"
						placeholder="Username"
						onInput={() => document.getElementById("username-input").setCustomValidity("")}
					/>
					<input
						required
						id="email-input"
						className="input-modal"
						type="email"
						placeholder="Email"
						onInput={() => document.getElementById("email-input").setCustomValidity("")}
					/>
					<input
						id="password-input"
						className="input-modal"
						placeholder="Password"
						required
						type="password"
						minLength="6"
						onInput={() => checkIfPasswordMatch()}
					/>
					<input
						id="password-input-rep"
						className="input-modal"
						placeholder="Repeat Password"
						required
						minLength="6"
						type="password"
						onInput={() => checkIfPasswordMatch()}
					/>
					<button id="submit-sign-up-form-button" className="modal-button">
						Sign Up
					</button>
				</form>
				<p
					onClick={() => {
						document.getElementById("register-modal").style.display = "none";
						showSignInModal();
						clearSignUpInputs();
					}}
					id="already-sign-ip"
				>
					Already signed up? Sign In
				</p>
			</div>
		</div>
	);
}

function SignInModal() {
	useEffect(() => {
		const signInModal = document.getElementById("login-modal");

		signInModal.addEventListener("click", (e) => {
			if (e.target === signInModal) {
				closeSignInModal();
				clearSigInInputs();
			}
		});
	}, []);

	function closeSignInModal() {
		const signInModal = document.getElementById("login-modal");
		// window.history.back();

		if (document.getElementById("comments-modal").style.display === "flex") {
			window.history.back();
		} else {
			window.history.pushState("/", "Title", "/");
		}

		signInModal.style.display = "none";
	}

	function clearSigInInputs() {
		document.getElementById("login-username-input").value = "";
		document.getElementById("login-password-input").value = "";
	}

	function signIn(e) {
		e.preventDefault();

		const email = document.getElementById("login-username-input");
		const pass = document.getElementById("login-password-input");
		const signInButton = document.getElementById("sign-in-submit-button");

		signInWithEmailAndPassword(getAuth(), email.value, pass.value)
			.then((userCredential) => {
				const user = userCredential.user;
				closeSignInModal();
				clearSigInInputs();
			})
			.catch((error) => {
				if (error.code === "auth/user-not-found") {
					email.setCustomValidity("User not found!");
					signInButton.click();
				} else if (error.code === "auth/wrong-password") {
					pass.setCustomValidity("Wrong password!");
					signInButton.click();
				}
			});
	}

	return (
		<div id="login-modal" className="modal">
			<div className="modal-content">
				<span
					onClick={() => {
						closeSignInModal();
						clearSigInInputs();
					}}
					className="close-modal"
				>
					&times;
				</span>
				<img className="img-modal" src={favi} alt="" />
				<p>Sign In</p>
				<form onSubmit={(e) => signIn(e)} id="login-form">
					<input
						maxLength="15"
						required
						id="login-username-input"
						className="input-modal"
						type="email"
						placeholder="Email"
						onInput={() => document.getElementById("login-username-input").setCustomValidity("")}
					/>
					<input
						minLength="6"
						id="login-password-input"
						className="input-modal"
						placeholder="Password"
						required
						type="password"
						onInput={() => document.getElementById("login-password-input").setCustomValidity("")}
					/>
					<button id="sign-in-submit-button" className="modal-button">
						Sign In
					</button>
				</form>
				<p
					onClick={() => {
						document.getElementById("login-modal").style.display = "none";
						showSignUpModal();
						clearSigInInputs();
					}}
					id="already-login-ip"
				>
					Already have an account? Sign Up
				</p>
			</div>
		</div>
	);
}

function hideUnFollowModal() {
	const modal = document.getElementById("unfollow-modal");
	window.history.back();
	modal.style.display = "none";
}

function UnfollowModal() {
	useEffect(() => {
		const unfollowModal = document.getElementById("unfollow-modal");

		unfollowModal.addEventListener("click", (e) => {
			if (e.target === unfollowModal) {
				hideUnFollowModal();
			}
		});
	}, []);

	return (
		<div id="unfollow-modal" className="modal">
			<div id="unfollow-modal-content" className="unfollow-modal-content">
				{/* <span>Unfollow</span>
				<span onClick={() => hideUnFollowModal()}>Cancel</span> */}
			</div>
		</div>
	);
}

function LikesModal() {
	useEffect(() => {
		const likesModal = document.getElementById("likes-modal");

		likesModal.addEventListener("click", (e) => {
			if (e.target === likesModal) {
				hideLikesModal();
			}
		});
	}, []);

	function hideLikesModal() {
		const modal = document.getElementById("likes-modal");
		window.history.back();
		modal.style.display = "none";
	}

	return (
		<div id="likes-modal" className="modal">
			<div className="likes-modal-content">
				<div id="likes-modal-header">
					<span>Likes</span>
					{closeModal(hideLikesModal)}
				</div>
				<div id="list-of-likes-div">
					<div id="list-of-likes-div-inner"></div>
				</div>
			</div>
		</div>
	);
}

function CommentsModal() {
	useEffect(() => {
		const commentsModal = document.getElementById("comments-modal");

		commentsModal.addEventListener("click", (e) => {
			if (e.target === commentsModal) {
				hideCommentsModal();
			}
		});
	}, []);

	function hideCommentsModal() {
		const modal = document.getElementById("comments-modal");
		window.history.back();
		modal.style.display = "none";
	}

	return (
		<div id="comments-modal" className="modal">
			<div onClick={() => hideCommentsModal()} id="comments-modal-close">
				<svg
					aria-label="Close"
					color="#ffffff"
					fill="#ffffff"
					height="24"
					role="img"
					viewBox="0 0 24 24"
					width="24"
				>
					<polyline
						fill="none"
						points="20.643 3.357 12 12 3.353 20.647"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="3"
					></polyline>
					<line
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="3"
						x1="20.649"
						x2="3.354"
						y1="20.649"
						y2="3.354"
					></line>
				</svg>
			</div>
			<div id="comments-modal-content">
				<div id="comments-div-img">
					<img src={testPic} alt="" />
				</div>
				<div id="comments-div-modal">
					<div id="comms-modal-header-mobile">
						{closeModal(hideCommentsModal)}
						<span>Comments</span>
						{shareIcon()}
					</div>
					<div id="comments-modal-header-section"></div>
					<div id="modal-comments-section"></div>
					<section id="icons-in-comments-section-modal" className="icons-in-comments-section"></section>
					<section id="number-of-likes-section-modal" className="number-of-likes-section"></section>
					<div id="when-added-div-modal" className="added-div"></div>
					<div id="div-for-comment-section-in-comment-modal"></div>
				</div>
			</div>
		</div>
	);
}

function ShareModal() {
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
									<svg
										aria-label="Delete Item"
										color="#0095f6"
										fill="#0095f6"
										height="12"
										role="img"
										viewBox="0 0 24 24"
										width="12"
									>
										<polyline
											fill="none"
											points="20.643 3.357 12 12 3.353 20.647"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="3"
										></polyline>
										<line
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="3"
											x1="20.649"
											x2="3.354"
											y1="20.649"
											y2="3.354"
										></line>
									</svg>
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
						return (
							<div
								onClick={(e) => checkBoxOnClick(e)}
								key={uniqid()}
								className="share-modal-single-result"
							>
								<img src={ava} alt="" />
								<span>{result}</span>
								<div className="div-for-checkbox-button">
									<svg
										aria-label="Toggle selection"
										color="#262626"
										fill="#262626"
										height="24"
										role="img"
										viewBox="0 0 24 24"
										width="24"
									>
										<circle
											cx="12.008"
											cy="12"
											fill="none"
											r="11.25"
											stroke="currentColor"
											strokeLinejoin="round"
											strokeWidth="1.5"
										></circle>
									</svg>
								</div>
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

function SearchModal() {
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
						<div key={uniqid()} className="share-modal-single-result">
							<img src={ava} alt="" />
							<span>{result}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}

function NotificationModal(props) {

	
	useEffect(() => {
		if (props.notifications.length === 0) {
			document.getElementById("no-notifications-modal").style.display = "flex";
		} else {
			document.getElementById("no-notifications-modal").style.display = "none";
		}
	}, [props.notifications]);



	function hideNotificationsModal() {
		const modal = document.getElementById("notification-modal-container");
		modal.style.display = "none";
		window.history.back();
	}

	return (
		<div id="notification-modal-container">
			<div id="notification-modal-header">
				<span>Notifications</span>
				{closeModal(hideNotificationsModal)}
			</div>
			<div id="notifications-modal-noti">
				<div id="no-notifications-modal">No notifications</div>
				{props.notifications
					.slice(0)
					.reverse()
					.map((result) => {
						return (
							<div key={uniqid()} className="noti-modal-single-result-mobile">
								<img src={ava} alt="" />
								<div><span className="noti-mobile-user-span">{result.username + " "}</span>{result.content + " "}<span className="noti-date-mobile">
									<ReactTimeAgo
										timeStyle="mini-minute-now"
										date={new Date(result.date)}
										locale="en-US"
									/>
								</span></div>
								{followButtonForNoti(result.username, props.following, props.username, props.follow, props.unFollow)}
							</div>
						);
					})}
			</div>
		</div>
	);
}

function Modals(props) {
	return (
		<>
			<SearchModal />
			<SignUpModal />
			<SignInModal />
			<UnfollowModal />
			<LikesModal />
			<CommentsModal />
			<ShareModal />
			<NotificationModal notifications={props.notifications} following={props.following} username={props.username} follow={props.follow} unFollow={props.unFollow} />
		</>
	);
}

export default Modals;
export { hideUnFollowModal };
