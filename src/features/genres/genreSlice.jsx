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
const baseURL = "http://localhost:5999/api/v1/genre";
const fetchOneURL = "http://localhost:5999/api/v1/genre/";

export const fetchGenre = createAsyncThunk("genre/fetchAll", async () => {
    try {
        const response = await axios.get(baseURL);
        // console.log(response);
        return response.data;
    } catch (error) {
        console.log("error", error);
        throw err;
    }
});
export const fetchOneGenre = createAsyncThunk(
    "genre/fetchOne",
    async (data) => {
        try {
            const { genreTitle, page = 1 } = data;

            const url = fetchOneURL + genreTitle + "/" + page;
            console.log(url);
            const response = await axios.get(url);

            // console.log(url);
            return response.data;
        } catch (error) {
            throw err;
        }
    }
);

const genreSlice = createSlice({
    name: "genre",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenre.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchGenre.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchGenre.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchOneGenre.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchOneGenre.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchOneGenre.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.single = action.payload;
            });
    },
});

export const getGenreStatus = (state) => {
    return state.genre.status;
};
export const getGenreError = (state) => state.genre.error;
export const getGenreData = createSelector(
    (state) => state.genre.data,
    (data) => {
        // console.log("Memoized genre data");
        return data;
    }
);
export const getOneGenreItems = createSelector(
    (state) => state.genre.single,
    (data) => {
        // console.log("memoized single genre item");
        return data;
    }
);

export default genreSlice.reducer;
