import React from "react";

const ResetButton = (props) => {
    return (
        <button onClick={props.resetSong}>Сбросить песню</button>
    );
}

export default ResetButton;