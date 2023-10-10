import "./searchBar.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const SearchResult = ({ data, setStates, state }) => {
    useEffect(() => {
        const handleDropDown = (e) => {
            // if (!searchResultRef.current.contains(e.target)) setStates(false);
            setStates(false);
        };
        document.addEventListener("click", handleDropDown);
    }, []);
    return (
        <div className="search-result-list">
            <div className={`flex flex-col ${state ? "" : "hidden"}`}>
                {data?.map((item, idx) => (
                    <div className="search-list-item text-truncate " key={idx}>
                        <Link to={`${item?.url_parameter}`}> {item.title}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResult;
