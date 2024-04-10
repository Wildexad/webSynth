import React from 'react';

import Cell from "./Cell";

// Компонент столбца таймлайна
const TimelineColumn = ({column, columnIndex, onCellClick}) => {
    return (
        <div className="timeline_column">
            {column.map((item, cellIndex) => (
                <Cell
                    key={cellIndex}
                    isPicked={item}
                    onCellClick={() => onCellClick(columnIndex, cellIndex)}
                />
            ))}
        </div>
    );
};

export default TimelineColumn;