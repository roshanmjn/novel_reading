import { useSelector } from "react-redux";
import { selectAllNovels, getNovelStatus, fetchNovel } from "./novelSlice";
import React, { useState } from "react";
import { NovelExceprt } from "./novelExceprt";
import Loading from "../../assets/loading";
import Pagination from "../../components/pagination/Pagination";

const NovelList = () => {
    const novels = useSelector(selectAllNovels);
    // console.log(novels);
    const status = useSelector(getNovelStatus);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = novels.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(novels?.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    let content;
    if (status === "loading") {
        content = <Loading />;
    } else if (status === "succeeded") {
        content = (
            <>
                <NovelExceprt data={currentItems} />

                <Pagination
                    previous={() => handlePageChange(currentPage - 1)}
                    next={() => handlePageChange(currentPage + 1)}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </>
        );
    } else if (status === "failed") {
        content = <p>'errror'</p>;
    }
    return <div className="novel">{content}</div>;
};

export default NovelList;
