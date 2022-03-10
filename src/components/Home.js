import "../styles/Home.css";
import PictureCard from "./PictureCard.js";
import ava from "../img/ava.jpeg";

function Home() {
	return (
		<main>
			<section id="home-section">
				<div id="home-left-div">
					<div id="home-left-inner">
						<PictureCard></PictureCard>
						<PictureCard></PictureCard>
						<PictureCard></PictureCard>
					</div>
				</div>

				<div id="home-right-div">
                    <div id="home-right-profile">
                        <div id="home-right-profile-inner">
                            <div id="right-avatar-div">
                                <img className="right-ava" src={ava} alt="" />
                            </div>
                            <div id="right-login-div">
                                <span id="right-login-div-top-span">5566555hh</span>
                                <span id="right-login-div-bottom-span">Marian Maria</span>
                            </div>

                        </div>
                        {/* <button>Sign Up</button>
                        <button>Login</button> */}
                    </div>
                    <div id="suggestions-div-right">
                        <span id="for-you-sug-span">
                            Suggestions For You
                        </span>
                        <div id="list-of-sug-div">
                            <div className="right-sug-div-list">
                                <div className="right-sug-ava-div">
                                    <img className="ava-img-sug" src={ava} alt="" />
                                </div>
                                <span className="sug-login-right">
                                    sialabala
                                </span>
                                <span className="sug-right-follow">Follow</span>
                            </div>
                            <div className="right-sug-div-list">
                                <div className="right-sug-ava-div">
                                    <img className="ava-img-sug" src={ava} alt="" />
                                </div>
                                <span className="sug-login-right">
                                    sialabala
                                </span>
                                <span className="sug-right-follow">Follow</span>
                            </div>
                            <div className="right-sug-div-list">
                                <div className="right-sug-ava-div">
                                    <img className="ava-img-sug" src={ava} alt="" />
                                </div>
                                <span className="sug-login-right">
                                    sialabala
                                </span>
                                <span className="sug-right-follow">Follow</span>
                            </div>
                            <div className="right-sug-div-list">
                                <div className="right-sug-ava-div">
                                    <img className="ava-img-sug" src={ava} alt="" />
                                </div>
                                <span className="sug-login-right">
                                    sialabala
                                </span>
                                <span className="sug-right-follow">Follow</span>
                            </div>
                            <div className="right-sug-div-list">
                                <div className="right-sug-ava-div">
                                    <img className="ava-img-sug" src={ava} alt="" />
                                </div>
                                <span className="sug-login-right">
                                    sialabala
                                </span>
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
