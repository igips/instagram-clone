import { useEffect, useState } from "react";
import { CloseIcon, CloseModalIcon, SmallCloseIcon } from "../Icons/CloseIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { AddMoreImgIcon } from "../Icons/AddMoreImgIcon";
import uniqid from "uniqid";
import { PlusIcon } from "../Icons/PlusIcon";
import { LeftArrow, RightArrow } from "../Icons/ArrowIcons";

function AddPostModal() {
	const [img, setImg] = useState([{ src: "" }]);

	useEffect(() => {
		const addPostModal = document.getElementById("add-post-modal");

		addPostModal.addEventListener("click", (e) => {
			if (e.target === addPostModal) {
				closeAddPostModal();
			}
		});
	}, []);

	useEffect(() => {
		const header = document.getElementById("add-post-header");
		const label = document.getElementById("add-post-label");
		const imgDiv = document.getElementById("add-post-img-div");
		const next = document.getElementById("add-post-next-span");
		const spinner = document.getElementById("spinner-add-photo");
        const addPicPopUp = document.getElementById("add-pic-pop-up");

		if (img[0].src === "") {
			spinner.style.display = "none";
			imgDiv.style.display = "none";
			next.style.display = "none";
			label.style.display = "flex";
		} else if (img[0].src !== "") {
			spinner.style.display = "none";
			label.style.display = "none";
			next.style.display = "flex";
			imgDiv.style.display = "flex";
		}

        if(img.length >= 3) {
            addPicPopUp.style.display = "none";

        } else if(img.length < 3) {
            addPicPopUp.style.display = "flex";
        }
	}, [img]);

	function handleImage(e) {
		if (img[0].src === "") {
			document.getElementById("add-post-label").style.display = "none";
			document.getElementById("spinner-add-photo").style.display = "flex";
		}

		if (e.target.files[0]) {
			const img2 = e.target.files[0];
			const reader = new FileReader();
			reader.onload = () => {
				if (img[0].src === "") {
					setImg([{ id: uniqid(), src: reader.result }]);
				} else {
					setImg([...img, { id: uniqid(), src: reader.result }]);
				}
			};
			reader.readAsDataURL(img2);
		}
	}

	function removeImageFromModal(id) {
		if (img.length === 1) {
			setImg([{ src: "" }]);
			document.getElementById("add-multiple-img").click();
		} else {
			setImg((oldImg) => {
				const newImg = oldImg.filter((old) => old.id !== id);
				return newImg;
			});
		}
	}

	function closeAddPostModal() {
		const addPostModal = document.getElementById("add-post-modal");
		window.history.back();
		addPostModal.style.display = "none";
		setImg([{ src: "" }]);
	}

	return (
		<div id="add-post-modal" className="modal">
			<div onClick={() => closeAddPostModal()} id="comments-modal-close">
				{CloseIcon()}
			</div>

			<div id="add-post-modal-content">
				<div id="add-post-header">
					<span onClick={() => closeAddPostModal()} id="add-post-close-mobile">
						{CloseModalIcon(() => {})}
					</span>
					<span id="app-post-header-span">Create new post</span>
					<span id="add-post-next-span">Next</span>
				</div>
				<div id="add-post-input-div">
					<div id="spinner-add-photo">
						<FontAwesomeIcon
							style={{ height: "40px", width: "40px" }}
							icon={faSpinner}
							className="fa-spin"
						/>
					</div>
					<div id="add-post-img-div">
						<img id="img-img" src={img[0].src} alt="" />
                        <div className="slider-dots-div" id="slider-dots-div-modal">
                            {img.map((img) => {
                                return (
                                    <div className="slider-dot" key={uniqid()}></div>
                                );
                            })}
                        </div>
                        <div className="left-arrow">
                            {LeftArrow()}
                        </div>
                        <div className="right-arrow">
                            {RightArrow()}
                        </div>
						<div id="multiple-pic-pop-up">
							{img.map((img) => {
								return (
									<div key={uniqid()} className="pop-up-img-div">
										<div
											onClick={() => removeImageFromModal(img.id)}
											className="pop-up-delete-icon"
										>
											{SmallCloseIcon()}
										</div>
										<img className="pop-up-img" src={img.src} alt="" />
									</div>
								);
							})}
							<div onClick={() => document.getElementById("img-input").click()} id="add-pic-pop-up">
								{PlusIcon()}
							</div>
						</div>
						{AddMoreImgIcon()}
					</div>
					<label id="add-post-label">
						<FontAwesomeIcon icon={faCloudArrowUp} />
						<input onChange={(e) => handleImage(e)} id="img-input" type="file" accept="image/*" />
					</label>
				</div>
			</div>
		</div>
	);
}

function showAddPostModal() {
	const addPostModal = document.getElementById("add-post-modal");
	if (!window.location.href.includes("addPostM")) {
		window.history.pushState("addPostM", "Title", "addPostM");
	}
	addPostModal.style.display = "flex";
}

export default AddPostModal;
export { showAddPostModal };
