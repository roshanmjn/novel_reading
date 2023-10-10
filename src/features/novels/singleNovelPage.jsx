import React, { useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
    BsFillBookmarkCheckFill,
    BsFillBookmarkPlusFill,
} from "react-icons/bs";
import RecommendGenreList from "../recommend/RecommendGenreList";
import Pagination from "../../components/pagination/Pagination";
import StarRatingComponent from "react-star-rating-component";
import {
    fetchSingleChapter,
    selectSingleNovel,
    getNovelStatus,
    selectMemoizedSingleNovel,
} from "./novelSlice";
import {
    fetchSingleBookmark,
    addBookmark,
    removeBookmark,
    getSingleBookmark,
} from "../bookmark/bookmarkSlice";
import {
    fetchRating,
    getRating,
    addRating,
    resetRatingState,
} from "../rating/ratingSlice";
import {
    addComment,
    fetchComment,
    getcomment,
    getActions,
} from "../comment/commentSlice";
import CommentAdd from "../comment/commentAdd";
import CommentList from "../comment/commentList";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useRef } from "react";

const SingleNovelPage = () => {
    const [cookie] = useCookies([]);
    const isAuth = localStorage.getItem("auth"); //useSelector(isAuthenticated);
    const { novelTitle } = useParams();

    const user_id = Number(localStorage.getItem("user_id"));
    const { state } = useLocation();
    const dispatch = useDispatch();
    const image_link =
        state?.image_link ||
        "https://freewebnovel.com/files/article/image/2/2205/2205s.jpg";

    const status = useSelector(getNovelStatus);

    useEffect(() => {
        dispatch(fetchSingleChapter({ novelTitle }));
        if (isAuth) {
            dispatch(fetchSingleBookmark({ user_id, novel_title: novelTitle }));
            dispatch(resetRatingState());
            dispatch(fetchRating({ user_id, novel_title: novelTitle }));
            dispatch(
                fetchComment({
                    novel_title: novelTitle,
                })
            );
        }
    }, [dispatch, novelTitle]);

    const singleNovel = useSelector(selectSingleNovel);
    // const singleNovel = useSelector(selectMemoizedSingleNovel);
    // console.log("s", singleNovel);

    const { author, url, genre, current_page, last_page } = singleNovel;
    const url_parameter = url?.split("/")[1].split(".")[0];

    //handle comments
    const getComments = useSelector(getcomment);
    const getCommentActions = useSelector(getActions);
    const [comment, setComment] = useState("");
    const inputRef = useRef();

    const onCommentChange = (e) => {
        setComment(e.target.value);
    };

    console.log(getCommentActions);
    const onCommentSubmit = (e) => {
        e.preventDefault();

        if (!isAuth)
            return toast.warning("Please login to continue rating!", {
                autoClose: 2000,
            });

        dispatch(
            addComment({
                user_id,
                novel_title: novelTitle,
                comment: inputRef.current?.value,
            })
        ).then(() => {
            inputRef.current.value = "";
            dispatch(
                fetchComment({
                    novel_title: novelTitle,
                })
            );
            return;
        });
    };

    //HANDLE PAGINATION

    const [initialPage, setA] = useState(0);
    const novelLength = singleNovel?.results?.length;
    // let initialPage = 0;
    let startPage = initialPage * 40;
    let endPage = startPage + 40 > novelLength ? novelLength : startPage + 40;
    const lists = [];
    let totalPages = 0;
    if (singleNovel?.results?.length > 0) {
        for (let i = startPage; i < endPage; i++) {
            lists.push(singleNovel?.results[i]);
        }
    }
    const onNext = () => {
        // dispatch(
        //     fetchSingleChapter({ novelTitle, page: singleNovel?.next?.page })
        // );
        if (initialPage + 1 < Math.ceil(novelLength / 40)) {
            // If there are more pages ahead, increment the page number.
            setA(initialPage + 1);
        }
    };
    const onPrevious = () => {
        // dispatch(
        //     fetchSingleChapter({
        //         novelTitle,
        //         page: singleNovel?.previous?.page,
        //     })
        // );
        if (initialPage > 0) {
            // If the current page is greater than 0, decrement the page number.
            setA(initialPage - 1);
        }
    };

    //handle rating
    const [rating, setRating] = useState(0);
    const { data: ratingData } = useSelector(getRating);
    const ratingValue = ratingData?.rating || 0;

    const totalRating = 0;
    const averageRating = 0;
    useEffect(() => {
        if (isAuth && ratingData) {
            setRating(ratingValue);
        }
    }, [isAuth, ratingData]);
    const onStarClick = (nextValue, prevValue, name) => {
        if (!isAuth)
            return toast.warning("Please login to continue rating!", {
                autoClose: 2000,
            });
        dispatch(
            addRating({ user_id, novel_title: novelTitle, rating: nextValue })
        ).then(() => {
            setRating(nextValue);
            dispatch(resetRatingState());
            return;
        });
    };

    //handle bookmark
    const [bookmarked, setBookmarked] = useState(false);
    const { data: bookmarkData } = useSelector(getSingleBookmark);
    useEffect(() => {
        if (isAuth && bookmarkData) {
            setBookmarked(true);
        } else {
            setBookmarked(false);
        }
    }, [isAuth, bookmarkData]);

    const onBookmarkClick = () => {
        if (!bookmarked) {
            dispatch(addBookmark({ user_id, novel_title: novelTitle })).then(
                () => {
                    setBookmarked(true);
                    return;
                }
            );
        } else {
            dispatch(removeBookmark({ user_id, novel_title: novelTitle })).then(
                () => {
                    setBookmarked(false);
                    return;
                }
            );
        }
    };

    //set content
    let content;
    if (status === "loading") {
        content = <p>Loading...</p>;
    } else if (status === "failed") {
        content = <p>Error occurred while fetching the novel.</p>;
    } else if (status === "succeeded" && singleNovel) {
        content = (
            <>
                <section className="text-gray-600 body-font overflow-hidden">
                    <div className="container px-5 py-6 mx-auto">
                        <div className="mx-auto flex flex-wrap">
                            <img
                                alt="ecommerce"
                                className="lg:w-2/6 w-full lg:h-[450px] h-64 object-cover object-center rounded"
                                src={image_link}
                            />
                            <div className="lg:w-4/6 w-full lg:pl-10 lg:py-2 mt-6 lg:mt-0">
                                <h1 className="text-gray-900 text-3xl title-font font-medium text-start mb-1">
                                    {singleNovel.title}
                                </h1>
                                <div className="flex mb-4">
                                    {" "}
                                    <StarRatingComponent
                                        style={{ fontSize: "1.5rem" }}
                                        name="rate1"
                                        starCount={5}
                                        value={rating}
                                        onStarClick={onStarClick}
                                        editing={
                                            ratingValue && ratingValue > 0
                                                ? false
                                                : true
                                        }
                                    />
                                    <div className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                        {singleNovel.author?.map((x, idx) => (
                                            <span
                                                className="p-0 mr-2"
                                                key={idx}
                                            >
                                                {x}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-wrap">
                                    {singleNovel.genre?.map((item, idx) => (
                                        <Link
                                            to={`/genres/${item}`}
                                            key={idx}
                                            className="text-sm px-1 py-[2px] mr-1 mb-1 bg-[#11374e] !text-white rounded-sm
                                    hover:bg-[#2e5d7a]"
                                        >
                                            {item}
                                        </Link>
                                    ))}
                                </div>
                                <p className="leading-tight text-justify">
                                    {singleNovel.description}
                                </p>
                                <div className="flex mt-2 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
                                <div className="flex ">
                                    {isAuth ? (
                                        bookmarked ? (
                                            <BsFillBookmarkCheckFill
                                                style={{
                                                    fontSize: "50px",
                                                    color: "#11374e",
                                                }}
                                                onClick={onBookmarkClick}
                                            />
                                        ) : (
                                            <BsFillBookmarkPlusFill
                                                style={{
                                                    fontSize: "50px",
                                                    color: "#11374e",
                                                }}
                                                onClick={onBookmarkClick}
                                            />
                                        )
                                    ) : (
                                        ""
                                    )}
                                    <Link
                                        to={`/${url_parameter}/1`}
                                        className=" bg-blue-700 border-0 py-2 px-6 focus:outline-none hover:bg-blue-800 rounded ml-10 !text-white font-sans font-medium"
                                    >
                                        READ FIRST
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*  Chapter - List */}
                <div className="container px-5 py-4 mx-auto">
                    <div className=" mx-auto flex flex-wrap">
                        <h1 className="text-start font-medium text-2xl">
                            Chapter List
                        </h1>
                    </div>
                </div>
                <section className="body-font text-gray-600">
                    <div className="container mx-auto px-4 py-8">
                        <div className="-m-4 flex flex-wrap lg:px-4 justify-between ">
                            {/* ad */}

                            {/* {singleNovel.results?.map((chapter, idx) => {
                                if (idx > 39) return null;
                                return (
                                    <div
                                        key={idx}
                                        className="px-2 py-2 md:w-1/2  border-[1px] border-dashed border-gray-500 "
                                    >
                                        <div className="line-clamp-1 h-6">
                                            <Link
                                                className="hover:!underline"
                                                to={`${Number(
                                                    chapter.chapter.split(
                                                        " "
                                                    )[1]
                                                )}`}
                                                state={{ title: chapter.title }}
                                                key={idx}
                                            >
                                                <h2 className="title-font text-lg font-medium text-gray-900 text-start">
                                                    {chapter.chapter} -
                                                    {chapter.title}
                                                </h2>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })} */}

                            {lists?.map((chapter, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className="px-2 py-2 md:w-1/2  border-[1px] border-dashed border-gray-500 "
                                    >
                                        <div className="line-clamp-1 h-6">
                                            <Link
                                                className="hover:!underline"
                                                to={`${Number(
                                                    chapter.chapter.split(
                                                        " "
                                                    )[1]
                                                )}`}
                                                state={{ title: chapter.title }}
                                                key={idx}
                                            >
                                                <h2 className="title-font text-lg font-medium text-gray-900 text-start">
                                                    {chapter.chapter} -
                                                    {chapter.title}
                                                </h2>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
                <Pagination
                    next={onNext}
                    previous={onPrevious}
                    currentPage={initialPage}
                    totalPages={totalPages}
                />
                <div>
                    <h2 className="title-font text-2xl font-medium text-gray-900 text-start mt-12 mb-6 px-4">
                        Related Novels
                    </h2>
                </div>
                <RecommendGenreList
                    genre={genre}
                    url_parameter={url_parameter}
                />
                <CommentAdd
                    input={comment}
                    // change={onCommentChange}
                    ref={inputRef}
                    submit={onCommentSubmit}
                />
                <CommentList comments={getComments} />
            </>
        );
    } else {
        content = <p>No data available.</p>;
    }

    return <div>{content}</div>;
};

export default SingleNovelPage;
