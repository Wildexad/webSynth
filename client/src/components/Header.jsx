import React from "react";

import "../styles/App.css";

import LoginForm from "./LoginForm";

// Компонент шапки приложения
const Header = () => {
    return (
        <header className="app_header">
            <div>webSynth</div>
            <LoginForm />
        </header>
    )
}

export default Header;