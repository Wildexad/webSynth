import React from 'react';
import { useState } from 'react';

import "../styles/Timeline.css";

// Компонент ячейки таймлайна
const Cell = (props) => {
    const [color, setColor] = useState('#fff')

    return <button
                // className={props.isPicked ? 'timeline_cell timeline_cell_picked' : 'timeline_cell'}
                className='timeline_cell'
                onClick={() => {
                    const newColor = props.onCellClick();
                    
                    if (color == '#fff')
                    {
                        setColor(newColor);
                    }
                    else
                    {
                        setColor('#fff');
                    }
                }}
                style={{backgroundColor: color}}
            />
};

export default Cell;