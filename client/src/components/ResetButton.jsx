import React from "react";

export default function ResetButton (props) {
    return (
        <button onClick={props.resetSong}>Сбросить песню</button>
    );
}