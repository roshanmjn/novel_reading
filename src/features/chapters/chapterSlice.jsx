import {
    createSlice,
    createAsyncThunk,
    createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    status: "idle",
    error: null,
};
const baseURL = "http://localhost:5999/api/v1/novel/";

export const fetchChapter = createAsyncThunk(
    "chapter/fetchOne",
    async (initialChapters) => {
        try {
            const { novelTitle, chapterId } = initialChapters;
            const response = await axios.get(
                `${baseURL}${novelTitle}/chapter-${chapterId}`
            );
            // console.log(response);
            return response.data;
        } catch (error) {
            console.log("error", error);
        }
    }
);

const chapterSlice = createSlice({
    name: "chapter",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChapter.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchChapter.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchChapter.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            });
    },
});
export const getChapterStatus = (state) => {
    return state.chapter.status;
};
export const getChapterData = (state) => {
    console.log("chapterdata");
    return state.chapter.data;
};
export const getChapterError = (state) => state.chapter.error;

export const getMemoizedChapterData = createSelector(
    (state) => state.chapter.data,
    (data) => {
        console.log("chapterdataMemo");
        return data;
    }
);

export default chapterSlice.reducer;
