import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchBookmark,
    removeBookmark,
    getBookmark,
    getStatus,
    getError,
    getChanges,
} from "../bookmark/bookmarkSlice";
import { Link } from "react-router-dom";
import { useMemo } from "react";

const BookmarkList = () => {
    const user_id = localStorage.getItem("user_id");
    const auth = localStorage.getItem("auth");
    const dispatch = useDispatch();
    const bookmarks = useSelector(getBookmark);

    const memoizedBookmarks = useMemo(() => bookmarks.data, [bookmarks.data]);
    useEffect(() => {
        if (auth && user_id) {
            dispatch(fetchBookmark({ user_id }));
        }
    }, [dispatch]);

    const status = useSelector(getStatus);
    const changes = useSelector(getChanges);
    const error = useSelector(getError);

    console.log(bookmarks);
    console.log("changes:", changes);

    const handleRemoveBookmark = ({ user_id, novel_title }) => {
        dispatch(removeBookmark({ user_id, novel_title })).then(() => {});
        dispatch(fetchBookmark({ user_id }));
    };

    let content;
    if (status === "loading") {
        content = <p>Loading...</p>;
    } else if (status === "failed") {
        content = <p>{error}</p>;
    } else if (status === "succeeded") {
        content =
            bookmarks &&
            bookmarks.success &&
            bookmarks?.data?.map((item, idx) => (
                <div className=" p-2  w-full md:w-1/2  " key={idx}>
                    <div className="w-full flex justify-evenly items-center border ">
                        <div className=" w-5/6 text-start px-4 truncate">
                            {item.novel_title}
                        </div>
                        <div
                            className=" w-1/6 font-bold text-2xl border-l-2 text-red-500 hover:text-red-700 hover:bg-gray-100"
                            onClick={() =>
                                handleRemoveBookmark({
                                    user_id,
                                    novel_title: item.novel_title,
                                })
                            }
                        >
                            <button className="border">X</button>
                        </div>
                    </div>
                </div>
            ));
    }

    return (
        <div className="container mx-auto px-5 py-6">
            <div className="-m-4 flex flex-wrap">{content}</div>
        </div>
    );
};

export default BookmarkList;
