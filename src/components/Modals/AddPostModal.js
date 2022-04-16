import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { CloseIcon, CloseModalIcon, SmallCloseIcon } from "../Icons/CloseIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { AddMoreImgIcon } from "../Icons/AddMoreImgIcon";
import uniqid from "uniqid";
import { PlusIcon } from "../Icons/PlusIcon";
import { BackArrow, LeftArrow, RightArrow } from "../Icons/ArrowIcons";
import ReactDOM, { render } from "react-dom";
import Picker from "emoji-picker-react";
import { EmojiiIcon } from "../Icons/EmojiiIcon";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import ava from "../../img/ava.jpeg";
import { getDocId, searchFunction } from "../..";
import { arrayUnion, doc, getFirestore, updateDoc, increment } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AddPostModal(props) {
	const [img, setImg] = useState([{ src: "", tags: [] }]);
	const [imgIndex, setImgIndex] = useState(0);
	const [searchValue, setSearchValue] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [captionValue, setCaptionValue] = useState("");
	const [locX, setLocX] = useState();
	const [locY, setLocY] = useState();

	let nextButton;
	let submitButton;
	let captionArea;
	let addMorePicbutton;
	let popUp;
	let modal;
	let pic;
	let newPostHeader;
	let captionAndTags;
	let goBackArrow;
	let addPostModal;
	let tagDropDownDiv;
	let closeSearch;
	let tagDiv;
	let spinner;
	let imgDiv;

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			if (img.length > 1 && imgIndex !== img.length - 1) {
				nextPic();
			}
		},
		onSwipedRight: () => {
			if (img.length > 1 && imgIndex !== 0) {
				prevPic();
			}
		},
	});

	useEffect(() => {
		nextButton = document.getElementById("add-post-next-span");
		submitButton = document.getElementById("submit-span");
		captionArea = document.getElementById("caption-input-div");
		addMorePicbutton = document.getElementById("add-multiple-img");
		popUp = document.getElementById("multiple-pic-pop-up");
		modal = document.getElementById("add-post-modal-content");
		pic = document.getElementById("img-img");
		newPostHeader = document.getElementById("app-post-header-span");
		captionAndTags = document.getElementById("caption-and-tag-span");
		goBackArrow = document.getElementById("go-back-arrow");
		addPostModal = document.getElementById("add-post-modal");
		tagDropDownDiv = document.getElementById("tag-drop-down");
		closeSearch = document.getElementById("close-tag-search-result");
		tagDiv = document.getElementById("tag-div-modal");
		spinner = document.getElementById("spinner-add-photo");
		imgDiv = document.getElementById("add-post-img-div");
	});

	useEffect(() => {
		addPostModal.addEventListener("click", (e) => {
			if (e.target === addPostModal) {
				closeAddPostModal();
			}
		});

		pic.addEventListener("click", (e) => {
			if (e.target === pic) {
				if (popUp.style.display === "flex") {
					addMorePicbutton.click();
				}
			}
		});
	}, []);

	useEffect(() => {
		handleDots();
		handlePopUpPic();
	});

	useEffect(() => {
		const label = document.getElementById("add-post-label");
		const spinner = document.getElementById("spinner-add-photo");
		const addPicPopUp = document.getElementById("add-pic-pop-up");

		handleArrows();

		if (img[0].src === "") {
			spinner.style.display = "none";
			imgDiv.style.display = "none";
			nextButton.style.display = "none";
			label.style.display = "flex";
		} else if (img[0].src !== "") {
			spinner.style.display = "none";
			label.style.display = "none";
			if (submitButton.style.display !== "flex") {
				nextButton.style.display = "flex";
			}
			imgDiv.style.display = "flex";
		}

		if (img.length >= 3) {
			addPicPopUp.style.display = "none";
		} else if (img.length < 3) {
			addPicPopUp.style.display = "flex";
		}
	}, [img, imgIndex]);

	function dataURLtoBlob(dataurl) {
		let arr = dataurl.split(","),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], { type: mime });
	}

	function submitPost() {
		imgDiv.style.display = "none";
		spinner.style.display = "flex";
		const storage = getStorage();

		const promises = img.map(async (i) => {
			const picImagesRef = ref(storage, "images/" + i.id);
			const snapshot = await uploadBytes(picImagesRef, dataURLtoBlob(i.src));
			return getDownloadURL(snapshot.ref);
		});

		Promise.all(promises).then((d) => {
			const post = {
				id: uniqid(),
				likes: { num: 0, users: [] },
				comments: [],
				username: props.yourUsername,
				description: captionValue,
				avatar: ava,
				pic: img.map((oldImg, index) => {
					return { ...oldImg, src: d[index] };
				}),
				date: Date.now(),
			};

			props.addPost(post);
			updateDoc(doc(getFirestore(), "usernames", props.firestoreDocId), { posts: arrayUnion(post) });

			img.forEach((i) => {
				i.tags.forEach((t) => {
					getDocId(t.username).then((id) => {
						if (t.username !== props.yourUsername) {
							updateDoc(doc(getFirestore(), "usernames", id), {
								notifications: arrayUnion({
									username: props.yourUsername,
									content: "tagged you in a post.",
									postID: post.id,
									date: Date.now(),
								}),
								unReadNoti: increment(1),
							});
						}
					});
				});
			});

			spinner.style.display = "none";
			closeAddPostModal();
		});
	}

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
		setImgIndex(imgIndex + 1);
		if (popUp.style.display === "flex") {
			addMorePicbutton.click();
		}
	}

	function prevPic() {
		setImgIndex(imgIndex - 1);
		if (popUp.style.display === "flex") {
			addMorePicbutton.click();
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
					setImg([{ id: uniqid(), src: reader.result, tags: [] }]);
				} else {
					setImg([...img, { id: uniqid(), src: reader.result, tags: [] }]);
				}
			};
			reader.readAsDataURL(img2);
			e.target.value = "";
		}
	}

	function removeImageFromModal(id) {
		if (img.length === 1) {
			setImg([{ src: "", tags: [] }]);
			addMorePicbutton.click();
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
			if (pic.id === id) {
				index = img.indexOf(pic);
			}
		});
		setImgIndex(index);
	}

	function closeAddPostModal() {
		window.history.back();
		addPostModal.style.display = "none";
		if (popUp.style.display === "flex") {
			addMorePicbutton.click();
		}
		addMorePicbutton.style.display = "flex";
		submitButton.style.display = "none";
		captionArea.style.display = "none";
		newPostHeader.style.display = "flex";
		captionAndTags.style.display = "none";
		pic.style.cursor = "default";
		goBackArrow.style.display = "none";
		tagDropDownDiv.style.display = "none";
		setSearchResults([]);
		setSearchValue("");
		setCaptionValue("");
		if (window.innerWidth > 650) {
			modal.style.height = "490px";
			pic.style.borderBottomLeftRadius = "12px";
			pic.style.borderBottomRightRadius = "12px";
		}
		setImgIndex(0);
		setImg([{ src: "", tags: [] }]);
	}

	function goToCaptionAndTag() {
		if (popUp.style.display === "flex") {
			addMorePicbutton.click();
		}
		addMorePicbutton.style.display = "none";
		nextButton.style.display = "none";
		submitButton.style.display = "flex";
		captionArea.style.display = "flex";
		newPostHeader.style.display = "none";
		captionAndTags.style.display = "flex";
		goBackArrow.style.display = "flex";
		tagDiv.style.display = "flex";
		pic.style.cursor = "crosshair";
		if (window.innerWidth > 650) {
			modal.style.height = "531px";
			pic.style.borderBottomLeftRadius = "0px";
			pic.style.borderBottomRightRadius = "0px";
		}
	}

	function backToAddPicture() {
		addMorePicbutton.style.display = "flex";
		submitButton.style.display = "none";
		nextButton.style.display = "flex";
		captionArea.style.display = "none";
		captionAndTags.style.display = "none";
		newPostHeader.style.display = "flex";
		goBackArrow.style.display = "none";
		tagDiv.style.display = "none";
		pic.style.cursor = "default";
		closeTagDropDown();
		if (window.innerWidth > 650) {
			modal.style.height = "490px";
			pic.style.borderBottomLeftRadius = "12px";
			pic.style.borderBottomRightRadius = "12px";
		}
	}

	function tagDropDown(e) {
		if (pic.style.cursor === "crosshair" && e.target.id === "img-img" && tagDropDownDiv.style.display === "flex") {
			closeTagDropDown();
		} else if (pic.style.cursor === "crosshair" && e.target.id === "img-img") {
			const x = Math.round(((e.nativeEvent.offsetX - 25) / e.nativeEvent.target.offsetWidth) * 100);
			const y = Math.round(((e.nativeEvent.offsetY + 5) / e.nativeEvent.target.offsetHeight) * 100);
			const tagArrow = document.getElementById("tag-arrow");

			setLocX(Math.round((e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100));

			if (e.nativeEvent.offsetY > 415) {
				setLocY(Math.round(((e.nativeEvent.offsetY - 33) / e.nativeEvent.target.offsetHeight) * 100));
			} else {
				setLocY(Math.round((e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100));
			}

			if (window.innerWidth > 650) {
				tagArrow.style.top = -6 + "px";
				tagDropDownDiv.style.left = x + "%";
				tagDropDownDiv.style.top = y + "%";

			} else {
				tagDropDownDiv.style.left = 0;
				tagDropDownDiv.style.top = "-42px";
				tagDropDownDiv.style.width = "100%";
				tagDropDownDiv.style.height = "100vh";
			}
            tagDropDownDiv.style.display = "flex";

            if (window.innerHeight - tagDropDownDiv.getBoundingClientRect().bottom < 0) {
                tagDropDownDiv.style.top = e.nativeEvent.offsetY - 240 + "px";
                tagArrow.style.top = 96.5 + "%";
            }
			
		}
	}

	function closeTagDropDown() {
		if (tagDropDownDiv.style.display === "flex") {
			tagDropDownDiv.style.display = "none";
			setSearchResults([]);
			setSearchValue("");
			closeSearch.style.display = "none";
		}
	}

	function removeTag(name) {
		setImg((prevImg) => {
			const newImg = prevImg.map((im) => {
				if (im.id === img[imgIndex].id) {
					return { ...im, tags: im.tags.filter((i) => i.username !== name) };
				}
				return im;
			});
			return newImg;
		});
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
					<span onClick={() => backToAddPicture()} id="go-back-arrow">
						{BackArrow()}
					</span>
					<span id="app-post-header-span">Create new post</span>
					<span id="caption-and-tag-span">Add caption and tags</span>
					<span onClick={() => goToCaptionAndTag()} id="add-post-next-span">
						Next
					</span>
					<span onClick={() => submitPost()} id="submit-span">
						Submit
					</span>
				</div>
				<div id="add-post-input-div" onClick={(e) => tagDropDown(e)}>
					<div id="spinner-add-photo">
						<FontAwesomeIcon
							style={{ height: "40px", width: "40px" }}
							icon={faSpinner}
							className="fa-spin"
						/>
					</div>
					<div {...handlers} id="add-post-img-div">
						<div id="tag-drop-down">
							<TagSearch
								searchResults={searchResults}
								searchValue={searchValue}
								setSearchValue={setSearchValue}
								setSearchResults={setSearchResults}
								locX={locX}
								locY={locY}
								img={img}
								setImg={setImg}
								imgIndex={imgIndex}
								closeTagDropDown={closeTagDropDown}
							/>
						</div>
						<img id="img-img" src={img[imgIndex].src} alt="" />
						<div id="tag-div-modal">
							{img[imgIndex].tags.map((tag) => {
								return (
									<div key={uniqid()} style={tagPosition(tag)} className="tag-div">
										<span>{tag.username}</span>
										<div onClick={() => removeTag(tag.username)} className="remove-tag-div">
											{SmallCloseIcon()}
										</div>
									</div>
								);
							})}
						</div>

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
										<img
											onClick={() => changePic(img.id)}
											className="pop-up-img"
											src={img.src}
											alt=""
										/>
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
				<div
					onClick={() => {
						closeTagDropDown();
					}}
					id="caption-input-div"
				>
					<CaptionArea captionValue={captionValue} setCaptionValue={setCaptionValue} />
				</div>
			</div>
		</div>
	);
}

function TagSearch(props) {
	let closeSearch;

	useEffect(() => {
		closeSearch = document.getElementById("close-tag-search-result");
	});

	function cancelSearch() {
		props.setSearchResults([]);
		props.setSearchValue("");
		closeSearch.style.display = "none";
	}

	function handleSearch(e) {
		const spinner = document.getElementById("spinner-tag");
		const smallSpinner = document.getElementById("small-spinner-tag");

		props.setSearchValue(e.target.value);

		if (e.target.value !== "") {
			if (props.searchResults.length === 0) {
				spinner.style.display = "flex";
			}

			closeSearch.style.display = "none";
			smallSpinner.style.display = "flex";

			searchFunction(e.target.value).then((result) => {
				smallSpinner.style.display = "none";
				spinner.style.display = "none";

				props.setSearchResults(result);
				closeSearch.style.display = "flex";
			});
		} else if (e.target.value === "") {
			props.setSearchResults([]);
			closeSearch.style.display = "none";
		}
	}

	function addTag(name) {
		props.setImg((prevImg) => {
			const newImg = prevImg.map((img) => {
				if (img.id === props.img[props.imgIndex].id) {
					if (img.tags.some((e) => e.username === name)) {
						const updatedTags = img.tags.filter((tag) => tag.username !== name);
						return {
							...img,
							tags: [...updatedTags, { username: name, locY: props.locY, locX: props.locX }],
						};
					}
					return { ...img, tags: [...img.tags, { username: name, locY: props.locY, locX: props.locX }] };
				}
				return img;
			});
			return newImg;
		});
		props.closeTagDropDown();
	}

	return (
		<>
			<div id="tag-arrow"></div>
			<div id="tag-input-div">
				<span id="close-tag-drop-down-mobile" onClick={() => props.closeTagDropDown()}>
					{CloseModalIcon(() => {})}
				</span>
				<span>Tag:</span>
				<input
					type="text"
					value={props.searchValue}
					onChange={(e) => handleSearch(e)}
					autoComplete="off"
					placeholder="Search"
				/>
				<div onClick={() => cancelSearch()} id="close-tag-search-result">
					<FontAwesomeIcon icon={faCircleXmark} />
				</div>
				<div id="small-spinner-tag">
					<FontAwesomeIcon icon={faSpinner} className="fa-spin" />
				</div>
			</div>
			<div id="tag-search-results-div">
				{props.searchResults.map((result) => {
					return (
						<div onClick={() => addTag(result)} key={uniqid()} className="share-modal-single-result">
							<img src={ava} alt="" />
							<span>{result}</span>
						</div>
					);
				})}
				<div id="spinner-tag">
					<FontAwesomeIcon icon={faSpinner} className="fa-spin" />
				</div>
			</div>
		</>
	);
}

function CaptionArea(props) {
	function handleCaptionTextAreaChange(e) {
		props.setCaptionValue(e.target.value);
	}

	function handleCaptionEmoji(e, emojiObject) {
		const textarea = document.getElementById("caption-textarea");
		props.setCaptionValue(textarea.value + emojiObject.emoji);
	}

	function showEmojiiPicker(e) {
		function hideEmojiiPicker(e) {
			let found = false;

			e.path.forEach((ele) => {
				if (ele.id === "caption-emoji" || ele.id === "idsvg" || ele.id === "idpath") {
					found = true;
				}
			});

			if (!found) {
				ReactDOM.unmountComponentAtNode(document.getElementById("caption-emoji"));
				window.removeEventListener("click", hideEmojiiPicker);
			}
		}

		if (!document.getElementById("caption-emoji").firstChild) {
			render(
				<Picker
					preload={false}
					natvie={false}
					disableSearchBar={true}
					pickerStyle={{ position: "absolute", bottom: "35px", left: "0px" }}
					onEmojiClick={(e, emojiObject) => handleCaptionEmoji(e, emojiObject)}
				/>,
				document.getElementById("caption-emoji")
			);

			window.addEventListener("click", hideEmojiiPicker);
		} else if (e.target.tagName === "svg" || e.target.tagName === "path") {
			ReactDOM.unmountComponentAtNode(document.getElementById("caption-emoji"));
		}
	}

	return (
		<>
			<div onClick={(e) => showEmojiiPicker(e)} id="caption-emoji-icon-div" className="emoji-div">
				<div id="caption-emoji"></div>
				{EmojiiIcon("id")}
			</div>
			<textarea
				id="caption-textarea"
				value={props.captionValue}
				onChange={(e) => handleCaptionTextAreaChange(e)}
				placeholder="Write a caption..."
				className="add-comment-text-area"
				autoComplete="off"
			></textarea>
		</>
	);
}

function showAddPostModal() {
	const addPostModal = document.getElementById("add-post-modal");
	if (!window.location.href.includes("addPostM")) {
		window.history.pushState("addPostM", "Title", "addPostM");
	}
	addPostModal.style.display = "flex";
}

function tagPosition(info) {
	let position;


	if (info.locX > 60) {
		position = {
			right: 100 - info.locX + "%",
			top: info.locY + "%"
		};
        
	} else {
		position = { left: info.locX + "%", top: info.locY + "%"};
	}


	return position;
}

export default AddPostModal;
export { showAddPostModal, tagPosition };
