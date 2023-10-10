import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    status: "idle",
    error: null,
};

const baseURL = "http://localhost:5999/api/v1/novel/rating";

export const fetchRatingRecom = createAsyncThunk(
    "raterecom/fetchAll",
    async (data) => {
        try {
            const { user_id } = data;
            console.log("uid", user_id);
            const response = await axios.post(baseURL, { user_id });

            console.log(response.data);
            return response.data;
        } catch (error) {
            throw err;
        }
    }
);

export const raterecomSlice = createSlice({
    name: "raterecom",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRatingRecom.pending, (state) => {
            state.status = "Loading";
        }),
            builder.addCase(fetchRatingRecom.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            }),
            builder.addCase(fetchRatingRecom.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            });
    },
});

export const getRecommendation = (state) => state.raterecom.data;
export const getStatus = (state) => state.raterecom.status;
export const getError = (state) => state.raterecom.error;

export default raterecomSlice.reducer;
