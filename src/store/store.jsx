import { configureStore } from "@reduxjs/toolkit";
import novelReducer from "../features/novels/novelSlice";
import chapterReducer from "../features/chapters/chapterSlice";
import genreReducer from "../features/genres/genreSlice";
import knnReducer from "../features/recommend/recomGenreSlice";
import raterecomReducer from "../features/recommend/recomRatingSlice";
import userReducer from "../features/users/userSlice";
import ratingReducer from "../features/rating/ratingSlice";
import bookmarkReducer from "../features/bookmark/bookmarkSlice";
import signupReducer from "../features/users/signupSlice";
import commentReducer from "../features/comment/commentSlice";
export const store = configureStore({
    reducer: {
        novel: novelReducer,
        chapter: chapterReducer,
        genre: genreReducer,
        knn: knnReducer,
        raterecom: raterecomReducer,
        user: userReducer,
        rating: ratingReducer,
        bookmark: bookmarkReducer,
        signup: signupReducer,
        comment: commentReducer,
    },
});
