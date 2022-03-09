import "../styles/PictureCard.css";
import ava from "../img/ava.jpeg";
import testPic from "../img/test-img.jpg";

function PictureCard() {
	return (
		<article className="picture-card-article">
			<div className="picture-card-div">
				<div className="picture-card-header-div">
					<div className="picture-card-header-inner">
						<header className="picture-card-header">
							<div className="picture-card-avatar-div">
								<div className="picture-card-avatar-div-inner">
									<canvas height="42" width="42"></canvas>
									<span className="avatar-span">
										<img
                                            alt=""
											className="card-avatar-img"
											data-testid="user-avatar"
											draggable="false"
											src={ava}
										/>
									</span>
								</div>
							</div>
							<div className="picture-card-name-div">
								<span className="name-span">blabeksrapek</span>
							</div>
						</header>
						<div className="picture-card-header-options">
							<div className="picture-card-header-options-inner">
								<svg
									aria-label="More options"
									color="#262626"
									fill="#262626"
									height="24"
									role="img"
									viewBox="0 0 24 24"
									width="24"
								>
									<circle cx="12" cy="12" r="1.5"></circle>
									<circle cx="6" cy="12" r="1.5"></circle>
									<circle cx="18" cy="12" r="1.5"></circle>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>
            <div className="picture-div">
                <div className="picture-div-inner">
                    <img className="main-picture" src={testPic} alt="" />
                </div>
                
            </div>
		</article>
	);
}

export default PictureCard;
