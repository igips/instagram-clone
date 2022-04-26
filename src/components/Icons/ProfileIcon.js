import { getAuth } from "firebase/auth";
import { getUserData } from "../..";
import { showSignInModal } from "../Modals/SignInModal";
import { homeIcon, homeIconNotClicked } from "./HomeIcon";
import { messageIconNotClicked, messageIconClicked } from "./MessageIcon";
import { notificationIconNotClicked } from "./NotificationIcon";
import { searchIconNotClicked } from "./SearchIcon";

function ProfileIconDrop() {
	return (
		<svg aria-label="Profile" color="#262626" fill="#262626" height="16" role="img" viewBox="0 0 24 24" width="16">
			<circle
				cx="12.004"
				cy="12.004"
				fill="none"
				r="10.5"
				stroke="currentColor"
				strokeLinecap="round"
				strokeMiterlimit="10"
				strokeWidth="2"
			></circle>
			<path
				d="M18.793 20.014a6.08 6.08 0 00-1.778-2.447 3.991 3.991 0 00-2.386-.791H9.38a3.994 3.994 0 00-2.386.791 6.09 6.09 0 00-1.779 2.447"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeMiterlimit="10"
				strokeWidth="2"
			></path>
			<circle
				cx="12.006"
				cy="9.718"
				fill="none"
				r="4.109"
				stroke="currentColor"
				strokeLinecap="round"
				strokeMiterlimit="10"
				strokeWidth="2"
			></circle>
		</svg>
	);
}

function ProfileIconSvg() {
	return (
		<svg
			onClick={() => showSignInModal()}
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
	);
}

function avatarIconNotClicked() {
	const avatarBorder = Array.from(document.getElementsByClassName("border-for-avatar"));

	avatarBorder.forEach((border) => {
		border.style.display = "none";
	});
}

function avatarIconClicked() {
	const avatarBorder = Array.from(document.getElementsByClassName("border-for-avatar"));

	avatarBorder.forEach((border) => {
		border.style.display = "block";
	});
}

function avatarIcon(e) {
	if (
		(document.getElementById("profile-arrow-div").style.display === "flex" && e.target.tagName === "IMG") ||
		(e.target.tagName === "DIV" && document.getElementById("profile-arrow-div").style.display === "flex")
	) {
		closeAvatar();
	} else {
		avatarIconClicked();
		messageIconNotClicked();
		homeIconNotClicked();
		notificationIconNotClicked();
		searchIconNotClicked();

		document.getElementById("notification-div").style.display = "none";
		document.getElementById("notification-arrow-div").style.display = "none";
		document.getElementById("profile-arrow-div").style.display = "flex";
		document.getElementById("profile-div").style.display = "flex";
	}
}

function closeAvatar() {
	const user = getAuth().currentUser;

	getUserData(user.uid).then((user) => {
		if (window.location.href.includes(user.data().username)) {
			avatarIconClicked();
		} else if (window.location.href.includes("inbox")) {
			messageIconClicked();
			avatarIconNotClicked();
		} else {
			homeIcon();
		}
	});

	document.getElementById("profile-arrow-div").style.display = "none";
	document.getElementById("profile-div").style.display = "none";
}

export { ProfileIconDrop, ProfileIconSvg, avatarIconNotClicked, avatarIconClicked, avatarIcon, closeAvatar };
