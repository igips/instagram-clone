import { useEffect, useState } from "react";

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

function SettingsIcon() {
	return (
		<svg aria-label="Settings" color="#262626" fill="#262626" height="16" role="img" viewBox="0 0 24 24" width="16">
			<circle
				cx="12"
				cy="12"
				fill="none"
				r="8.635"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			></circle>
			<path
				d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096"
				fill="none"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeWidth="2"
			></path>
		</svg>
	);
}

function ThemeIcon() {
	return (
		<svg
			stroke="currentColor"
			fill="none"
			strokeWidth="0"
			viewBox="0 0 24 24"
			height="16px"
			width="16px"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z" fill="currentColor"></path>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
				fill="currentColor"
			></path>
		</svg>
	);
}

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

function MessageIconClickedSvg() {
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
			<path
				d="M22.91 2.388a.69.69 0 00-.597-.347l-20.625.002a.687.687 0 00-.482 1.178L7.26 9.16a.686.686 0 00.778.128l7.612-3.657a.723.723 0 01.937.248.688.688 0 01-.225.932l-7.144 4.52a.69.69 0 00-.3.743l2.102 8.692a.687.687 0 00.566.518.655.655 0 00.103.008.686.686 0 00.59-.337L22.903 3.08a.688.688 0 00.007-.692"
				fillRule="evenodd"
			></path>
		</svg>
	);
}

export { ProfileIconDrop, SettingsIcon, ThemeIcon, HomeIconSvg, MessageIconSvg, MessageIconClickedSvg };
