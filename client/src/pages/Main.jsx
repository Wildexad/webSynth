import React from "react";

import "../styles/App.css";

import TimelineController from "../components/TimelineController";

// Компонент главной страницы
const Main = () => {
    return (
        <main className="main">
            <TimelineController />
            <div className="synth-options">
                <h2>Инструменты</h2>
                <div className="instruments">
                </div>
                <h2>Настройки синтезатора</h2>
                <div className="synth_settings">
                </div>
            </div>
        </main>
    )
}

export default Main;