import React from "react";

import "../styles/App.css";

import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

// Компонент шапки приложения
const Header = () => {
    const navigate = useNavigate();

    const transitToMain = () => {
        navigate(`/`, {replace: false});
    }

    return (
        <header className="app_header">
            <div onClick={transitToMain} className="logo">webSynth</div>
            <LoginForm />
        </header>
    )
}

export default Header;