import "../styles/Nav.css";
import homeIcon from "../img/home-icon.svg";

function Nav() {
	return (
		<nav>
			<div id="nav-container">
				<div id="logo">Fakegram</div>
				<div id="search-div">
					<input id="search-input" type="text" placeholder="Search" />
				</div>
				<div id="icon-div">
					<div className="icon-inner-div">
						<svg
							aria-label="Home"
							color="#262626"
							fill="#262626"
							height="24"
							role="img"
							viewBox="0 0 24 24"
							width="24"
						>
							<path className="svh-path"
								d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z"
								fill="none"
								stroke="currentColor"
								strokeLinejoin="round"
								strokeWidth="2"
							></path>
						</svg>
					</div>
                    <div className="icon-inner-div">
                    
                    
                    </div>
				</div>
			</div>
		</nav>
	);
}

export default Nav;
