import { Link } from "react-router-dom";

const LoginButton = (props) => {
    return (
        <div className={`${props.class}`}>
            <ul className="flex flex-col-reverse space-x-0 lg:space-x-6 lg:flex-row">
                <li className=" lg:mt-0">
                    <Link
                        to="/login"
                        className="py-3 px-4 text-center !text-white bg-sky-500 hover:bg-sky-600     rounded-md shadow block lg:inline"
                    >
                        Login
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default LoginButton;
