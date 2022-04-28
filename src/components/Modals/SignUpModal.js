import { showSignInModal } from "./SignInModal";
import favi from "../../img/favicon.jpg";
import { useEffect } from "react";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";



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
							messages: [{
								conversation: [
									{
										date: Date.now(),
										username: "igips",
										text: "Hi " + userName.value + ", Thanks for signing up and testing my project. Please look around and test all the features you can.",
									},
								],
								date: Date.now(),
								username: userName.value,
								username2: "igips",
							}],
							unReadMessages: ["igips"],
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
			<div id="register-modal-content" className="modal-content">
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



function showSignUpModal() {
	const modal = document.getElementById("register-modal");

	if (!window.location.href.includes("signUpM")) {
		window.history.pushState("signUpM", "Title", "signUpM");
	}
	modal.style.display = "flex";
}

export default SignUpModal;
export {showSignUpModal}
