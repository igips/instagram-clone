import favi from "../img/favicon.jpg";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import ava from "../img/ava.jpeg";
import { dropDown, hideDropDown, followMobile } from "./Home";
import testPic from "../img/test-img.jpg";

function Modal() {
	const [signedIn, setSignedIn] = useState(false);

	onAuthStateChanged(getAuth(), (user) => {
		if (user) {
			setSignedIn(true);
		} else {
			setSignedIn(false);
		}
	});

	useEffect(() => {
		const signInModal = document.getElementById("login-modal");
		const registerModal = document.getElementById("register-modal");
		const unfollowModal = document.getElementById("unfollow-modal");
		const likesModal = document.getElementById("likes-modal");
		const commentsModal = document.getElementById("comments-modal");
		

		window.onclick = (e) => {
			if (e.target === signInModal) {
				signInModal.style.display = "none";
			} else if (e.target === registerModal) {
				registerModal.style.display = "none";
			} else if (e.target === unfollowModal) {
				unfollowModal.style.display = "none";
			} else if (e.target === likesModal) {
				likesModal.style.display = "none";
			} else if (e.target === commentsModal) {
				commentsModal.style.display = "none";
			}
		};
	});

	function checkIfPasswordMatch() {
		const passwordInput = document.getElementById("password-input-rep");
		const passwordInput2 = document.getElementById("password-input");

		if (passwordInput.value !== passwordInput2.value) {
			passwordInput.setCustomValidity("Password Must be Matching.");
		} else {
			passwordInput.setCustomValidity("");
		}
	}

	function clearSignUpInputs(inp) {
		document.getElementById("password-input").value = "";
		document.getElementById("email-input").value = "";
		document.getElementById("password-input-rep").value = "";
		document.getElementById("username-input").value = "";
	}

	function clearSigInInputs() {
		document.getElementById("login-username-input").value = "";
		document.getElementById("login-password-input").value = "";
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

	function signIn(e) {
		e.preventDefault();

		const email = document.getElementById("login-username-input");
		const pass = document.getElementById("login-password-input");
		const signInButton = document.getElementById("sign-in-submit-button");
		const loginModal = document.getElementById("login-modal");

		signInWithEmailAndPassword(getAuth(), email.value, pass.value)
			.then((userCredential) => {
				const user = userCredential.user;

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

	function hideFollowModal() {
		const modal = document.getElementById("unfollow-modal");
		modal.style.display = "none";
	}

	function hideLikesModal() {
		const modal = document.getElementById("likes-modal");
		modal.style.display = "none";
	}

	function hideCommentsModal() {
		const modal = document.getElementById("comments-modal");
		modal.style.display = "none";
	}

	function followButtonForLikes() {
		if (signedIn) {
			return (
				<button onClick={(e) => followMobile(e)} className="likes-modal-follow">
					Follow
				</button>
			);
		}
	}

	return (
		<>
			<div id="register-modal" className="modal">
				<div className="modal-content">
					<span
						onClick={() => {
							document.getElementById("register-modal").style.display = "none";
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
							document.getElementById("login-modal").style.display = "flex";
							clearSignUpInputs();
						}}
						id="already-sign-ip"
					>
						Already signed up? Sign In
					</p>
				</div>
			</div>
			<div id="login-modal" className="modal">
				<div className="modal-content">
					<span
						onClick={() => {
							document.getElementById("login-modal").style.display = "none";
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
							document.getElementById("register-modal").style.display = "flex";
							clearSigInInputs();
						}}
						id="already-login-ip"
					>
						Already have an account? Sign Up
					</p>
				</div>
			</div>
			<div id="unfollow-modal" className="modal">
				<div className="unfollow-modal-content">
					<span>Unfollow</span>
					<span onClick={() => hideFollowModal()}>Cancel</span>
				</div>
			</div>
			<div id="likes-modal" className="modal">
				<div className="likes-modal-content">
					<div id="likes-modal-header">
						<span>Likes</span>
						<svg
							onClick={() => hideLikesModal()}
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
					</div>
					<div id="list-of-likes-div">
						<div className="right-sug-div-list">
							<div
								onMouseEnter={(e) => dropDown(e, "avaPic", "right")}
								onMouseLeave={() => hideDropDown()}
								className="right-sug-ava-div"
							>
								<img className="ava-img-likes" src={ava} alt="" />
							</div>
							<span
								onMouseEnter={(e) => dropDown(e, "no", "right")}
								onMouseLeave={() => hideDropDown()}
								className="sug-login-right"
							>
								sialabala
							</span>
							{followButtonForLikes()}
						</div>
						<div className="right-sug-div-list">
							<div
								onMouseEnter={(e) => dropDown(e, "avaPic", "right")}
								onMouseLeave={() => hideDropDown()}
								className="right-sug-ava-div"
							>
								<img className="ava-img-likes" src={ava} alt="" />
							</div>
							<span
								onMouseEnter={(e) => dropDown(e, "no", "right")}
								onMouseLeave={() => hideDropDown()}
								className="sug-login-right"
							>
								sialabala
							</span>
							{followButtonForLikes()}
						</div>
						<div className="right-sug-div-list">
							<div
								onMouseEnter={(e) => dropDown(e, "avaPic", "right")}
								onMouseLeave={() => hideDropDown()}
								className="right-sug-ava-div"
							>
								<img className="ava-img-likes" src={ava} alt="" />
							</div>
							<span
								onMouseEnter={(e) => dropDown(e, "no", "right")}
								onMouseLeave={() => hideDropDown()}
								className="sug-login-right"
							>
								sialabala
							</span>
							{followButtonForLikes()}
						</div>
					</div>
				</div>
			</div>
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
					<div id="comments-div-modal"></div>
				</div>
			</div>
		</>
	);
}

export default Modal;
