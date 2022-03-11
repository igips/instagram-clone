import favi from "../img/favicon.jpg";

function Modal() {
	function checkIfPasswordMatch() {
		if (document.getElementById("password-input-rep").value !== document.getElementById("password-input").value) {
			document.getElementById("password-input-rep").setCustomValidity("Password Must be Matching.");
		} else {
			document.getElementById("password-input-rep").setCustomValidity("");
		}
	}

	return (
		<>
			<div id="registerModal" className="modal">
				<div className="modal-content">
					<span
						onClick={() => (document.getElementById("registerModal").style.display = "none")}
						className="close-modal"
					>
						&times;
					</span>
					<img className="img-modal" src={favi} alt="" />
					<p>Sign Up</p>
					<form onSubmit={(e) => e.preventDefault()} id="reg-form">
						<input
							maxLength="15"
							required
							id="username-input"
							className="input-modal"
							type="text"
							placeholder="Username"
						/>
						<input
							id="password-input"
							className="input-modal"
							placeholder="Password"
							required
							type="password"
							onInput={() => checkIfPasswordMatch()}
						/>
						<input
							id="password-input-rep"
							className="input-modal"
							placeholder="Repeat password"
							required
							type="password"
							onInput={() => checkIfPasswordMatch()}
						/>
						<button className="modal-button">Sign Up</button>
					</form>
					<p
						onClick={() => {
							document.getElementById("registerModal").style.display = "none";
							document.getElementById("loginModal").style.display = "flex";
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
						onClick={() => (document.getElementById("loginModal").style.display = "none")}
						className="close-modal"
					>
						&times;
					</span>
					<img className="img-modal" src={favi} alt="" />
					<p>Sign In</p>
					<form onSubmit={(e) => e.preventDefault()} id="login-form">
						<input
							maxLength="15"
							required
							id="login-username-input"
							className="input-modal"
							type="text"
							placeholder="Username"
						/>
						<input
							id="login-password-input"
							className="input-modal"
							placeholder="Password"
							required
							type="password"
						/>
						<button className="modal-button">Sign In</button>
					</form>
					<p
						onClick={() => {
                            document.getElementById("loginModal").style.display = "none";
							document.getElementById("registerModal").style.display = "flex";
						}}
						id="already-login-ip"
					>
						Already have an account? Sign In
					</p>
				</div>
			</div>
		</>
	);
}

export default Modal;
