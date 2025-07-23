import { BrowserRouter, Routes, Route, Navigate, redirect } from "react-router";

const Logout = () => {
    localStorage.clear();
    window.location.href = "/";
    return (
        <div></div>
    );
}

export default Logout;