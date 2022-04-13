import { useEffect, useState } from "react";

function AddMoreImgIcon() {
	const [color, setColor] = useState("#ffffff");

	function changeColor() {
		if (color === "#ffffff") {
			setColor("#262626");
		} else {
			setColor("#ffffff");
		}
	}

	useEffect(() => {
		const div = document.getElementById("add-multiple-img");
		const popUp = document.getElementById("multiple-pic-pop-up");

		if (color === "#ffffff") {
			div.style.background = "rgba(26,26,26,.8)";
			popUp.style.opacity = "0";
			setTimeout(() => popUp.style.display = "none", 185);

			
		} else if (color === "#262626") {
			div.style.background = "rgba(255,255,255)";
			popUp.style.display = "flex";
			popUp.style.opacity = "1";

		}
	}, [color]);

	

	return (
		<div onClick={() => changeColor()} id="add-multiple-img">
			<svg
				aria-label="Open Media Gallery"
				color={color}
				fill={color}
				height="16"
				role="img"
				viewBox="0 0 24 24"
				width="16"
			>
				<path
					d="M19 15V5a4.004 4.004 0 00-4-4H5a4.004 4.004 0 00-4 4v10a4.004 4.004 0 004 4h10a4.004 4.004 0 004-4zM3 15V5a2.002 2.002 0 012-2h10a2.002 2.002 0 012 2v10a2.002 2.002 0 01-2 2H5a2.002 2.002 0 01-2-2zm18.862-8.773A.501.501 0 0021 6.57v8.431a6 6 0 01-6 6H6.58a.504.504 0 00-.35.863A3.944 3.944 0 009 23h6a8 8 0 008-8V9a3.95 3.95 0 00-1.138-2.773z"
					fillRule="evenodd"
				></path>
			</svg>
		</div>
	);
}

export { AddMoreImgIcon };
