import React from "react";

const PlayButton = (props) => {
    return (
        <button onClick={props.playSong}>Проиграть песню</button>
    );
}

export default PlayButton;