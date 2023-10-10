import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchRatingRecom,
    getRecommendation,
    getStatus,
    getError,
} from "./recomRatingSlice";
import { Link } from "react-router-dom";
const RecommendRatingList = () => {
    const user_id = localStorage.getItem("user_id");
    const auth = localStorage.getItem("user_id");
    const dispatch = useDispatch();

    useEffect(() => {
        if (auth && user_id) {
            dispatch(fetchRatingRecom({ user_id }));
        }
    }, []);

    const ratingRecommendation = useSelector(getRecommendation);
    const status = useSelector(getStatus);
    const error = useSelector(getError);

    const { data } = ratingRecommendation;

    let content;
    if (status === "loading") {
        content = <p>Loading...</p>;
    } else if (status === "failed") {
        content = <p>{error}</p>;
    } else if (status === "succeeded") {
        content =
            ratingRecommendation &&
            ratingRecommendation.success &&
            data?.map((item, idx) => {
                return (
                    <div className="p-4 md:w-1/3 xl:w-1/4" key={idx}>
                        <div className="rounded-lg bg-gray-100 p-2 flex flex-col ">
                            <Link
                                to={`/${item.url_parameter}`}
                                className="h-28 w-auto "
                            >
                                <img
                                    className=" h-full w-full mb-6 rounded  object-contain"
                                    src={item.image_link}
                                    alt="image_link"
                                />
                            </Link>
                            <div className="flex flex-col justify-between items-center pl-2 h-full w-full ">
                                <Link className="text-base text-center font-medium hover:!underline">
                                    {item.novel_title}
                                </Link>
                                <Link
                                    to={`/${item.url_parameter}/${item.chapters}`}
                                    className="my-2 text-sm font-medium"
                                >
                                    {item.chapters} Chapters
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
                            <p className="font-medium mt-2">
                                Recommended:{" "}
                                {parseInt(25 * item.similarity) > 100
                                    ? 100 + "%"
                                    : parseInt(25 * item.similarity) + "%"}
                            </p>
                        </div>
                    </div>
                );
            });
    }

    return (
        <div className="container mx-auto px-5 py-6">
            <div className="-m-4 flex flex-wrap">{content}</div>
        </div>
    );
};

export default RecommendRatingList;
