import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    action: [],
    actionStatus: "idle",
    status: "idle",
    error: null,
};

const commentURL = "http://localhost:5999/api/v1/comment";
const addCommentURL = "http://localhost:5999/api/v1/comment/add";

export const fetchComment = createAsyncThunk(
    "comment/fetchComment",
    async (userData, { rejectWithValue }) => {
        try {
            const { novel_title } = userData;

            const response = await axios.post(
                commentURL,
                { novel_title },
                { withCredentials: true }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addComment = createAsyncThunk(
    "comment/addComment",
    async (userData, { rejectWithValue }) => {
        try {
            const { novel_title, user_id, comment } = userData;
            const response = await axios.post(
                addCommentURL,
                { novel_title, user_id, comment },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComment.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchComment.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload.data;
            })
            .addCase(fetchComment.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                if (
                    action.payload.status === 200 &&
                    action.payload.success === true
                ) {
                    state.actionStatus = "succeeded";
                    state.action = action.payload;
                } else {
                    state.actionStatus = "failed";
                    state.error = action.error;
                }
            });
    },
});
export const getcomment = (state) => state.comment.data;
export const getActions = (state) => state.comment.action;
export const getStatus = (state) => state.comment.status;
export const getError = (state) => state.comment.error;

export default commentSlice.reducer;
