import "../styles/Nav.css";
import ava from "../img/ava.jpeg";

function Nav() {
	return (
		<>
			<nav id="top-nav">
				<div className="nav-container">
					<div className="nav-inner-container">
						<div id="logo">Fakegram</div>
						<div id="search-div">
							<input id="search-input" type="text" placeholder="Search" />
						</div>
						<div id="icon-div">
							<div className="icon-inner-div icon-to-hide">
								<svg
									aria-label="Home"
									color="#262626"
									fill="#262626"
									height="24"
									role="img"
									viewBox="0 0 24 24"
									width="24"
								>
									<path
										className="svh-path"
										d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z"
										fill="none"
										stroke="currentColor"
										strokeLinejoin="round"
										strokeWidth="2"
									></path>
								</svg>
							</div>
							<div className="icon-inner-div">
								<svg
									stroke="currentColor"
									fill="currentColor"
									strokeWidth="0"
									viewBox="0 0 512 512"
									height="24"
									width="24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill="none"
										strokeLinecap="round"
										strokeMiterlimit="10"
										strokeWidth="40"
										d="M87.49 380c1.19-4.38-1.44-10.47-3.95-14.86a44.86 44.86 0 00-2.54-3.8 199.81 199.81 0 01-33-110C47.65 139.09 140.73 48 255.83 48 356.21 48 440 117.54 459.58 209.85a199 199 0 014.42 41.64c0 112.41-89.49 204.93-204.59 204.93-18.3 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.09 31.09 0 00-11.12-2.07 30.71 30.71 0 00-12.09 2.43l-67.83 24.48a16 16 0 01-4.67 1.22 9.6 9.6 0 01-9.57-9.74 15.85 15.85 0 01.6-3.29z"
									></path>
								</svg>
							</div>
							<div className="icon-inner-div icon-to-hide">
								<svg
									aria-label="New Post"
									color="#262626"
									fill="#262626"
									height="24"
									role="img"
									viewBox="0 0 24 24"
									width="24"
								>
									<path
										d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
									></path>
									<line
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										x1="6.545"
										x2="17.455"
										y1="12.001"
										y2="12.001"
									></line>
									<line
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										x1="12.003"
										x2="12.003"
										y1="6.545"
										y2="17.455"
									></line>
								</svg>
							</div>
							<div className="icon-inner-div icon-to-hide">
								<svg
									aria-label="Activity Feed"
									color="#262626"
									fill="#262626"
									height="24"
									role="img"
									viewBox="0 0 24 24"
									width="24"
								>
									<path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
								</svg>
							</div>
							<div className="icon-inner-div icon-to-hide">
								{/* <span role="link" tabIndex="0" style={{ width: "24px", height: "24px" }}>
							<img id="ava" crossOrigin="anonymous" draggable="false" src={ava} />
						</span> */}
								<svg
									stroke="currentColor"
									fill="currentColor"
									strokeWidth="0"
									viewBox="0 0 512 512"
									height="24"
									width="24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="40"
										d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
									></path>
									<path
										fill="none"
										strokeMiterlimit="10"
										strokeWidth="40"
										d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
									></path>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</nav>
			<nav id="bottom-nav">
				<div className="nav-container-bottom">
					<div className="icon-inner-div inner-bottom">
						<svg
							aria-label="Home"
							color="#262626"
							fill="#262626"
							height="24"
							role="img"
							viewBox="0 0 24 24"
							width="24"
						>
							<path
								className="svh-path"
								d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z"
								fill="none"
								stroke="currentColor"
								strokeLinejoin="round"
								strokeWidth="2"
							></path>
						</svg>
					</div>
					<div className="icon-inner-div inner-bottom">
						<svg
							aria-label="Search &amp; Explore"
							color="#262626"
							fill="#262626"
							height="24"
							role="img"
							viewBox="0 0 24 24"
							width="24"
						>
							<path
								d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
							></path>
							<line
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								x1="16.511"
								x2="22"
								y1="16.511"
								y2="22"
							></line>
						</svg>
					</div>
					<div className="icon-inner-div inner-bottom">
						<svg
							aria-label="New Post"
							color="#262626"
							fill="#262626"
							height="24"
							role="img"
							viewBox="0 0 24 24"
							width="24"
						>
							<path
								d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
							></path>
							<line
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								x1="6.545"
								x2="17.455"
								y1="12.001"
								y2="12.001"
							></line>
							<line
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								x1="12.003"
								x2="12.003"
								y1="6.545"
								y2="17.455"
							></line>
						</svg>
					</div>

					<div className="icon-inner-div inner-bottom">
						<svg
							aria-label="Activity Feed"
							color="#262626"
							fill="#262626"
							height="24"
							role="img"
							viewBox="0 0 24 24"
							width="24"
						>
							<path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
						</svg>
					</div>
					<div className="icon-inner-div inner-bottom">
						{/* <span role="link" tabIndex="0" style={{ width: "24px", height: "24px" }}>
							<img id="ava" crossOrigin="anonymous" draggable="false" src={ava} />
						</span> */}
						<svg
							stroke="currentColor"
							fill="currentColor"
							strokeWidth="0"
							viewBox="0 0 512 512"
							height="24"
							width="24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="40"
								d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
							></path>
							<path
								fill="none"
								strokeMiterlimit="10"
								strokeWidth="40"
								d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
							></path>
						</svg>
					</div>
				</div>
			</nav>
		</>
	);
}

export default Nav;
