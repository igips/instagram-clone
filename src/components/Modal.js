import favi from "../img/favicon.jpg";


function Modal() {
	return (
		<div id="registerModal" className="modal">
			<div className="modal-content">
				<span className="close-modal">&times;</span>
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
					<input className="input-modal" placeholder="Password" required type="password" />
					<input className="input-modal" placeholder="Repeat password" required type="password" />
					<button className="modal-button">Sign Up</button>
				</form>
				<p id="already-sign-ip">Already signed up? Login</p>
			</div>
		</div>
	);
}

export default Modal;
