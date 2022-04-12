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

export { LeftArrow, RightArrow };
