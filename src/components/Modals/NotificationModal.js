import ReactTimeAgo from "react-time-ago";
import { followButtonForNoti } from "../Nav";
import uniqid from "uniqid";
import ava from "../../img/ava.jpeg";
import { useEffect } from "react";
import { closeModal } from "../Modals";


function NotificationModal(props) {
	useEffect(() => {
		if (props.notifications.length === 0) {
			document.getElementById("no-notifications-modal").style.display = "flex";
		} else {
			document.getElementById("no-notifications-modal").style.display = "none";
		}
	}, [props.notifications]);

	function hideNotificationsModal() {
		const modal = document.getElementById("notification-modal-container");
		modal.style.display = "none";
		window.history.back();
	}

	return (
		<div id="notification-modal-container">
			<div id="notification-modal-header">
				<span>Notifications</span>
				{closeModal(hideNotificationsModal)}
			</div>
			<div id="notifications-modal-noti">
				<div id="no-notifications-modal">No notifications</div>
				{props.notifications
					.slice(0)
					.reverse()
					.map((result) => {
						return (
							<div key={uniqid()} className="noti-modal-single-result-mobile">
								<img src={ava} alt="" />
								<div>
									<span className="noti-mobile-user-span">{result.username + " "}</span>
									{result.content + " "}
									<span className="noti-date-mobile">
										<ReactTimeAgo
											timeStyle="mini-minute-now"
											date={new Date(result.date)}
											locale="en-US"
										/>
									</span>
								</div>
								{followButtonForNoti(
									result.username,
									props.following,
									props.username,
									props.follow,
									props.unFollow
								)}
							</div>
						);
					})}
			</div>
		</div>
	);
}


export default NotificationModal