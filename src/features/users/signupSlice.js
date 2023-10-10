import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    status: "idle",
    error: null,
};

const signupURL = "http://localhost:5999/api/v1/auth/signup";

export const createUser = createAsyncThunk(
    "signup/createUser",
    async (userData, { rejectWithValue }) => {
        try {
            const { first_name, last_name, email, password, confirm_password } =
                userData;

            const response = await axios.post(
                signupURL,
                { first_name, last_name, email, password, confirm_password },
                { withCredentials: true }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload.data;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                if (
                    action.payload.statusCode === 200 &&
                    action.payload.status === "conflict"
                ) {
                    console.log("hey do");
                    state.status = "succeeded";
                    state.data = { message: action.payload?.message };
                } else {
                    state.status = "succeeded";
                    state.data = action.payload;
                }
            });
    },
});
export const getUser = (state) => state.signup.data;
export const getStatus = (state) => state.signup.status;
export const getError = (state) => state.signup.error;

export default signupSlice.reducer;
