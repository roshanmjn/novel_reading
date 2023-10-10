import { useDispatch, useSelector } from "react-redux";
import {
    fetchKNN,
    getStatus,
    getError,
    getRecommendation,
} from "./recomGenreSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { useMemo } from "react";

const RecommendGenreList = ({ genre, url_parameter }) => {
    const isAuth = localStorage.getItem("isAuth");
    const user_id = localStorage.getItem("user_id");
    const dispatch = useDispatch();
    const status = useSelector(getStatus);
    // console.log(url_parameter);
    const recommendation = useSelector(getRecommendation);
    const memoi = useMemo(() => {
        recommendation;
    }, [recommendation]);
    useEffect(() => {
        dispatch(
            fetchKNN({
                genre,
                novel_title: url_parameter,
            })
        );
    }, [url_parameter, memoi]);
    const error = useSelector(getError);

    // console.log(recommendation);

    let content;
    if (status === "loading") {
        content = <p>Loading...</p>;
    } else if (status === "failed") {
        content = <p>{error}</p>;
    } else if (status === "succeeded") {
        content =
            recommendation &&
            recommendation.success &&
            recommendation.data?.map((item, idx) => {
                return (
                    // <Link
                    //     to={`/${item.url_parameter}`}
                    //     className="recommendation-slider h-full !drop-shadow-sm border"
                    //     key={idx}
                    // >
                    <SwiperSlide className="!shadow-md" key={idx}>
                        <div className="recommendation-item  text-base h-full w-full px-2 flex flex-col justify-between pb-8">
                            <div className="h-2/5 w-full flex justify-start items-start   ">
                                <Link
                                    to={`/${item?.url_parameter}`}
                                    className="h-full w-1/3"
                                >
                                    <img
                                        src={item.image_link}
                                        alt="novel_image"
                                        className="h-full w-full "
                                    />
                                </Link>

                                <div className="flex flex-col justify-between  pl-2 h-full w-2/3">
                                    <Link className="text-sm text-center font-medium hover:!underline">
                                        {item.title}
                                    </Link>
                                    <Link
                                        to={`/${item.url_parameter}/${item.chapters}`}
                                        className="my-2"
                                    >
                                        {item.chapters} Chapters
                                    </Link>
                                </div>
                            </div>

                            <div className="flex justify-between  flex-wrap mt-2">
                                {item?.genre
                                    ?.split(",")
                                    .map((x) => x.trim())
                                    .map((x, idx) => (
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
                                Match:{" "}
                                {parseInt(100 * item.similarityRate) + "%"}
                            </p>
                        </div>
                    </SwiperSlide>
                    // </Link>
                );
            });
    }

    return (
        <div className="swiper-container h-[270px]  px-3 ">
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                    renderBullet: function (index, className) {
                        return (
                            '<span class="' +
                            className +
                            '">' +
                            // (index + 1) +
                            "</span>"
                        );
                    },
                }}
                navigation={{ enabled: true }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {content}
            </Swiper>
        </div>
    );
};

export default RecommendGenreList;
