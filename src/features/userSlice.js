import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		signedIn: false,
	},
	reducers: {
		setSignedIn: (state, action) => {
			state.signedIn = action.payload;
		},
	},
});

export const { setSignedIn } = userSlice.actions;

export default userSlice.reducer;
