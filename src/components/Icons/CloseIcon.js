function CloseIcon() {
	return (
		<svg aria-label="Close" color="#ffffff" fill="#ffffff" height="24" role="img" viewBox="0 0 24 24" width="24">
			<polyline
				fill="none"
				points="20.643 3.357 12 12 3.353 20.647"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="3"
			></polyline>
			<line
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="3"
				x1="20.649"
				x2="3.354"
				y1="20.649"
				y2="3.354"
			></line>
		</svg>
	);
}

function CloseModalIcon(modal) {
	return (
		<svg
			onClick={() => modal()}
			id="close-likes-modal"
			aria-label="Close"
			color="#262626"
			fill="#262626"
			height="18"
			role="img"
			viewBox="0 0 24 24"
			width="18"
		>
			<polyline
				fill="none"
				points="20.643 3.357 12 12 3.353 20.647"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="3"
			></polyline>
			<line
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="3"
				x1="20.649"
				x2="3.354"
				y1="20.649"
				y2="3.354"
			></line>
		</svg>
	);
}

function SmallCloseIcon() {
	return (
		<svg
			aria-label="Delete"
			color="#ffffff"
			fill="#ffffff"
			height="12"
			role="img"
			viewBox="0 0 24 24"
			width="12"
		>
			<line
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				x1="21"
				x2="3"
				y1="3"
				y2="21"
			></line>
			<line
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				x1="21"
				x2="3"
				y1="21"
				y2="3"
			></line>
		</svg>
	);
}

export { CloseIcon, CloseModalIcon, SmallCloseIcon};
