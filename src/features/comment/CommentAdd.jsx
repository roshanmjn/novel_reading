import React, { forwardRef } from "react";
const CommentAdd = forwardRef(function ({ input, change, submit }, ref) {
    return (
        <div className="container mx-auto px-5 py-4 mb-6 ">
            <div className="mx-auto ">
                <form className="w-full">
                    <div className="-m-2 flex flex-wrap">
                        <div className="w-full">
                            <div className="relative">
                                <textarea
                                    id="message"
                                    type="text"
                                    name="message"
                                    placeholder="Join the discussion..."
                                    // value={input}
                                    // onChange={change}
                                    ref={ref}
                                    rows="3"
                                    className="w-full resize-none rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-sky-600 focus:bg-white focus:ring-2 focus:ring-sky-200"
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex w-full justify-start">
                            <button
                                type="button"
                                onClick={submit}
                                className="flex rounded border-0 bg-sky-600 px-3 py-1 text-sm text-white hover:bg-sky-500 focus:outline-none"
                            >
                                Comment
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
});

export default CommentAdd;
