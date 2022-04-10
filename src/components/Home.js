import "../styles/Home.css";
import PictureCard from "./PictureCard.js";
import ava from "../img/ava.jpeg";
import uniqid from "uniqid";
import { showSignInModal, showSignUpModal } from "./Modals";
import { dropDown, hideDropDown} from "./DropDown";


function followMobile(e) {
	if (e.currentTarget.textContent === "Follow") {
		e.currentTarget.classList.add("sug-box-left-follow-active");
		e.currentTarget.textContent = "Following";
	} else if (e.currentTarget.textContent === "Following") {
		e.currentTarget.classList.remove("sug-box-left-follow-active");
		e.currentTarget.textContent = "Follow";
	}
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

function Home(props) {
	let num = 0;
	let num2 = 0;

	
	return (
		<main>
			<section id="home-section">
				<div id="home-left-div">
					<div id="home-left-inner">
						<div className="mobile" id="home-left-button-div">
							<button onClick={() => showSignUpModal()} className="sign-login-butt">
								Sign Up
							</button>
							<button onClick={() => showSignInModal()} className="sign-login-butt">
								Sign In
							</button>
						</div>
						<div className="not-visible" id="suggestions-left-div">
							<span id="for-you-sug-span-left">Suggestions For You</span>
							<div id="suggestions-left-inner-div">
								{props.users.map((user) => {
									if (!props.following.includes(user.username) && num < 3 && user.username !== props.username) {
										num++;
										return (
											<div key={uniqid()} className="sug-box-left">
												<img className="sug-box-left-ava" src={ava} alt="" />
												<span style={{ marginBottom: "10px" }}>{user.username}</span>
												<button
													onClick={(e) => props.follow(user.username)}
													className="sug-box-left-follow"
												>
													Follow
												</button>
											</div>
										);
									}
								})}
								
							</div>
						</div>

						<PictureCard
							dropDownSetUserData={props.dropDownSetUserData}
							users={props.users}
							follow={props.follow}
							unFollow={props.unFollow}
							following={props.following}
							username={props.username}
						></PictureCard>
						<PictureCard
							dropDownSetUserData={props.dropDownSetUserData}
							users={props.users}
							follow={props.follow}
							unFollow={props.unFollow}
							following={props.following}
							username={props.username}
						></PictureCard>
						<PictureCard
							dropDownSetUserData={props.dropDownSetUserData}
							users={props.users}
							follow={props.follow}
							unFollow={props.unFollow}
							following={props.following}
							username={props.username}
						></PictureCard>
					</div>
				</div>

				<div id="home-right-div">
					<div id="home-right-profile">
						<div className="visible" id="right-div-for-buttons">
							<button onClick={() => showSignUpModal()} className="sign-login-butt">
								Sign Up
							</button>
							<button onClick={() => showSignInModal()} className="sign-login-butt">
								Sign In
							</button>
						</div>
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
							{props.users.map((user) => {
								if (!props.following.includes(user.username) && num2 < 5 && user.username !== props.username) {
									num2++;
									return (
										<div key={uniqid()} className="right-sug-div-list">
											<div
												onMouseEnter={(e) =>
													{dropDown(user, props.dropDownSetUserData,  e, "avaPic", "right")}
												}
												onMouseLeave={() => hideDropDown()}
												className="right-sug-ava-div"
											>
												<img className="ava-img-sug" src={ava} alt="" />
											</div>
											<span
												onMouseEnter={(e) =>
													dropDown(user, props.dropDownSetUserData,  e, "no", "right")
												}
												onMouseLeave={() => hideDropDown()}
												className="sug-login-right"
											>
												{user.username}
											</span>
											<button onClick={(e) => props.follow(user.username)} className="sug-right-follow">
												Follow
											</button>
										</div>
									);
								}
							})}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

export default Home;
export {followMobile, shuffleArray};
