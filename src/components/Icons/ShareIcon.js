import { getAuth } from "firebase/auth";
import { showShareModal } from "../Modals/ShareModal";
import { showSignInModal } from "../Modals/SignInModal";


function ShareIcon() {
	return (
		<svg
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
			></line>
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

function shareIconClicked() {
	const user = getAuth().currentUser;

	if (user) {
		showShareModal();
	} else {
		showSignInModal();
	}
}

function shareIcon() {
	return (
		<span onClick={() => shareIconClicked()} className="comms-icon-span">
			{ShareIcon()}
		</span>
	);
}

export {ShareIcon, shareIconClicked, shareIcon}
