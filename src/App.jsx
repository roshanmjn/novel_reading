import { memo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import NovelList from "./features/novels/novelList";
import SingleNovelPage from "./features/novels/singleNovelPage";
import ChapterList from "./features/chapters/ChapterList";
import GenreList from "./features/genres/GenreList";
import GenreItem from "./features/genres/GenreItem";
import RecommendGenreList from "./features/recommend/RecommendGenreList";
import RecommendRatingList from "./features/recommend/RecommendRatingList";
import BookmarkList from "./features/bookmark/BookmarkList";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import Loading from "./assets/loading";
import { useEffect } from "react";
import { useState } from "react";

function App() {
    const isAuth = localStorage.getItem("auth");

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<NovelList />} />
                <Route path=":novelTitle">
                    <Route index element={<SingleNovelPage />} />
                    <Route path=":chapterId" element={<ChapterList />} />
                </Route>
                <Route path="genres">
                    <Route index element={<GenreList />} />
                    <Route path=":genreTitle/:page?" element={<GenreItem />} />
                </Route>

                <Route path="login" element={<Login />} />
                {/* <Navigate to="/"  */}
                <Route path="signup" element={<Signup />} />
                <Route
                    path="recommendations"
                    element={<RecommendRatingList />}
                />
                <Route path="bookmarks" element={<BookmarkList />} />
                <Route path="loading" element={<Loading />} />
            </Route>
        </Routes>
    );
}

export default memo(App);
