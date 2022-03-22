import favi from "../img/favicon.jpg";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";

function Modal() {
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
        const loginModal = document.getElementById("loginModal");

		signInWithEmailAndPassword(getAuth(), email.value, pass.value)
			.then((userCredential) => {
				const user = userCredential.user;

                loginModal.style.display = "none";
                clearSigInInputs();

			})
			.catch((error) => {

                if(error.code === "auth/user-not-found") {
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
		const signUpModal = document.getElementById("registerModal");

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

	return (
		<>
			<div id="registerModal" className="modal">
				<div className="modal-content">
					<span
						onClick={() => {
							document.getElementById("registerModal").style.display = "none";
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
							document.getElementById("registerModal").style.display = "none";
							document.getElementById("loginModal").style.display = "flex";
							clearSignUpInputs();
						}}
						id="already-sign-ip"
					>
						Already signed up? Sign In
					</p>
				</div>
			</div>
			<div id="loginModal" className="modal">
				<div className="modal-content">
					<span
						onClick={() => {
							document.getElementById("loginModal").style.display = "none";
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
						<button id="sign-in-submit-button" className="modal-button">Sign In</button>
					</form>
					<p
						onClick={() => {
							document.getElementById("loginModal").style.display = "none";
							document.getElementById("registerModal").style.display = "flex";
							clearSigInInputs();
						}}
						id="already-login-ip"
					>
						Already have an account? Sign Up
					</p>
				</div>
			</div>
		</>
	);
}

export default Modal;

