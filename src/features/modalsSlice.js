import { createSlice } from "@reduxjs/toolkit";

export const modalsSlice = createSlice({
	name: "modals",
	initialState: {
		userDataDropDown: "",
		likesForLikesModal: [],
		likesModalInfo: "Likes",
		userDataOptionsModal: "",
		postIdOptionsModal: "",
		optionsEdit: false,
		commModalPostId: "",
	},
	reducers: {
		setUserDataDropDown: (state, action) => {
			state.userDataDropDown = action.payload;
		},
		setLikesForLikesModal: (state, action) => {
			state.likesForLikesModal = action.payload;
		},
		setLikesModalInfo: (state, action) => {
			state.likesModalInfo = action.payload;
		},
		setUserDataOptionsModal: (state, action) => {
			state.userDataOptionsModal = action.payload;
		},
		setPostIdOptionsModal: (state, action) => {
			state.postIdOptionsModal = action.payload;
		},
		setOptionsEdit: (state, action) => {
			state.optionsEdit = action.payload;
		},
		setCommModalPostId: (state, action) => {
			state.commModalPostId = action.payload;
		},
	},
});

export const {
	setUserDataDropDown,
	setLikesForLikesModal,
	setLikesModalInfo,
	setUserDataOptionsModal,
	setPostIdOptionsModal,
	setOptionsEdit,
	setCommModalPostId,
} = modalsSlice.actions;

export default modalsSlice.reducer;
