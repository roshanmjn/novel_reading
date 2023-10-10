import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../features/users/userSlice";
import { toast } from "react-toastify";
import { createUser } from "../features/users/signupSlice";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { signUpSchema } from "../utils/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = (props) => {
    const [cookies] = useCookies([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [submitErrors, setSubmitErrors] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    //form validate
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signUpSchema),
    });

    //onForm Submit
    const onSubmit = async (data) => {
        try {
            const response = await dispatch(createUser(data)).unwrap();
            console.log(response);
            if (
                response &&
                response.statusCode === 200 &&
                response.status === "conflict"
            ) {
                setSubmitErrors({ email: response.message });
                toast.error(response.message, {
                    autoClose: 2000,
                });
            } else if (
                response &&
                response.status === 200 &&
                response.success === true
            ) {
                toast.success("Account created successfully", {
                    autoClose: 2000,
                });
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }

            // console.log(response);
            // console.log(cookies);
        } catch (err) {
            console.log(err.errors);
            // err?.errors[0].path === "email"
            //     ? setSubmitErrors({
            //           email: err?.errors[0].message,
            //       })
            //     : setSubmitErrors({
            //           password: err?.errors[0].message,
            //       });
            // err?.errors?.map((error) =>
            //     toast.error(error.message, {
            //         autoClose: 10000,
            //     })
            // );
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create a new account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* contaianer */}
                    <div className="flex justify-between">
                        {/* 1st */}
                        <div className="w-[45%]">
                            <div className="flex">
                                <label
                                    htmlFor="first_name"
                                    className="s block text-sm font-medium leading-6 text-gray-900"
                                >
                                    First name
                                </label>
                            </div>

                            <div className="mt-2">
                                <input
                                    id="first_name"
                                    name="first_name"
                                    type="text"
                                    autoComplete="first_name"
                                    className={`block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 ${
                                        errors?.first_name
                                            ? "border-2 border-red-600 outline-red-600 focus:ring-red-400"
                                            : "border-0 outline-sky-600 focus:ring-sky-600"
                                    }`}
                                    // onChange={handleChange}
                                    {...register("first_name")}
                                />
                                {errors && errors?.first_name && (
                                    <p className="text-red-600 font-medium">
                                        {errors?.first_name?.message}
                                    </p>
                                )}
                                {submitErrors?.first_name && (
                                    <p className="text-red-600 font-medium">
                                        {submitErrors.first_name.replaceAll(
                                            '"',
                                            ""
                                        )}
                                    </p>
                                )}
                            </div>
                        </div>
                        {/* 2nd */}
                        <div className="w-[45%">
                            <div className="flex">
                                <label
                                    htmlFor="last_name"
                                    className="s block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Last name
                                </label>
                            </div>

                            <div className="mt-2">
                                <input
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    autoComplete="last_name"
                                    className={`block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 ${
                                        errors?.last_name
                                            ? "border-2 border-red-600 outline-red-600 focus:ring-red-400"
                                            : "border-0 outline-sky-600 focus:ring-sky-600"
                                    }`}
                                    // onChange={handleChange}
                                    {...register("last_name")}
                                />
                                {errors && errors?.last_name && (
                                    <p className="text-red-600 font-medium">
                                        {errors?.last_name?.message}
                                    </p>
                                )}
                                {submitErrors?.last_name && (
                                    <p className="text-red-600 font-medium">
                                        {submitErrors.last_name.replaceAll(
                                            '"',
                                            ""
                                        )}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* 3rd */}
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
                    {/* 4th */}
                    <div>
                        <div className="flex">
                            <label
                                htmlFor="password"
                                className="s block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                        </div>

                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="password"
                                className={`block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 ${
                                    errors?.password
                                        ? "border-2 border-red-600 outline-red-600 focus:ring-red-400"
                                        : "border-0 outline-indigo-600 focus:ring-indigo-600"
                                }`}
                                // onChange={handleChange}
                                {...register("password")}
                            />
                            {errors && errors?.password && (
                                <p className="text-red-600 font-medium">
                                    {errors?.password?.message}
                                </p>
                            )}
                            {submitErrors?.password && (
                                <p className="text-red-600 font-medium">
                                    {submitErrors.password.replaceAll('"', "")}
                                </p>
                            )}
                        </div>
                    </div>
                    {/* 5th */}
                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="confirm_password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Confirm password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="confirm_password"
                                name="confirm_password"
                                type="password"
                                autoComplete="confirm_password"
                                className={`block w-full rounded-md  py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 ${
                                    errors?.confirm_password
                                        ? "border-2 border-red-600 outline-red-600 focus:ring-red-400"
                                        : "border-0 outline-indigo-600"
                                }`}
                                // onChange={handleChange}
                                {...register("confirm_password")}
                            />
                            {errors && errors.confirm_password && (
                                <p className="text-red-600 font-medium">
                                    {errors.confirm_password.message}
                                </p>
                            )}{" "}
                            {submitErrors.confirm_password && (
                                <p className="text-red-600 font-medium">
                                    {submitErrors.confirm_password.replaceAll(
                                        '"',
                                        ""
                                    )}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                        >
                            Signup{" "}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already registered?{" "}
                    <Link
                        to="/login"
                        className="font-semibold leading-6 text-sky-500 hover:text-sky-600"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
