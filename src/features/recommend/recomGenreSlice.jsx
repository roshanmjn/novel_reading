import { createSelector } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    status: "idle",
    error: null,
};

const baseURL = "http://localhost:5999/api/v1/novel/knn";

export const fetchKNN = createAsyncThunk(
    "knn/fetchAll",
    async (data, global) => {
        try {
            // userData may be a integer or an Array

            const { genre, novel_title } = data;
            // console.log("d", data);
            const response = await axios.post(baseURL, { genre, novel_title });
            // console.log(global);
            return response.data;
        } catch (error) {
            throw err;
        }
    }
);

export const knnSlice = createSlice({
    name: "knn",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchKNN.pending, (state) => {
            state.status = "Loading";
        }),
            builder.addCase(fetchKNN.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            }),
            builder.addCase(fetchKNN.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            });
    },
});

export const getRecommendation = (state) => state.knn.data;
export const getStatus = (state) => state.knn.status;
export const getError = (state) => state.knn.error;

export default knnSlice.reducer;
