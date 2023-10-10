import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    getOneGenreItems,
    fetchOneGenre,
    getGenreStatus,
    getGenreError,
} from "./genreSlice";
import { useEffect } from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";

const Content = () => {
    const dispatch = useDispatch();
    const { genreTitle } = useParams();
    const fetchGenreCB = useCallback(() => {
        console.log("callback");
        dispatch(fetchOneGenre(genreTitle));
    }, [dispatch, genreTitle]);

    useEffect(() => {
        console.log("userEffect");
        fetchGenreCB();
    }, []);

    const data = useSelector(getOneGenreItems);
    const { results } = data;
    const status = useSelector(getGenreStatus);
    const error = useSelector(getGenreError);

    console.log(data);
    // console.log(error);
    // console.log(status);
    let content;
    if (status === "loading") {
        content = <p>'Loading...'</p>;
    } else if (status === "succeeded") {
        content = results?.map((item, index) => {
            return (
                <div className="single-genre-item" key={index}>
                    <p>{item.title}</p>
                    <p>
                        {item.genre.map((category, index) => (
                            <Link
                                className={category}
                                to={`/genres/${category}`}
                                key={index}
                                onClick={() =>
                                    dispatch(fetchOneGenre(genreTitle))
                                }
                            >
                                <span>{category}</span>
                            </Link>
                        ))}
                    </p>
                    <p>{item.latest_chapter_number}</p>
                </div>
            );
        });
    } else if (status === "failed") {
        content = <p>{error}</p>;
    }
    return content;
};
const SingleGenreItems = () => {
    return (
        <div className="single-genre-list">
            <Content />
        </div>
    );
};

export default SingleGenreItems;
