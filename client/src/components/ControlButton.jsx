import React from "react";

// Компонент функциональной кнопки
const ControlButton = (props) => {
    return (
        <button
            className={props.className}
            onClick={props.handleClick}
        >
            {props.children}
        </button>
    );
}

export default ControlButton;