import "../styles/Inbox.css";
import { NewMessageIcon } from "./Icons/MessageIcon";
import ava from "../img/ava.jpeg";
import ReactTimeAgo from "react-time-ago";
import trash from "../img/trash.png";
import { EmojiiIcon } from "./Icons/EmojiiIcon";
import { useEffect, useState } from "react";
import ReactDOM, { render } from "react-dom";
import Picker from "emoji-picker-react";
import { getUserDataFromUsersArray } from "./Home";
import uniqid from "uniqid";
import { getDocId } from "..";
import { arrayRemove, arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { showShareModal } from "./Modals/ShareModal";

function Inbox(props) {
	const [messageValue, setMessageValue] = useState("");
	const [activeMessage, setActiveMessage] = useState({ conversation: [] });
	const [activeMessageUser, setActiveMessageUser] = useState({ avatar: "", username: "" });

	const [messageSent, setMessageSent] = useState(false);

	useEffect(() => {
		if (messageSent) {
			getDocId(activeMessageUser.username).then(async (id) => {
				await updateDoc(doc(getFirestore(), "usernames", id), { messages: arrayUnion(activeMessage) });
				await updateDoc(doc(getFirestore(), "usernames", props.firestoreDocId), {
					messages: arrayUnion(activeMessage),
				});
				setMessageSent(false);
			});
		}
	}, [messageSent]);

	useEffect(() => {
		for (let m of props.messages) {
			if (m.username === activeMessageUser.username || m.username2 === activeMessageUser.username) {
				setActiveMessage(m);
				break;
			}
		}
	}, [props.messages]);

	useEffect(() => {
		const div = document.getElementById("inbox-send-message-info");
		const conversation = document.getElementById("inbox-right-conversation");

		if (activeMessage.conversation.length > 0) {
			div.style.display = "none";
			conversation.style.display = "flex";

			const scroll = document.getElementById("inbox-right-conversation-area");
			scroll.scrollTop = scroll.scrollHeight;
		} else {
			conversation.style.display = "none";
			div.style.display = "flex";
		}
	}, [activeMessage]);

	useEffect(() => {
		const conv = Array.from(document.querySelectorAll(".conversation-div"));

		conv.forEach((c) => {
			if (c.childNodes[1].childNodes[0].textContent === activeMessageUser.username) {
				c.style.background = "#efefef";
			} else {
				c.style.background = "none";
			}
		});
	});

	function deleteConversation() {
		updateDoc(doc(getFirestore(), "usernames", props.firestoreDocId), {
			messages: arrayRemove(activeMessage),
		});
		setActiveMessage({ conversation: [] });
		props.setMessages((oldMessages) => {
			const newMessages = oldMessages.filter(
				(mes) => mes.username !== activeMessageUser.username && mes.username2 !== activeMessageUser.username
			);
			return newMessages;
		});
		setActiveMessageUser({ avatar: "", username: "" });
	}

	function submitComment(e) {
		e.preventDefault();
		const button = document.getElementById("inbox-button");

		getDocId(activeMessageUser.username).then(async (id) => {
			const db = getFirestore();
			updateDoc(doc(db, "usernames", id), { messages: arrayRemove(activeMessage) });
			updateDoc(doc(db, "usernames", props.firestoreDocId), { messages: arrayRemove(activeMessage) });

			setActiveMessage({
				...activeMessage,
				conversation: [
					...activeMessage.conversation,
					{ date: Date.now(), username: props.yourUsername, text: messageValue },
				],
			});

			setMessageSent(true);
		});

		if (button.classList.contains("post-div-active")) {
			setMessageValue("");
			button.classList.remove("post-div-active");
			button.disabled = true;
		}
	}

	function showEmojiiPicker(e) {
		function hideEmojiiPicker(e) {
			let found = false;

			e.path.forEach((ele) => {
				if (ele.id === "inbox-emo" || ele.id === "inbox-emosvg" || ele.id === "inbox-emopath") {
					found = true;
				}
			});

			if (!found) {
				ReactDOM.unmountComponentAtNode(document.getElementById("inbox-emo"));
				window.removeEventListener("click", hideEmojiiPicker);
			}
		}

		if (!document.getElementById("inbox-emo").firstChild) {
			render(
				<Picker
					natvie={true}
					disableSearchBar={true}
					pickerStyle={{ position: "absolute", bottom: "35px", left: "0px" }}
					onEmojiClick={(e, emojiObject) => handleCommentEmoji(e, emojiObject)}
				/>,
				document.getElementById("inbox-emo")
			);

			window.addEventListener("click", hideEmojiiPicker);
		} else if (e.target.tagName === "svg" || e.target.tagName === "path") {
			ReactDOM.unmountComponentAtNode(document.getElementById("inbox-emo"));
		}
	}

	function handleCommentEmoji(e, emojiObject) {
		const textarea = document.getElementById("inbox-text");
		setMessageValue(textarea.value + emojiObject.emoji);

		const button = document.getElementById("inbox-button");

		if (!button.classList.contains("post-div-active")) {
			button.classList.add("post-div-active");
			button.disabled = false;
		}
	}

	function handleMessageTextAreaChange(e) {
		setMessageValue(e.target.value);

		const button = document.getElementById("inbox-button");

		if (e.target.value !== "" && !button.classList.contains("post-div-active")) {
			button.classList.add("post-div-active");
			button.disabled = false;
		} else if (e.target.value === "") {
			button.classList.remove("post-div-active");
			button.disabled = true;
		}
	}

	function writeMessage() {
		return (
			<section className="add-comment-section">
				<div className="add-comment-section-inner">
					<form
						onKeyDown={(e) => {
							if (e.key === "Enter") submitComment(e);
						}}
						onSubmit={(e) => submitComment(e)}
						className="comment-form"
					>
						<div onClick={(e) => showEmojiiPicker(e)} className="emoji-div">
							<div id="inbox-emo"></div>
							{EmojiiIcon("inbox-emo")}
						</div>
						<textarea
							id={"inbox-text"}
							value={messageValue}
							onChange={(e) => handleMessageTextAreaChange(e)}
							placeholder="Write a message…"
							className="add-comment-text-area"
							autoComplete="off"
						></textarea>
						<button id={"inbox-button"} className="post-div" disabled>
							Post
						</button>
					</form>
				</div>
			</section>
		);
	}

	return (
		<main>
			<section id="inbox-section">
				<div id="inbox-left">
					<div id="inbox-left-header">
						<span>{props.yourUsername}</span>
						<span onClick={() => showShareModal()} id="new-message-icon-span">
							{NewMessageIcon()}
						</span>
					</div>
					<div id="inbox-message-list">
						{props.messages.map((message) => {
							const userData = getUserDataFromUsersArray(
								props.users,
								message.username === props.yourUsername ? message.username2 : message.username
							);

							return (
								<div
									onClick={() => {
										setActiveMessage(message);
										setActiveMessageUser(userData);
									}}
									key={uniqid()}
									className="conversation-div"
								>
									<img src={userData.avatar ? userData.avatar : ava} alt="" />
									<div className="conversation-div-info">
										<div className="conversation-div-username">
											{message.username === props.yourUsername
												? message.username2
												: message.username}
										</div>
										<div className="conversation-div-message">
											{message.conversation[message.conversation.length - 1].text}
										</div>
									</div>
									<ReactTimeAgo
										timeStyle="mini-minute"
										date={message.conversation[message.conversation.length - 1].date}
										locale="en-US"
									/>
								</div>
							);
						})}
					</div>
				</div>
				<div id="inbox-right">
					<div id="inbox-send-message-info">
						<span>Your Messages</span>
						<button>Send Message</button>
					</div>

					<div id="inbox-right-conversation">
						<div id="inbox-right-conversation-header">
							<Link style={{ display: "flex" }} to={`/profile/${activeMessageUser.username}`}>
								<img
									id="conversation-header-avatar"
									src={activeMessageUser.avatar ? activeMessageUser.avatar : ava}
									alt=""
								/>
							</Link>
							<Link to={`/profile/${activeMessageUser.username}`}>
								<div id="conversation-header-username">{activeMessageUser.username}</div>
							</Link>
							<img
								onClick={() => deleteConversation()}
								id="conversation-header-delete"
								src={trash}
								alt=""
							/>
						</div>
						<div id="inbox-right-conversation-area">
							{activeMessage.conversation.map((conv) => {
								if (conv.username === props.yourUsername) {
									return (
										<div key={uniqid()} className="conversation-row">
											<div className="conversation-cloud-right">{conv.text}</div>
										</div>
									);
								} else {
									return (
										<div key={uniqid()} className="conversation-row">
											<Link
												style={{ display: "flex", cursor: "default" }}
												to={`/profile/${activeMessageUser.username}`}
											>
												<img
													src={activeMessageUser.avatar ? activeMessageUser.avatar : ava}
													alt=""
													className="messages-avatars"
												/>
											</Link>
											<div className="conversation-cloud-left">{conv.text}</div>
										</div>
									);
								}
							})}
						</div>
						<div id="inbox-right-add-message">{writeMessage()}</div>
					</div>
				</div>
			</section>
		</main>
	);
}

export default Inbox;
