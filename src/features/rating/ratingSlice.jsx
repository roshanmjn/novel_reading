import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    status: "idle",
    error: null,
};

const ratingURL = "http://localhost:5999/api/v1/user/rating";
const addRatingURL = "http://localhost:5999/api/v1/user/addrating";

export const fetchRating = createAsyncThunk(
    "rating/fetchRating",
    async (userData, { rejectWithValue }) => {
        try {
            const { novel_title, user_id } = userData;
            const response = await axios.post(
                ratingURL,
                { novel_title, user_id },
                { withCredentials: true }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addRating = createAsyncThunk(
    "rating/addRating",
    async (userData, { rejectWithValue }) => {
        try {
            const { novel_title, user_id, rating } = userData;
            const response = await axios.post(
                addRatingURL,
                { novel_title, user_id, rating },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const ratingSlice = createSlice({
    name: "rating",
    initialState,
    reducers: {
        resetRatingState: (state) => {
            state.data = [];
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRating.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchRating.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload.data;
            })
            .addCase(fetchRating.fulfilled, (state, action) => {
                if (
                    action.payload.status === 200 &&
                    action.payload.success === true
                ) {
                    state.status = "succeeded";
                    state.data = action.payload;
                } else {
                    state.status = "failed";
                    state.error = action.error;
                }
            })
            .addCase(addRating.fulfilled, (state, action) => {
                if (
                    action.payload.status === 200 &&
                    action.payload.success === true
                ) {
                    state.status = "succeeded";
                    state.data = action.payload;
                } else {
                    state.status = "failed";
                    state.error = action.error;
                }
            });
    },
});
export const getRating = (state) => state.rating.data;
export const getStatus = (state) => state.rating.status;
export const getError = (state) => state.rating.error;

export const { resetRatingState } = ratingSlice.actions;
export default ratingSlice.reducer;
