import { messageIconNotClicked } from "./MessageIcon";
import { notificationIconNotClicked } from "./NotificationIcon";
import { avatarIconNotClicked } from "./ProfileIcon";
import { searchIconNotClicked } from "./SearchIcon";

function HomeIconSvg() {
	return (
		<svg aria-label="Home" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
			<path
				className="svh-path home-icon"
				d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z"
				fill="black"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeWidth="2"
			></path>
		</svg>
	);
}

function homeIconNotClicked() {
	const homeSvg = Array.from(document.getElementsByClassName("home-icon"));

	homeSvg.forEach((icon) => {
		icon.style.fill = "none";
	});
}

function homeIconClicked() {
	const homeSvg = Array.from(document.getElementsByClassName("home-icon"));

	homeSvg.forEach((icon) => {
		icon.style.fill = "black";
	});
}

function homeIcon() {
	homeIconClicked();
	searchIconNotClicked();
	messageIconNotClicked();
	notificationIconNotClicked();
	avatarIconNotClicked();
}




export {HomeIconSvg, homeIconNotClicked, homeIconClicked, homeIcon}