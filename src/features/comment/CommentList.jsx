import React from "react";

const commentList = ({ comments }) => {
    return (
        <section className="bg-white py-8 dark:bg-gray-900 lg:py-2 ">
            {comments?.data?.map((item, idx) => {
                return (
                    <div className="mx-auto  px-4  lg:px-3 " key={idx}>
                        <article className="mb-6 rounded-lg bg-white p-6 lg:p-2 text-base dark:bg-gray-900 border">
                            <footer className="mb-2 flex items-center justify-between">
                                <div className="flex items-center">
                                    <p className="mr-3 inline-flex items-center text-base text-gray-900 dark:text-white">
                                        <img
                                            className="mr-2 h-6 w-6 rounded-full"
                                            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                            alt="Michael Gough"
                                        />
                                        {item.user_id}
                                    </p>
                                    <p className=" mr-6 text-sm text-gray-600 dark:text-gray-400">
                                        {new Date(
                                            item.created_at
                                        ).toLocaleDateString()}
                                    </p>
                                    <p
                                        className={`text-sm font-medium ${
                                            item?.sentiment_score > 0
                                                ? "text-green-600"
                                                : item?.sentiment_score < 0
                                                ? "text-red-600"
                                                : "text-gray-600"
                                        }`}
                                    >
                                        {item.sentiment_score > 0
                                            ? "Positive"
                                            : item.sentiment_score < 0
                                            ? "Negative"
                                            : "Neutral"}
                                    </p>
                                </div>
                            </footer>
                            <p className="text-gray-500 dark:text-gray-400 text-justify">
                                {item.comment}
                            </p>
                        </article>
                    </div>
                );
            })}
        </section>
    );
};

export default commentList;
