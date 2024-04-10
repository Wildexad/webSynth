import React from 'react';
import ControlButton from './ControlButton';

// Компонент списка кнопок существующих таймлайнов
const TimelineList = ({totalTimelines, timeline, changeTimeline}) => {
    let buttonsArray = getButtonsArray(totalTimelines);

    return (
        <div className="timelineList">
            {buttonsArray.map(b =>
                <ControlButton
                    handleClick={() => changeTimeline(b)}
                    key={b}
                    className={timeline === b ? "trackButton trackButton_active" : "trackButton"}
                    >
                        Timeline {b}
                    </ControlButton>
                )}
        </div>
    )
};

// Функция создания массива чисел от 1 до длины массива таймлайнов
const getButtonsArray = (totalTimelines) => {
    let result = [];
    for (let i = 0; i < totalTimelines; i++) {
        result.push(i);
    }
    return result;
}

export default TimelineList;