import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./store/store";
import { fetchNovel } from "./features/novels/novelSlice";
import { fetchGenre } from "./features/genres/genreSlice";

store.dispatch(fetchNovel());
store.dispatch(fetchGenre());
ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <Provider store={store}>
        <Router>
            <Routes>
                <Route path="/*" element={<App />} />
            </Routes>
        </Router>
    </Provider>
    // </React.StrictMode>
);
