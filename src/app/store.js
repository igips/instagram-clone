import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/signedInSlice";

export default configureStore({
	reducer: {
		user: userReducer,
	},
});
