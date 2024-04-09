import React from 'react';

import "../styles/Timeline.css";

const Cell = (props) => {

    return <button
                className={props.isPicked ? 'timeline_cell timeline_cell_picked' : 'timeline_cell'}
                onClick={props.onCellClick}
            />
};

export default Cell;