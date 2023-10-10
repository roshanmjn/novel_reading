import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./footer";

export const Layout = () => {
    return (
        <div className="lg:w-[90%] mx-auto">
            <Header />

            <div>
                <Outlet />
            </div>
            <ToastContainer
                position="top-right"
                autoClose={4500}
                limit={6}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="light"
            />
            <Footer />
        </div>
    );
};
