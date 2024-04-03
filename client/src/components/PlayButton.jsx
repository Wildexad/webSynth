import React from "react";

export default function PlayButton (props) {
    return (
        <button onClick={props.playSong}>Проиграть песню</button>
    );
}