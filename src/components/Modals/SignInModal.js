import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
import favi from "../../img/favicon.jpg";
import { showSignUpModal } from "./SignUpModal";


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
			<div id="login-modal-content" className="modal-content">
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


function showSignInModal() {
	const modal = document.getElementById("login-modal");
	if (!window.location.href.includes("signInM")) {
		window.history.pushState("signInM", "Title", "signInM");
	}

	modal.style.display = "flex";
}

export default SignInModal;
export {showSignInModal};