import { getAuth } from "firebase/auth";
import { getUserData } from "../..";
import { showSignInModal } from "../Modals/SignInModal";
import { homeIcon, homeIconNotClicked } from "./HomeIcon";
import { messageIconNotClicked, messageIconClicked } from "./MessageIcon";
import { avatarIconClicked, avatarIconNotClicked } from "./ProfileIcon";
import { searchIconNotClicked } from "./SearchIcon";

function NotificationIconSvg() {
	return (
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
	);
}

function notificationIconNotClicked() {
	const notifiIcon = Array.from(document.getElementsByClassName("notification-svg"));

	notifiIcon.forEach((icon) => {
		icon.innerHTML =
			'<svg aria-label="Activity" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>';
	});
}

function notificationIconClicked() {
	const notifiIcon = Array.from(document.getElementsByClassName("notification-svg"));

	notifiIcon.forEach((icon) => {
		icon.innerHTML =
			'<svg aria-label="Activity Feed"  color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>';
	});
}

function mobileNotificationIcon(e) {
	const user = getAuth().currentUser;

	const notiModal = document.getElementById("notification-modal-container");

	if (user) {
		notificationIconClicked();
		messageIconNotClicked();
		homeIconNotClicked();
		searchIconNotClicked();
		avatarIconNotClicked();
		notiModal.style.display = "flex";
		if (!window.location.href.includes("notiM")) {
			window.history.pushState("notiM", "Title", "notiM");
		}
	} else {
		showSignInModal();
	}
}

function notificationIcon(e) {
	const user = getAuth().currentUser;
	if (user) {
		if (
			document.getElementById("notification-arrow-div").style.display === "flex" &&
			(e.target.tagName === "svg" || e.target.tagName === "path")
		) {
			closeNotification();
		} else if (
			(document.getElementById("notification-arrow-div").style.display === "flex" &&
				window.location.href.includes("profile")) ||
			(document.getElementById("notification-arrow-div").style.display === "flex" &&
				window.location.href.includes("inbox"))
		) {
			closeNotification();
		} else if (!window.location.href.includes("commentsM")) {
			notificationIconClicked();
			messageIconNotClicked();
			homeIconNotClicked();
			searchIconNotClicked();
			avatarIconNotClicked();

			document.getElementById("profile-arrow-div").style.display = "none";
			document.getElementById("profile-div").style.display = "none";
			document.getElementById("notification-arrow-div").style.display = "flex";
			document.getElementById("notification-div").style.display = "flex";
		}
	} else {
		showSignInModal();
	}
}

function closeNotification() {
	const user = getAuth().currentUser;

	getUserData(user.uid).then((user) => {
		if (window.location.href.includes(user.data().username)) {
			avatarIconClicked();
			notificationIconNotClicked();
		} else if (window.location.href.includes("inbox")) {
			messageIconClicked();
			notificationIconNotClicked();
		} else {
			homeIcon();
		}
	});

	document.getElementById("notification-div").style.display = "none";
	document.getElementById("notification-arrow-div").style.display = "none";
}

export {
	NotificationIconSvg,
	notificationIconNotClicked,
	notificationIconClicked,
	mobileNotificationIcon,
	notificationIcon,
	closeNotification,
};
