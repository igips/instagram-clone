import "../styles/Home.css";
import PictureCard from "./PictureCard.js";
import Modal from "./Modal.js";
import { getAuth, signOut } from "firebase/auth";
import ava from "../img/ava.jpeg";
import { homeIcon } from "./Nav";

function Home() {
	function signOutFromAccount() {
		signOut(getAuth())
			.then(() => {
                homeIcon();
                	
			})
			.catch((error) => {});
	}

	return (
		<main>
			<Modal></Modal>

			<section id="home-section">
				<div id="home-left-div">
					<div id="home-left-inner">
						<div className="mobile" id="home-left-button-div">
							<button
								onClick={() => (document.getElementById("registerModal").style.display = "flex")}
								className="sign-login-butt"
							>
								Sign Up
							</button>
							<button
								onClick={() => (document.getElementById("loginModal").style.display = "flex")}
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
									<div className="sug-box-left-follow">Follow</div>
								</div>
                                <div className="sug-box-left">
									<img className="sug-box-left-ava" src={ava} alt="" />
									<span style={{ marginBottom: "10px" }}>Siabadab Abrakap</span>
									<div className="sug-box-left-follow">Follow</div>
								</div>
                                <div className="sug-box-left">
									<img className="sug-box-left-ava" src={ava} alt="" />
									<span style={{ marginBottom: "10px" }}>Siabadab Abrakap</span>
									<div className="sug-box-left-follow">Follow</div>
								</div>
							</div>
						</div>

						<PictureCard></PictureCard>
						<PictureCard></PictureCard>
						<PictureCard></PictureCard>
					</div>
				</div>

				<div id="home-right-div">
					<div id="home-right-profile">
						<div className="visible" id="right-div-for-buttons">
							<button
								onClick={() => (document.getElementById("registerModal").style.display = "flex")}
								className="sign-login-butt"
							>
								Sign Up
							</button>
							<button
								onClick={() => (document.getElementById("loginModal").style.display = "flex")}
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
								<div className="right-sug-ava-div">
									<img className="ava-img-sug" src={ava} alt="" />
								</div>
								<span className="sug-login-right">sialabala</span>
								<span className="sug-right-follow">Follow</span>
							</div>
							<div className="right-sug-div-list">
								<div className="right-sug-ava-div">
									<img className="ava-img-sug" src={ava} alt="" />
								</div>
								<span className="sug-login-right">sialabala</span>
								<span className="sug-right-follow">Follow</span>
							</div>
							<div className="right-sug-div-list">
								<div className="right-sug-ava-div">
									<img className="ava-img-sug" src={ava} alt="" />
								</div>
								<span className="sug-login-right">sialabala</span>
								<span className="sug-right-follow">Follow</span>
							</div>
							<div className="right-sug-div-list">
								<div className="right-sug-ava-div">
									<img className="ava-img-sug" src={ava} alt="" />
								</div>
								<span className="sug-login-right">sialabala</span>
								<span className="sug-right-follow">Follow</span>
							</div>
							<div className="right-sug-div-list">
								<div className="right-sug-ava-div">
									<img className="ava-img-sug" src={ava} alt="" />
								</div>
								<span className="sug-login-right">sialabala</span>
								<span className="sug-right-follow">Follow</span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

export default Home;
