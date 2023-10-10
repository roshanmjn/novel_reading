import {
    createSlice,
    createAsyncThunk,
    createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    single: [],
    status: "idle",
    error: null,
};

const baseURL = "http://localhost:5999/api/v1/novel/most-popular";
const novelDescURL = "http://localhost:5999/api/v1/novel/";

export const fetchNovel = createAsyncThunk("novel/fetchAll", async () => {
    const response = await axios.get(baseURL);
    // console.log(response);
    return response.data;
});
export const fetchSingleChapter = createAsyncThunk(
    "novel/fetchOne",
    async (initialNovels) => {
        const { novelTitle, page = 1 } = initialNovels;
        const response = await axios.get(
            `${novelDescURL}${novelTitle}/${page}`
        );
        // console.log(response);
        return response.data;
    }
);

const novelSlice = createSlice({
    name: "novel",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNovel.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchNovel.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchNovel.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchSingleChapter.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchSingleChapter.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchSingleChapter.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.single = action.payload;
            });
    },
});

export const selectAllNovels = (state) => {
    // console.log(" all novels");
    return state.novel.data;
};
export const getNovelStatus = (state) => state.novel.status;
export const selectSingleNovel = (state) => {
    // console.log("single novels");
    return state.novel.single;
};

export const selectMemoizedSingleNovel = createSelector(
    (state) => state.novel.single,
    (data) => {
        // console.log("memoized novels");
        return data;
    }
);
export default novelSlice.reducer;
