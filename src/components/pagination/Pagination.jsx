import React from "react";

const Pagination = ({ previous, next, currentPage, totalPages }) => {
    return (
        <div className="mx-auto">
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-base h-10">
                    {/* previous */}
                    <li>
                        <button
                            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:bg-gray-500 disabled:border-gray-500"
                            onClick={previous}
                            // disabled={currentPage === 1}
                        >
                            <svg
                                className="w-3.5 h-3.5 mr-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 5H1m0 0 4 4M1 5l4-4"
                                />
                            </svg>
                            Previous
                        </button>
                    </li>
                    {/* current */}
                    {[...Array(totalPages)].map((_, idx) => {
                        if (Math.abs(currentPage - (idx + 1)) > 4) {
                            // Skip rendering pages that are more than 4 steps away from the current page
                            return null;
                        }
                        return (
                            <li key={idx}>
                                <button
                                    className={`flex items-center justify-center px-4 h-10 leading-tight      dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                                        currentPage === idx + 1
                                            ? "text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                                            : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                    }`}
                                >
                                    {idx + 1}
                                    {/* {currentPage + 1} */}
                                </button>
                            </li>
                        );
                    })}

                    {/* next */}
                    <li>
                        <button
                            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:bg-gray-500 disabled:border-gray-500"
                            onClick={next}
                            // disabled={currentPage === totalPages}
                        >
                            Next
                            <svg
                                className="w-3.5 h-3.5 ml-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
