import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    status: "idle",
    error: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
};

const loginURL = "http://localhost:5999/api/v1/auth/login";
const logoutURL = "http://localhost:5999/api/v1/auth/logout";
const ratingURL = "http://localhost:5999/api/v1/novel/rating";

export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async (userData, { rejectWithValue }) => {
        try {
            const { email, password } = userData;
            const response = await axios.post(
                loginURL,
                { email, password },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logoutUser = createAsyncThunk(
    "user/logoutUser",
    async (userData, { rejectWithValue }) => {
        try {
            const { user_id } = userData;
            const response = await axios.post(
                logoutURL,
                { user_id },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearTokens: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload.data;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                if (
                    action.payload.status === 200 &&
                    action.payload.success === true
                ) {
                    state.status = "succeeded";
                    state.data = action.payload;

                    state.accessToken = action.payload.accessToken;
                    state.refreshToken = action.payload.refreshToken;
                    state.isAuthenticated = true;
                } else {
                    state.status = "failed";
                    state.error = action.error;
                }
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                if (
                    action.payload.status === 200 &&
                    action.payload.success === true
                ) {
                    state.status = "succeeded";
                    state.data = action.payload;

                    state.accessToken = null;
                    state.refreshToken = null;
                    state.isAuthenticated = false;
                } else {
                    state.status = "failed";
                    state.error = action.error;
                }
            });
    },
});
export const getUser = (state) => state.user.data;
export const getStatus = (state) => state.user.status;
export const getError = (state) => state.user.error;
export const isAuthenticated = (state) => state.user.isAuthenticated;

export const { clearTokens } = userSlice.actions;
export default userSlice.reducer;
