import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    getOneGenreItems,
    fetchOneGenre,
    getGenreStatus,
    getGenreError,
} from "./genreSlice";
import { useEffect } from "react";
import { useCallback } from "react";
import Pagination from "../../components/pagination/Pagination";

const Content = () => {
    const dispatch = useDispatch();
    const { genreTitle, page = 1 } = useParams();

    const fetchGenreCB = useCallback(() => {
        // console.log("callback");
        dispatch(fetchOneGenre({ genreTitle, page }));
    }, [dispatch, genreTitle]);

    useEffect(() => {
        // console.log("userEffect");
        fetchGenreCB();
    }, []);

    const data = useSelector(getOneGenreItems);
    const { next, results, previous, last_page, current_page } = data;
    const status = useSelector(getGenreStatus);
    const error = useSelector(getGenreError);

    //pagination
    const onNext = () => {
        const newUrl = `/genres/${genreTitle}/${next?.page}`;
        window.history.pushState(null, "", newUrl);
        dispatch(
            fetchOneGenre({
                genreTitle,
                page: next.page,
            })
        );
    };
    const onPrevious = () => {
        const newUrl = `/genres/${genreTitle}/${previous?.page}`;
        window.history.pushState(null, "", newUrl);
        dispatch(
            fetchOneGenre({
                genreTitle,
                page: previous.page,
            })
        );
    };

    let content;
    if (status === "loading") {
        content = <p>'Loading...'</p>;
    } else if (status === "succeeded") {
        content =
            data &&
            results?.map((item, idx) => (
                <div className="p-4 md:w-1/3 xl:w-1/4" key={idx}>
                    <div className="rounded-lg bg-gray-100 p-2 flex flex-col ">
                        <Link
                            to={`/${item.url_parameter}`}
                            className="h-28 w-auto "
                        >
                            <img
                                className=" h-full w-full mb-6 rounded  object-contain"
                                // src={item.image_link}
                                src={item.image_link}
                                alt="image_link"
                            />
                        </Link>
                        <div className="flex flex-col justify-between items-center pl-2 h-full w-full ">
                            <Link className="text-base text-center font-medium hover:!underline">
                                {item.title}
                            </Link>
                            <Link
                                to={`/${item.url_parameter}/${item.latest_chapter_number}`}
                                className="my-2 text-sm font-medium hover:!underline"
                            >
                                {item.latest_chapter_number} Chapters
                            </Link>
                        </div>
                        <div className="flex justify-center flex-wrap mt-2">
                            {item.genre?.map((x, idx) => (
                                <Link
                                    to={`/genres/${x}`}
                                    key={idx}
                                    className="text-xs font-medium  p-[2px] mb-[2px] mr-[3px] bg-[#11374e] !text-gray-200 border rounded-sm"
                                >
                                    {x}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            ));
    } else if (status === "failed") {
        content = <p>{error}</p>;
    }
    return (
        <>
            <div className="-m-4 flex flex-wrap">{content}</div>
            <Pagination
                previous={onPrevious}
                next={onNext}
                currentPage={current_page}
                totalPage={last_page}
            />
        </>
    );
};
const GenreItem = () => {
    return (
        <div className="container mx-auto px-5 py-6">
            <Content />
        </div>
    );
};

export default GenreItem;
