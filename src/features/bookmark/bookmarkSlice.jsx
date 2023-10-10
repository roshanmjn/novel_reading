import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    single: [],
    action: [],
    status: "idle",
    error: null,
};

const bookmarkURL = "http://localhost:5999/api/v1/user/bookmark";
const singleBookmarkURL = "http://localhost:5999/api/v1/user/onebookmark";
const addBookmarkURL = "http://localhost:5999/api/v1/user/addbookmark";
const removeBookmarkURL = "http://localhost:5999/api/v1/user/removebookmark";

export const fetchBookmark = createAsyncThunk(
    "bookmark/fetchBookmark",
    async (userData, { rejectWithValue }) => {
        try {
            const { user_id } = userData;
            const response = await axios.post(
                bookmarkURL,
                { user_id },
                { withCredentials: true }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const fetchSingleBookmark = createAsyncThunk(
    "bookmark/fetchSingleBookmark",
    async (userData, { rejectWithValue }) => {
        try {
            const { user_id, novel_title } = userData;
            const response = await axios.post(
                singleBookmarkURL,
                { user_id, novel_title },
                { withCredentials: true }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addBookmark = createAsyncThunk(
    "bookmark/addBookmark",
    async (userData, { rejectWithValue }) => {
        try {
            const { novel_title, user_id } = userData;
            console.log(userData);
            const response = await axios.post(
                addBookmarkURL,
                { novel_title, user_id },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const removeBookmark = createAsyncThunk(
    "bookmark/removeBookmark",
    async (userData, { rejectWithValue }) => {
        try {
            const { novel_title, user_id } = userData;
            const response = await axios.post(
                removeBookmarkURL,
                { user_id, novel_title },
                { withCredentials: true }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const bookmarkSlice = createSlice({
    name: "bookmark",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookmark.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBookmark.rejected, (state, action) => {
                console.log(action.payload);
                state.status = "failed";
                state.error = action.payload.data;
            })
            .addCase(fetchBookmark.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
                // console.log({ x: state.data });
            })
            .addCase(fetchSingleBookmark.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.single = action.payload;
            })
            .addCase(addBookmark.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.action = action.payload;
            })
            .addCase(removeBookmark.fulfilled, (state, action) => {
                if (!action.payload.success === true) {
                    return;
                }
                state.status = "succeeded";
                const data = state.data.data.filter(
                    (item) => item.novel_title !== action.payload.novel_title
                );

                state.data.data = [...data];
                state.action = [action.payload];
            });
    },
});
export const getBookmark = (state) => state.bookmark.data;
export const getSingleBookmark = (state) => state.bookmark.single;
export const getChanges = (state) => state.bookmark.action;
export const getStatus = (state) => state.bookmark.status;
export const getError = (state) => state.bookmark.error;

export default bookmarkSlice.reducer;
