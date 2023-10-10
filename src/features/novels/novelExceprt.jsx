import { Link } from "react-router-dom";

export const NovelExceprt = ({ data }) => {
    // const { id, title, genre, chapters, image_link, link } = data;
    // const filterLink = link?.split(".")[0];
    // console.log(data);

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-6 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {/* next */}
                    {data.map((item, idx) => (
                        <div className="xl:w-1/4 md:w-1/3 p-4" key={idx}>
                            <div className="bg-gray-100 p-6 rounded-lg">
                                <Link
                                    to={`/${item.url_parameter}`}
                                    state={{ image_link: item.image_link }}
                                >
                                    <img
                                        className="h-40 rounded w-full object-cover object-center mb-2"
                                        src={item.image_link}
                                        alt={`${item.title}`}
                                    />
                                </Link>
                                <div className="right ">
                                    <h2 className="text-lg font-medium mb-2 text-start">
                                        <Link
                                            to={`/${item.url_parameter}`}
                                            className="!text-[#4e4e4e] hover:!underline"
                                        >
                                            {item.title}
                                        </Link>
                                    </h2>
                                    <p className="text-start">Ratings</p>
                                    <h3 className="tracking-widest !text-gray-700 text-sm text-start font-medium title-font">
                                        <Link
                                            className="hover:!underline"
                                            to={`/${item.url_parameter}/${item.chapters}`}
                                        >
                                            {item.chapters} Chapters
                                        </Link>
                                    </h3>
                                    <div className="flex flex-wrap mt-1">
                                        {item?.genre
                                            ?.split(",")
                                            ?.map((x, idx) => (
                                                <Link
                                                    to={`/genres/${x}`}
                                                    key={idx}
                                                    className="text-sm px-1 py-[2px] mr-1 mb-1 bg-[#11374e] !text-white rounded-sm
                                                hover:bg-[#2e5d7a]"
                                                >
                                                    {x}
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* next */}
                    {/* <div className="xl:w-1/4 md:w-1/3 p-4">
                        <div className="bg-gray-100 p-6 rounded-lg">
                            <img
                                className="h-40 rounded w-full object-cover object-center mb-6"
                                src="https://dummyimage.com/720x400"
                                alt="content"
                            />
                            <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                                SUBTITLE
                            </h3>
                            <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                                Colosseum Roma
                            </h2>
                            <p className="leading-relaxed text-base">
                                Fingerstache flexitarian street art 8-bit
                                waistcoat. Distillery hexagon disrupt edison
                                bulbche.
                            </p>
                        </div>
                    </div> */}
                    {/* end */}
                </div>
            </div>
        </section>
    );
};
