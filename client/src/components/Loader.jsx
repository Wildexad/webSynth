import React from "react";

import "../styles/App.css";

// Копмонент анимации загрузки для асинхронных обращений к стороннему апи
const Loader = () => {
    return (
        <div className="loaderBlock">
            <div className="loader">
            </div>
        </div>
    )
}

export default Loader;