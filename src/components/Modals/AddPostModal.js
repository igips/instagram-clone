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
	const [imgIndex, setImgIndex] = useState(0);

	useEffect(() => {
		const addPostModal = document.getElementById("add-post-modal");
        const addPostModalContent = document.getElementById("img-img");
        const button = document.getElementById("add-multiple-img");
        const popUp = document.getElementById("multiple-pic-pop-up");

		addPostModal.addEventListener("click", (e) => {
			if (e.target === addPostModal) {
				closeAddPostModal();
			}
		});

        addPostModalContent.addEventListener("click", (e) => {
            if(e.target === addPostModalContent) {
                if (popUp.style.display === "flex") {
                    button.click();
                }
            }
        })
	}, []);

    useEffect(() => {
        handleDots();
        handlePopUpPic();
    })

	useEffect(() => {
		const label = document.getElementById("add-post-label");
		const imgDiv = document.getElementById("add-post-img-div");
		const next = document.getElementById("add-post-next-span");
		const spinner = document.getElementById("spinner-add-photo");
		const addPicPopUp = document.getElementById("add-pic-pop-up");

		
		handleArrows();

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

		if (img.length >= 3) {
			addPicPopUp.style.display = "none";
		} else if (img.length < 3) {
			addPicPopUp.style.display = "flex";
		}
	}, [img, imgIndex]);

	function handleDots() {
		const dots = document.querySelectorAll(".slider-dot-modal");
		const dotDiv = document.getElementById("slider-dots-div-modal");

		if (imgIndex === 0) {
			if (dots[1]) {
				dots[1].style.background = "#a8a8a8";
			}
			if (dots[2]) {
				dots[2].style.background = "#a8a8a8";
			}
			dots[0].style.background = "#0095f6";
		} else if (imgIndex === 1) {
			dots[0].style.background = "#a8a8a8";
			if (dots[2]) {
				dots[2].style.background = "#a8a8a8";
			}
			dots[1].style.background = "#0095f6";
		} else if (imgIndex === 2) {
			dots[0].style.background = "#a8a8a8";
			dots[1].style.background = "#a8a8a8";
			dots[2].style.background = "#0095f6";
		}

		if (img.length > 1) {
			dotDiv.style.display = "flex";
		} else if (img.length === 1) {
			dotDiv.style.display = "none";
		}
	}

	function handleArrows() {
		const leftArrow = document.getElementById("modal-left-arrow");
		const rightArrow = document.getElementById("modal-right-arrow");

		if (img.length > 1 && imgIndex !== 0) {
			leftArrow.style.display = "flex";
		} else {
			leftArrow.style.display = "none";
		}

		if (img.length > 1 && imgIndex !== img.length - 1) {
			rightArrow.style.display = "flex";
		} else {
			rightArrow.style.display = "none";
		}
	}

    function handlePopUpPic() {
        const pics = document.querySelectorAll(".pop-up-img-div");

        if (imgIndex === 0) {
			if (pics[1]) {
				pics[1].classList.add("pop-up-pic-not-active");
			}
			if (pics[2]) {
				pics[2].classList.add("pop-up-pic-not-active");
			}
			pics[0].classList.remove("pop-up-pic-not-active");
		} else if (imgIndex === 1) {
			pics[0].classList.add("pop-up-pic-not-active");
			if (pics[2]) {
				pics[2].classList.add("pop-up-pic-not-active");
			}
			pics[1].classList.remove("pop-up-pic-not-active");
		} else if (imgIndex === 2) {
			pics[0].classList.add("pop-up-pic-not-active");
			pics[1].classList.add("pop-up-pic-not-active");
			pics[2].classList.remove("pop-up-pic-not-active");
		}
    }

	function nextPic() {
		const button = document.getElementById("add-multiple-img");
		const popUp = document.getElementById("multiple-pic-pop-up");
		setImgIndex(imgIndex + 1);
		if (popUp.style.display === "flex") {
			button.click();
		}
	}

	function prevPic() {
		const button = document.getElementById("add-multiple-img");
		const popUp = document.getElementById("multiple-pic-pop-up");

		setImgIndex(imgIndex - 1);
		if (popUp.style.display === "flex") {
			button.click();
		}
	}

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
            e.target.value = "";

		}
	}

	function removeImageFromModal(id) {
		if (img.length === 1) {
			setImg([{ src: "" }]);
			document.getElementById("add-multiple-img").click();
		} else {
			if (imgIndex !== 0) {
				setImgIndex(imgIndex - 1);
			}
			setImg((oldImg) => {
				const newImg = oldImg.filter((old) => old.id !== id);
				return newImg;
			});
		}
	}

    function changePic(id) {
        let index;
        
        img.forEach((pic) => {
            if(pic.id === id) {
                index = img.indexOf(pic);
            }
        });
        setImgIndex(index);
    }

	function closeAddPostModal() {
		const addPostModal = document.getElementById("add-post-modal");
        const button = document.getElementById("add-multiple-img");
		const popUp = document.getElementById("multiple-pic-pop-up");
		window.history.back();
		addPostModal.style.display = "none";
        if (popUp.style.display === "flex") {
			button.click();
		}
        setImgIndex(0);
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
						<img id="img-img" src={img[imgIndex].src} alt="" />
						<div className="slider-dots-div" id="slider-dots-div-modal">
							{img.map((img) => {
								return <div className="slider-dot-modal" key={uniqid()}></div>;
							})}
						</div>
						<div onClick={() => prevPic()} id="modal-left-arrow" className="left-arrow">
							{LeftArrow()}
						</div>
						<div onClick={() => nextPic()} id="modal-right-arrow" className="right-arrow">
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
										<img onClick={() => changePic(img.id)} className="pop-up-img" src={img.src} alt="" />
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
