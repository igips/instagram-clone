function LeftArrow() {
	return (
		<svg
			aria-label="Left chevron"
			color="#ffffff"
			fill="#ffffff"
			height="16"
			role="img"
			viewBox="0 0 24 24"
			width="16"
		>
			<polyline
				fill="none"
				points="16.502 3 7.498 12 16.502 21"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			></polyline>
		</svg>
	);
}

function RightArrow() {
	return (
		<svg
			aria-label="Right chevron"
			color="#ffffff"
			fill="#ffffff"
			height="16"
			role="img"
			viewBox="0 0 24 24"
			width="16"
		>
			<polyline
				fill="none"
				points="8 3 17.004 12 8 21"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			></polyline>
		</svg>
	);
}

function BackArrow() {
	return (
		<svg
			aria-label="Back"
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
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				x1="2.909"
				x2="22.001"
				y1="12.004"
				y2="12.004"
			></line>
			<polyline
				fill="none"
				points="9.276 4.726 2.001 12.004 9.276 19.274"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			></polyline>
		</svg>
	);
}

export { LeftArrow, RightArrow, BackArrow};
