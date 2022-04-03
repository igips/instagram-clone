import favi from "../img/favicon.jpg";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";
import React, { useState } from "react";
import ava from "../img/ava.jpeg";
import { dropDown, hideDropDown, showSignUpModal } from "./Home";
import testPic from "../img/test-img.jpg";
import "../styles/Modals.css";
import { shareIcon, PictureCardHeader } from "./PictureCard";
import uniqid from "uniqid";
import { searchFunction, showSignInModal } from "./Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

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
	const signUpModal = document.getElementById("register-modal");

	window.addEventListener("click", (e) => {
		if (e.target === signUpModal) {
			signUpModal.style.display = "none";
			window.history.pushState("/", "Title", "/");
			clearSignUpInputs();
		}
	});

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
		const signUpModal = document.getElementById("register-modal");

		usernameAvailable().then((avail) => {
			if (avail) {
				createUserWithEmailAndPassword(getAuth(), email.value, pass.value)
					.then((userCredential) => {
						const user = userCredential.user;

						addDoc(collection(getFirestore(), "usernames"), {
							uid: user.uid,
							username: userName.value,
						});

						signUpModal.style.display = "none";
						window.history.pushState("/", "Title", "/");
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
						document.getElementById("register-modal").style.display = "none";
						window.history.pushState("/", "Title", "/");
						clearSignUpInputs();
					}}
					className="close-modal"
				>
					&times;
				</span>
				<img className="img-modal" src={favi} alt="" />
				<p>Sign Up</p>
				<form  onSubmit={(e) => signUp(e)} id="reg-form">
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
	const signInModal = document.getElementById("login-modal");

	window.addEventListener("click", (e) => {
		if (e.target === signInModal) {
			signInModal.style.display = "none";
			window.history.pushState("/", "Title", "/");
			clearSigInInputs();
		}
	});

	function clearSigInInputs() {
		document.getElementById("login-username-input").value = "";
		document.getElementById("login-password-input").value = "";
	}

	function signIn(e) {
		e.preventDefault();

		const email = document.getElementById("login-username-input");
		const pass = document.getElementById("login-password-input");
		const signInButton = document.getElementById("sign-in-submit-button");
		const loginModal = document.getElementById("login-modal");

		signInWithEmailAndPassword(getAuth(), email.value, pass.value)
			.then((userCredential) => {
				const user = userCredential.user;
				window.history.pushState("/", "Title", "/");
				loginModal.style.display = "none";
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
						document.getElementById("login-modal").style.display = "none";
						window.history.pushState("/", "Title", "/");
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

function UnfollowModal() {
	const unfollowModal = document.getElementById("unfollow-modal");

	window.addEventListener("click", (e) => {
		if (e.target === unfollowModal) {
			hideUnFollowModal();
		}
	});

	function hideUnFollowModal() {
		const modal = document.getElementById("unfollow-modal");
		window.history.pushState("/", "Title", "/");
		modal.style.display = "none";
	}

	return (
		<div id="unfollow-modal" className="modal">
			<div className="unfollow-modal-content">
				<span>Unfollow</span>
				<span onClick={() => hideUnFollowModal()}>Cancel</span>
			</div>
		</div>
	);
}

function LikesModal() {
	const likesModal = document.getElementById("likes-modal");

	window.addEventListener("click", (e) => {
		if (e.target === likesModal) {
			hideLikesModal();
		}
	});

	function hideLikesModal() {
		const modal = document.getElementById("likes-modal");
		window.history.pushState("/", "Title", "/");
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
	const commentsModal = document.getElementById("comments-modal");

	window.addEventListener("click", (e) => {
		if (e.target === commentsModal) {
			hideCommentsModal();
		}
	});

	function hideCommentsModal() {
		const modal = document.getElementById("comments-modal");
		const inputDiv = document.getElementById("comments-div-modal");
		window.history.pushState("/", "Title", "/");
		modal.style.display = "none";

		// if (inputDiv) {
		// 	modal.style.display = "none";
			
		// }
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
					<PictureCardHeader />
					<div id="comms-modal-header-mobile">
						{closeModal(hideCommentsModal)}
						<span>Comments</span>
						{shareIcon()}
					</div>
					<div id="modal-comments-section">
						<div id="modal-first-comment">
							<span
								onMouseEnter={(e) => dropDown(e, "avaPic")}
								onMouseLeave={() => hideDropDown()}
								className="avatar-span-comments"
							>
								<img
									id="comments-modal-description-avatar"
									alt=""
									className="card-avatar-img"
									data-testid="user-avatar"
									draggable="false"
									src={ava}
								/>
							</span>
							<div id="first-modal-comment-div" className="modal-comment-div">
								<div id="first-modal-comment-div-inner">
									<div className="name-span-modal" id="first-modal-comment-span">
										<span
											onMouseEnter={(e) => dropDown(e)}
											onMouseLeave={() => hideDropDown()}
											className="first-modal-comment-span"
											id="description-comments-modal-username"
										></span>{" "}
										<span id="description-comments-modal-desc"></span>
									</div>
									<div id="first-comment-when">
										<div
											id="short-when-added-and-likes-modal"
											className="short-when-added-and-likes"
										></div>
									</div>
								</div>
							</div>
						</div>
						<div id="container-for-comments-in-modal"></div>
					</div>
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
	const shareModal = document.getElementById("share-modal");
	const [shareModalSearchUser, setShareModalSearchUser] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [picked, setPicked] = useState([]);
	const [buttonDisabled, setButtonDisabled] = useState(true);

	window.addEventListener("click", (e) => {
		if (e.target === shareModal) {
			hideShareModal();
		}
	});

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
		window.history.pushState("/", "Title", "/");
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

function Modals() {
	return (
		<>
			<SignUpModal />
			<SignInModal />
			<UnfollowModal />
			<LikesModal />
			<CommentsModal />
			<ShareModal />
		</>
	);
}

export default Modals;
