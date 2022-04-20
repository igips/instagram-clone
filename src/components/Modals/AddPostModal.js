import { useEffect, useState } from "react";
import { CloseIcon, CloseModalIcon, SmallCloseIcon } from "../Icons/CloseIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import uniqid from "uniqid";
import { BackArrow } from "../Icons/ArrowIcons";
import ReactDOM, { render } from "react-dom";
import Picker from "emoji-picker-react";
import { EmojiiIcon } from "../Icons/EmojiiIcon";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import ava from "../../img/ava.jpeg";
import { getDocId, searchFunction } from "../..";
import { arrayUnion, doc, getFirestore, updateDoc, increment, arrayRemove } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getPostDataFromPostsArray } from "../Home";

function AddPostModal(props) {
	const [img, setImg] = useState({ src: "", tags: [] });
	const [searchValue, setSearchValue] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [captionValue, setCaptionValue] = useState("");
	const [locX, setLocX] = useState();
	const [locY, setLocY] = useState();

	let nextButton;
	let submitButton;
	let captionArea;
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
	let label;
	let editSpan;

	useEffect(() => {
		nextButton = document.getElementById("add-post-next-span");
		submitButton = document.getElementById("submit-span");
		captionArea = document.getElementById("caption-input-div");
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
		label = document.getElementById("add-post-label");
		editSpan = document.getElementById("edit-span");
	});

	useEffect(() => {
		addPostModal.addEventListener("click", (e) => {
			if (e.target === addPostModal) {
				props.setOptionsEdit(false);
				closeAddPostModal();
			}
		});
	}, []);

	useEffect(() => {
		const spinner = document.getElementById("spinner-add-photo");

		if (img.src === "") {
			spinner.style.display = "none";
			imgDiv.style.display = "none";
			nextButton.style.display = "none";
			label.style.display = "flex";
		} else if (img.src !== "") {
			spinner.style.display = "none";
			label.style.display = "none";
			if (submitButton.style.display !== "flex") {
				nextButton.style.display = "flex";
			}
			imgDiv.style.display = "flex";
		}

		if (props.optionsEdit) {
			goToCaptionAndTag();
			captionAndTags.style.display = "none";
			editSpan.style.display = "flex";
		}
	}, [img]);

	useEffect(() => {
		if (props.optionsEdit) {
			const post = getPostDataFromPostsArray(props.posts, props.postIdOptionsModal);
			setImg({ src: post.pic.src, tags: post.pic.tags });
			setCaptionValue(post.description);
			setTimeout(showAddPostModal, 50);
		}
	}, [props.optionsEdit]);

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

	async function submitPost() {
		imgDiv.style.display = "none";
		spinner.style.display = "flex";

		if (!props.optionsEdit) {
			const id = uniqid();
			const storage = getStorage();

			const picImagesRef = ref(storage, "images/" + id);
			const snapshot = await uploadBytes(picImagesRef, dataURLtoBlob(img.src));
			const url = await getDownloadURL(snapshot.ref);

			img.src = url;

			const post = {
				id: id,
				likes: { num: 0, users: [] },
				comments: [],
				username: props.yourUsername,
				description: captionValue,
				pic: img,
				date: Date.now(),
			};

			props.addPost(post);
			updateDoc(doc(getFirestore(), "usernames", props.firestoreDocId), { posts: arrayUnion(post) });

			img.tags.forEach((t) => {
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
		} else {
			editPost();
		}

		spinner.style.display = "none";
		closeAddPostModal();
	}

	function editPost() {
		editSpan.style.display = "none";
		const post = getPostDataFromPostsArray(props.posts, props.postIdOptionsModal);

		props.setPosts((oldPosts) => {
			const newPosts = oldPosts.map((post) => {
				if (post.id === props.postIdOptionsModal) {
					return { ...post, pic: img, description: captionValue };
				}
				return post;
			});

			return newPosts;
		});

		const oldTags = [];

		post.pic.tags.forEach((tag) => {
			oldTags.push(tag.username);
		});

		updateDoc(doc(getFirestore(), "usernames", props.firestoreDocId), { posts: arrayRemove(post) });

		const newPost = {
			id: post.id,
			likes: post.likes,
			comments: post.comments,
			username: props.yourUsername,
			description: captionValue,
			pic: img,
			date: post.date,
		};

		updateDoc(doc(getFirestore(), "usernames", props.firestoreDocId), { posts: arrayUnion(newPost) });

		img.tags.forEach((tag) => {
			if (!oldTags.includes(tag.username) && tag.username !== props.yourUsername) {
				getDocId(tag.username).then((id) => {
					updateDoc(doc(getFirestore(), "usernames", id), {
						notifications: arrayUnion({
							username: props.yourUsername,
							content: "tagged you in a post.",
							postID: post.id,
							date: Date.now(),
						}),
						unReadNoti: increment(1),
					});
				});
			}
		});
		props.setOptionsEdit(false);
	}

	function handleImage(e) {
		if (img.src === "") {
			document.getElementById("add-post-label").style.display = "none";
			document.getElementById("spinner-add-photo").style.display = "flex";
		}

		if (e.target.files[0]) {
			const img2 = e.target.files[0];
			const reader = new FileReader();
			reader.onload = () => {
				if (img.src === "") {
					setImg({ src: reader.result, tags: [] });
				} else {
					setImg({ src: reader.result, tags: [] });
				}
			};
			reader.readAsDataURL(img2);
			e.target.value = "";
		}
	}

	function closeAddPostModal() {
		window.history.back();
		addPostModal.style.display = "none";
		submitButton.style.display = "none";
		captionArea.style.display = "none";
		newPostHeader.style.display = "flex";
		captionAndTags.style.display = "none";
		pic.style.cursor = "default";
		goBackArrow.style.display = "none";
		tagDropDownDiv.style.display = "none";
		editSpan.style.display = "none";
		setSearchResults([]);
		setSearchValue("");
		setCaptionValue("");
		if (window.innerWidth > 650) {
			modal.style.height = "490px";
			pic.style.borderBottomLeftRadius = "12px";
			pic.style.borderBottomRightRadius = "12px";
		}
		setImg({ src: "", tags: [] });
	}

	function goToCaptionAndTag() {
		nextButton.style.display = "none";
		submitButton.style.display = "flex";
		captionArea.style.display = "flex";
		newPostHeader.style.display = "none";
		captionAndTags.style.display = "flex";
		if (!props.optionsEdit) {
			goBackArrow.style.display = "flex";
		}
		tagDiv.style.display = "flex";
		pic.style.cursor = "crosshair";
		if (window.innerWidth > 650) {
			modal.style.height = "531px";
			pic.style.borderBottomLeftRadius = "0px";
			pic.style.borderBottomRightRadius = "0px";
		}
	}

	function backToAddPicture() {
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
			const newImg = { ...prevImg, tags: prevImg.tags.filter((i) => i.username !== name) };
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
					<span
						onClick={() => {
							props.setOptionsEdit(false);
							closeAddPostModal();
						}}
						id="add-post-close-mobile"
					>
						{CloseModalIcon(() => {})}
					</span>
					<span onClick={() => backToAddPicture()} id="go-back-arrow">
						{BackArrow()}
					</span>
					<span id="app-post-header-span">Create new post</span>
					<span id="caption-and-tag-span">Add caption and tags</span>
					<span id="edit-span">Edit</span>
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
					<div id="add-post-img-div">
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
								closeTagDropDown={closeTagDropDown}
							/>
						</div>
						<img id="img-img" src={img.src} alt="" />
						<div id="tag-div-modal">
							{img.tags.map((tag) => {
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
			if (prevImg.tags.some((e) => e.username === name)) {
				const updatedTags = prevImg.tags.filter((tag) => tag.username !== name);
				return { ...prevImg, tags: [...updatedTags, { username: name, locY: props.locY, locX: props.locX }] };
			} else {
				return { ...prevImg, tags: [...prevImg.tags, { username: name, locY: props.locY, locX: props.locX }] };
			}
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
			top: info.locY + "%",
		};
	} else {
		position = { left: info.locX + "%", top: info.locY + "%" };
	}

	return position;
}

export default AddPostModal;
export { showAddPostModal, tagPosition };
