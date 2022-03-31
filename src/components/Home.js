import "../styles/Home.css";
import PictureCard from "./PictureCard.js";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import ava from "../img/ava.jpeg";
import { homeIcon } from "./Nav";
import testPic from "../img/test-img.jpg";
import { useEffect, useState } from "react";
import { getUsername } from "..";

function dropDown(e, ele, right) {
	const dropDown = document.getElementById("drop-down");
	const rect = e.target.getBoundingClientRect();
	const user = getAuth().currentUser;

	dropDown.style.display = "flex";
	dropDown.style.left = rect.left + "px";
	dropDown.style.top = (right ? rect.top : window.scrollY + rect.top) + (ele === "avaPic" ? 25 : 18) + "px";
	dropDown.style.position = right ? "fixed" : "absolute";

	if (window.innerHeight - dropDown.getBoundingClientRect().bottom < 0) {
		dropDown.style.top = (right ? rect.top : window.scrollY + rect.top) - (user ? 350 : 290) + "px";
	}

	if (window.innerWidth - dropDown.getBoundingClientRect().left <= 390) {
		dropDown.style.left = rect.left - (410 - (window.innerWidth - dropDown.getBoundingClientRect().left)) + "px";
	}
}

function hideDropDown() {
	const dropDown = document.getElementById("drop-down");

	if (dropDown) {
		dropDown.style.display = "none";
	}
}

function keepDropDown() {
	const dropDown = document.getElementById("drop-down");
	dropDown.style.display = "flex";
}

function followDesktop(e) {
	if (e.currentTarget.textContent === "Follow") {
		e.currentTarget.style.color = "rgb(38,38,38)";
		e.currentTarget.textContent = "Following";
	} else if (e.currentTarget.textContent === "Following") {
		e.currentTarget.style.color = "#0095f6";
		e.currentTarget.textContent = "Follow";
	}
}

function followMobile(e) {
	if (e.currentTarget.textContent === "Follow") {
		e.currentTarget.classList.add("sug-box-left-follow-active");
		e.currentTarget.textContent = "Following";
	} else if (e.currentTarget.textContent === "Following") {
		e.currentTarget.classList.remove("sug-box-left-follow-active");
		e.currentTarget.textContent = "Follow";
	}
}

function Home() {
	const [signedIn, setSignedIn] = useState(false);
	const [username, setUsername] = useState("");

	useEffect(() => {
		const user = getAuth().currentUser;

		if(user) {
			getUsername(user.uid).then((user) => setUsername(user));
		}
	})

	onAuthStateChanged(getAuth(), (user) => {
		if (user) {
			setSignedIn(true);

		} else {
			setSignedIn(false);
			setUsername("");
		}
	});

	function signOutFromAccount() {
		signOut(getAuth())
			.then(() => {
				homeIcon();
			})
			.catch((error) => {});
	}

	function followDropDown(e) {
		const container = document.getElementById("drop-down-inner-fourth");

		if (e.currentTarget.textContent === "Follow") {
			const secondButton = document.getElementById("drop-down-button");

			if (secondButton) {
				secondButton.removeEventListener("click", followDropDown);
			}

			container.innerHTML =
				"<button class='drop-down-button'>Message</button> <button id='drop-down-following-button' class='drop-down-button'>Following</button>";

			const button = document.getElementById("drop-down-following-button");
			button.addEventListener("click", (e) => followDropDown(e));
		} else if (e.currentTarget.textContent === "Following") {
			const button = document.getElementById("drop-down-following-button");
			button.removeEventListener("click", followDropDown);

			container.innerHTML = "<button id='drop-down-button'>Follow</button>";

			const secondButton = document.getElementById("drop-down-button");
			secondButton.addEventListener("click", (e) => followDropDown(e));
		}
	}

	function dropDownBottomSection() {
		if (signedIn) {
			return (
				<div id="drop-down-inner-fourth">
					<button onClick={(e) => followDropDown(e)} id="drop-down-button">
						Follow
					</button>
				</div>
			);
		}
	}


	return (
		<main>
			<div
				onMouseOver={() => keepDropDown()}
				onMouseLeave={() => hideDropDown()}
				className="drop-down"
				id="drop-down"
			>
				<div className="drop-down-inner-first">
					<img id="drop-down-ava" src={ava} alt="" />
					<span>sialabala</span>
				</div>
				<div className="drop-down-inner-second">
					<div className="drop-down-inner-second-inner">
						<span>23</span>
						<span>posts</span>
					</div>
					<div className="drop-down-inner-second-inner">
						<span>173</span>
						<span>followers</span>
					</div>
					<div className="drop-down-inner-second-inner">
						<span>233</span>
						<span>following</span>
					</div>
				</div>
				<div className="drop-down-inner-third">
					<img src={testPic} alt="" />
					<img src={testPic} alt="" />
					<img src={testPic} alt="" />
				</div>
				{dropDownBottomSection()}
			</div>
			<section id="home-section">
				<div id="home-left-div">
					<div id="home-left-inner">
						<div className="mobile" id="home-left-button-div">
							<button
								onClick={() => (document.getElementById("register-modal").style.display = "flex")}
								className="sign-login-butt"
							>
								Sign Up
							</button>
							<button
								onClick={() => (document.getElementById("login-modal").style.display = "flex")}
								className="sign-login-butt"
							>
								Sign In
							</button>
						</div>
						<div className="not-visible" id="suggestions-left-div">
							<span id="for-you-sug-span-left">Suggestions For You</span>
							<div id="suggestions-left-inner-div">
								<div className="sug-box-left">
									<img className="sug-box-left-ava" src={ava} alt="" />
									<span style={{ marginBottom: "10px" }}>Siabadab Abrakap</span>
									<button onClick={(e) => followMobile(e)} className="sug-box-left-follow">
										Follow
									</button>
								</div>
								<div className="sug-box-left">
									<img className="sug-box-left-ava" src={ava} alt="" />
									<span style={{ marginBottom: "10px" }}>Siabadab Abrakap</span>
									<button onClick={(e) => followMobile(e)} className="sug-box-left-follow">
										Follow
									</button>
								</div>
								<div className="sug-box-left">
									<img className="sug-box-left-ava" src={ava} alt="" />
									<span style={{ marginBottom: "10px" }}>Siabadab Abrakap</span>
									<button onClick={(e) => followMobile(e)} className="sug-box-left-follow">
										Follow
									</button>
								</div>
							</div>
						</div>

						<PictureCard username={username}></PictureCard>
						<PictureCard username={username}></PictureCard>
						<PictureCard username={username}></PictureCard>
					</div>
				</div>

				<div id="home-right-div">
					<div id="home-right-profile">
						<div className="visible" id="right-div-for-buttons">
							<button
								onClick={() => (document.getElementById("register-modal").style.display = "flex")}
								className="sign-login-butt"
							>
								Sign Up
							</button>
							<button
								onClick={() => (document.getElementById("login-modal").style.display = "flex")}
								className="sign-login-butt"
							>
								Sign In
							</button>
						</div>
						<button onClick={() => signOutFromAccount()} className="sign-login-butt">
							Sign Out
						</button>
						<div className="not-visible" id="home-right-profile-inner">
							<div id="right-avatar-div">
								<img className="right-ava" src={ava} alt="" />
							</div>
							<div id="right-login-div">
								<span id="right-login-div-top-span"></span>
							</div>
						</div>
					</div>
					<div className="not-visible" id="suggestions-div-right">
						<span id="for-you-sug-span">Suggestions For You</span>
						<div id="list-of-sug-div">
							<div className="right-sug-div-list">
								<div
									onMouseEnter={(e) => dropDown(e, "avaPic", "right")}
									onMouseLeave={() => hideDropDown()}
									className="right-sug-ava-div"
								>
									<img className="ava-img-sug" src={ava} alt="" />
								</div>
								<span
									onMouseEnter={(e) => dropDown(e, "no", "right")}
									onMouseLeave={() => hideDropDown()}
									className="sug-login-right"
								>
									sialabala
								</span>
								<button onClick={(e) => followDesktop(e)} className="sug-right-follow">
									Follow
								</button>
							</div>
							<div className="right-sug-div-list">
								<div
									onMouseEnter={(e) => dropDown(e, "avaPic", "right")}
									onMouseLeave={() => hideDropDown()}
									className="right-sug-ava-div"
								>
									<img className="ava-img-sug" src={ava} alt="" />
								</div>
								<span
									onMouseEnter={(e) => dropDown(e, "no", "right")}
									onMouseLeave={() => hideDropDown()}
									className="sug-login-right"
								>
									sialabala
								</span>
								<button onClick={(e) => followDesktop(e)} className="sug-right-follow">
									Follow
								</button>
							</div>
							<div className="right-sug-div-list">
								<div
									onMouseEnter={(e) => dropDown(e, "avaPic", "right")}
									onMouseLeave={() => hideDropDown()}
									className="right-sug-ava-div"
								>
									<img className="ava-img-sug" src={ava} alt="" />
								</div>
								<span
									onMouseEnter={(e) => dropDown(e, "no", "right")}
									onMouseLeave={() => hideDropDown()}
									className="sug-login-right"
								>
									sialabala
								</span>
								<button onClick={(e) => followDesktop(e)} className="sug-right-follow">
									Follow
								</button>
							</div>
							<div className="right-sug-div-list">
								<div
									onMouseEnter={(e) => dropDown(e, "avaPic", "right")}
									onMouseLeave={() => hideDropDown()}
									className="right-sug-ava-div"
								>
									<img className="ava-img-sug" src={ava} alt="" />
								</div>
								<span
									onMouseEnter={(e) => dropDown(e, "no", "right")}
									onMouseLeave={() => hideDropDown()}
									className="sug-login-right"
								>
									sialabala
								</span>
								<button onClick={(e) => followDesktop(e)} className="sug-right-follow">
									Follow
								</button>
							</div>
							<div className="right-sug-div-list">
								<div
									onMouseEnter={(e) => dropDown(e, "avaPic", "right")}
									onMouseLeave={() => hideDropDown()}
									className="right-sug-ava-div"
								>
									<img className="ava-img-sug" src={ava} alt="" />
								</div>
								<span
									onMouseEnter={(e) => dropDown(e, "no", "right")}
									onMouseLeave={() => hideDropDown()}
									className="sug-login-right"
								>
									sialabala
								</span>
								<button onClick={(e) => followDesktop(e)} className="sug-right-follow">
									Follow
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

export default Home;
export { dropDown, hideDropDown, keepDropDown, followMobile };
