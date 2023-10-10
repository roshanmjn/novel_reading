import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getGenreData, getGenreError, getGenreStatus } from "./genreSlice";

const GenreList = () => {
    const allGenres = useSelector(getGenreData);
    const status = useSelector(getGenreStatus);
    const error = useSelector(getGenreError);
    // console.log(allGenres);
    // console.log(status);

    let content;
    if (status === "loading") {
        content = <div className="genre-loading">'Loading...'</div>;
    } else if (status === "succeeded") {
        content = allGenres?.map((item, idx) => {
            const link = item.link?.split("/")[2] || "Action";
            return (
                <Link
                    to={`${link}`}
                    key={idx}
                    className="p-2 sm:w-1/2 md:w-1/3 w-full"
                >
                    <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            className="text-blue-700 w-6 h-6 flex-shrink-0 mr-4"
                            viewBox="0 0 24 24"
                        >
                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                            <path d="M22 4L12 14.01l-3-3"></path>
                        </svg>
                        <span className="title-font font-medium">
                            {item.title}
                        </span>
                    </div>
                </Link>
            );
        });
    } else if (status === "failed") {
        content = <div className="genre-error">{error}</div>;
    }
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-6 mx-auto">
                <div>
                    <h2 className="title-font text-3xl font-semibold mb-5">
                        Genre
                    </h2>
                </div>
                <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                    {content}
                </div>
            </div>
        </section>
    );
};

export default GenreList;
