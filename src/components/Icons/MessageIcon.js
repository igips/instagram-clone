import { getAuth } from "firebase/auth";
import { showSignInModal } from "../Modals/SignInModal";
import { homeIconNotClicked } from "./HomeIcon";
import { notificationIconNotClicked } from "./NotificationIcon";
import { avatarIconNotClicked } from "./ProfileIcon";
import { searchIconNotClicked } from "./SearchIcon";

function MessageIconSvg() {
	return (
		<svg
			id="message-icon-svg"
			aria-label="Share Post"
			color="#262626"
			fill="#262626"
			height="24"
			role="img"
			viewBox="0 0 24 24"
			width="24"
		>
			<line
				fill="none"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeWidth="2"
				x1="22"
				x2="9.218"
				y1="3"
				y2="10.083"
			></line>{" "}
			<polygon
				fill="none"
				points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeWidth="2"
			></polygon>
		</svg>
	);
}

function NewMessageIcon() {
	return (
		<svg
			aria-label="New Message"
			color="#262626"
			fill="#262626"
			height="24"
			role="img"
			viewBox="0 0 24 24"
			width="24"
		>
			<path
				d="M12.202 3.203H5.25a3 3 0 00-3 3V18.75a3 3 0 003 3h12.547a3 3 0 003-3v-6.952"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			></path>
			<path
				d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 012.004 0l1.224 1.225a1.417 1.417 0 010 2.004z"
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
				x1="16.848"
				x2="20.076"
				y1="3.924"
				y2="7.153"
			></line>
		</svg>
	);
}

function messageIconNotClicked() {
	const svgDiv = document.getElementById("message-icon-svg");

	svgDiv.innerHTML =
		'<line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon>';
}

function messageIconClicked() {
	const svgDiv = document.getElementById("message-icon-svg");

	svgDiv.innerHTML =
		'<path d="M22.91 2.388a.69.69 0 00-.597-.347l-20.625.002a.687.687 0 00-.482 1.178L7.26 9.16a.686.686 0 00.778.128l7.612-3.657a.723.723 0 01.937.248.688.688 0 01-.225.932l-7.144 4.52a.69.69 0 00-.3.743l2.102 8.692a.687.687 0 00.566.518.655.655 0 00.103.008.686.686 0 00.59-.337L22.903 3.08a.688.688 0 00.007-.692" fill-rule="evenodd"></path>';
}

function messageIcon() {
	const user = getAuth().currentUser;

	if (user) {
		messageIconClicked();
		homeIconNotClicked();
		notificationIconNotClicked();
		searchIconNotClicked();
		avatarIconNotClicked();
	} else {
		showSignInModal();
	}
}

export { MessageIconSvg, messageIconNotClicked, messageIconClicked, messageIcon, NewMessageIcon };
