import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../features/users/userSlice";
import { toast } from "react-toastify";
import {
    getError,
    getUser,
    getStatus,
    isAuthenticated,
} from "../features/users/userSlice";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { schema } from "../utils/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Login = (props) => {
    const [cookies] = useCookies([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [submitErrors, setSubmitErrors] = useState({
        email: "",
        password: "",
    });

    //form validate
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    //onForm Submit
    const onSubmit = async (data) => {
        try {
            const response = await dispatch(fetchUser(data)).unwrap();
            if (
                response &&
                response.success === true &&
                response.status === 200
            ) {
                localStorage.setItem("user_id", response.data.id);
                localStorage.setItem(
                    "name",
                    response.data.first_name + " " + response.data.last_name
                );
                localStorage.setItem("email", response.data.email);
                localStorage.setItem("auth", true);

                navigate("/");
            }
            // console.log(response);
            // console.log(cookies);
        } catch (err) {
            // console.log(err.errors[0]);
            err?.errors[0].path === "email"
                ? setSubmitErrors({
                      email: err?.errors[0].message,
                  })
                : setSubmitErrors({
                      password: err?.errors[0].message,
                  });
            err?.errors?.map((error) =>
                toast.error(error.message, {
                    autoClose: 10000,
                })
            );
        }
    };

    const error = useSelector(getError);
    const user = useSelector(getUser);
    const auth = useSelector(isAuthenticated);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=500"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className="flex">
                            <label
                                htmlFor="email"
                                className="s block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="text"
                                autoComplete="email"
                                className={`block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 ${
                                    errors?.email
                                        ? "border-2 border-red-600 outline-red-600 focus:ring-red-400"
                                        : "border-0 outline-sky-600 focus:ring-sky-600"
                                }`}
                                // onChange={handleChange}
                                {...register("email")}
                            />
                            {errors && errors?.email && (
                                <p className="text-red-600 font-medium">
                                    {errors?.email?.message}
                                </p>
                            )}
                            {submitErrors?.email && (
                                <p className="text-red-600 font-medium">
                                    {submitErrors.email.replaceAll('"', "")}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-semibold text-sky-600 hover:text-sky-500"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                className={`block w-full rounded-md  py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 ${
                                    errors?.password
                                        ? "border-2 border-red-600 outline-red-600 focus:ring-red-400"
                                        : "border-0 outline-sky-600"
                                }`}
                                // onChange={handleChange}
                                {...register("password")}
                            />
                            {errors && errors.password && (
                                <p className="text-red-600 font-medium">
                                    {errors.password.message}
                                </p>
                            )}{" "}
                            {submitErrors.password && (
                                <p className="text-red-600 font-medium">
                                    {submitErrors.password.replaceAll('"', "")}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                        >
                            Login{" "}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{" "}
                    <Link
                        to="/signup"
                        className="font-semibold leading-6 text-sky-400 hover:text-sky-500"
                    >
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
