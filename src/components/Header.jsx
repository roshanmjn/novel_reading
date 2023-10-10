import React from "react";
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isAuthenticated, logoutUser } from "../features/users/userSlice";
import { Link } from "react-router-dom";
import { selectAllNovels } from "../features/novels/novelSlice";
import useDebounce from "../hooks/useDebounce";
import SearchBar from "./header/searchBar";
import SearchResult from "./header/searchResult";
import LoginButton from "./header/LoginButton";
import ProfileDropDown from "./header/ProfileDropDown";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const getFilteredItems = (query, items) => {
    if (!query) return;
    return items.filter((novel) => novel.title.toLowerCase().includes(query));
};

export const Header = () => {
    const [cookie, setCookie, removeCookie] = useCookies([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const isAuth = cookie?.auth;
    const user_id = localStorage.getItem("user_id");
    const isAuth = localStorage.getItem("auth");

    const [menuState, setMenuState] = useState(false);
    const [query, setQuery] = useState("");
    const novels = useSelector(selectAllNovels);
    const [searchResult, setSearchResult] = useState(false);
    const [cookieCleared, setCookieCleared] = useState(false);

    const onSearchChange = (e) => {
        setQuery(e.target.value);
        setSearchResult(true);
    };

    const debouncedSearchValue = useDebounce(query);
    const filteredNovels = getFilteredItems(debouncedSearchValue, novels);

    useEffect(() => {
        if (cookieCleared) {
            setCookieCleared(false);
            navigate("/");
        }
    }, [cookieCleared, navigate, isAuth]);

    const onLogout = () => {
        console.log("logout");
        removeCookie("auth");
        localStorage.removeItem("user_id");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("auth");
        dispatch(logoutUser({ user_id }));
        setCookieCleared(true);
        navigate("/");
    };

    // Replace path with your path
    const navigation = [
        { title: "Home", path: "/" },
        { title: "Genre", path: "/genres" },
        { title: "Recommends", path: "/recommendations" },
        { title: "Bookmarks", path: "/bookmarks" },
    ];
    return (
        <div>
            <nav className="bg-white border-b">
                <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto md:px-8">
                    <div className="flex-none lg:flex-initial">
                        <Link to="/">
                            <img
                                src="/nr_logo.png"
                                width={120}
                                height={50}
                                alt="Novel Reader LOGO"
                            />
                        </Link>
                    </div>
                    <div className="flex-1 flex items-center justify-between ">
                        <div
                            className={`bg-white absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${
                                menuState ? "" : "hidden"
                            }`}
                        >
                            <ul className="mt-6 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0 lg:items-center">
                                {!isAuth ? (
                                    <li>
                                        <LoginButton
                                            class={` ${
                                                menuState
                                                    ? " lg:hidden w-1/2 m-auto"
                                                    : "hidden"
                                            }`}
                                        />
                                    </li>
                                ) : (
                                    ""
                                )}
                                {navigation.map((item, idx) => {
                                    if (
                                        !isAuth &&
                                        (item.title === "Recommends" ||
                                            item.title === "Bookmarks")
                                    )
                                        return;
                                    return (
                                        <li
                                            key={idx}
                                            className="text-gray-600 hover:text-gray-900"
                                        >
                                            <NavLink
                                                to={item.path}
                                                style={({ isActive }) => ({
                                                    color: isActive
                                                        ? "royalblue"
                                                        : "black",
                                                    fontSize: isActive
                                                        ? "1.25rem"
                                                        : "1.2rem",
                                                })}
                                            >
                                                {item.title}
                                            </NavLink>
                                        </li>
                                    );
                                })}
                            </ul>
                            {isAuth ? (
                                <ProfileDropDown
                                    class="mt-5 pt-5 border-t lg:hidden"
                                    logout={onLogout}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                        {/* {search} */}
                        <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6 ">
                            <div className="search-bar-container">
                                <SearchBar change={onSearchChange} />

                                <SearchResult
                                    data={filteredNovels}
                                    state={searchResult}
                                    setStates={setSearchResult}
                                />
                            </div>
                            <button
                                className="outline-none text-gray-400 block lg:hidden"
                                onClick={() => setMenuState(!menuState)}
                            >
                                {menuState ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16m-7 6h7"
                                        />
                                    </svg>
                                )}
                            </button>
                            {isAuth ? (
                                <ProfileDropDown
                                    class="hidden lg:block"
                                    logout={onLogout}
                                />
                            ) : (
                                <LoginButton class={`hidden lg:block`} />
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};
