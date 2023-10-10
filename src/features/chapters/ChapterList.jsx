import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, Link } from "react-router-dom";
import {
    fetchChapter,
    getChapterData,
    getChapterStatus,
    getChapterError,
    getMemoizedChapterData,
} from "./chapterSlice";

const ChapterList = () => {
    const { novelTitle, chapterId } = useParams();
    const dispatch = useDispatch();
    const { state, pathname } = useLocation();

    const chapterTitle = state?.title || "";
    const status = useSelector(getChapterStatus);
    const error = useSelector(getChapterError);
    const chapterData = useSelector(getMemoizedChapterData);
    const { chapter, next, previous, success } = chapterData;
    console.log(chapterData);

    const fetchChapterCb = useCallback(() => {
        dispatch(fetchChapter({ novelTitle, chapterId }));
    }, [dispatch, novelTitle, chapterId]);

    useEffect(() => {
        fetchChapterCb();
        //   dispatch(fetchChapter({ novelTitle, chapterId }));
    }, []);

    let content;
    if (status === "loading") {
        content = <p>'Loading'</p>;
    } else if (status === "succeeded") {
        //   console.log(chapterData);
        content = (
            <>
                <div className="pagination">
                    {previous && previous !== null ? (
                        <Link
                            to={`/${novelTitle}/${previous}`}
                            onClick={() =>
                                dispatch(
                                    fetchOneGenre({
                                        novelTitle,
                                        page: previous,
                                    })
                                )
                            }
                            className="pagination-btn"
                        >
                            Previous:{previous}
                        </Link>
                    ) : null}
                    {next && next !== null ? (
                        <Link
                            to={`/${novelTitle}/${next}`}
                            onClick={() =>
                                dispatch(
                                    fetchOneGenre({
                                        novelTitle,
                                        page: next,
                                    })
                                )
                            }
                            replace={true}
                            className="pagination-btn"
                        >
                            Next:{next}
                        </Link>
                    ) : null}
                </div>
                <div>
                    <div>
                        <Link to="/">Home</Link>/
                        <Link to={`/${novelTitle}`}>{novelTitle}</Link>/
                        <Link
                            to={`/${novelTitle}/${chapterId}`}
                            // state={{ title: state.title }}
                        >
                            Chapter {chapterId} -{chapterTitle}
                        </Link>
                    </div>
                    <h3>{novelTitle}</h3>
                    <h4>Chapter {chapterId}</h4>
                    <p>{chapterData.chapter}</p>
                </div>
            </>
        );
    } else if (status === "failed") {
        content = <p>{error}</p>;
    }
    return <div className="novel float float-column">{content}</div>;
};

export default ChapterList;
