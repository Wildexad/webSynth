import React from 'react';
import ControlButton from './ControlButton';

// Компонент списка кнопок существующих таймлайнов
const TimelineList = ({timelines, activeId, changeTimeline}) => {
    let buttonsArray = getButtonsArray(timelines);

    return (
        <div className="timelineList">
            {buttonsArray.map(Timelineid =>
                <ControlButton
                    handleClick={() => changeTimeline(Timelineid)}
                    key={Timelineid}
                    className={activeId === Timelineid ? "trackButton trackButton_active" : "trackButton"}
                    >
                        Timeline {Timelineid}
                    </ControlButton>
                )}
        </div>
    )
};

// Функция создания массива чисел от 1 до длины массива таймлайнов
const getButtonsArray = (timelines) => {
    let result = [];
    for (let i = 0; i < timelines.length; i++) {
        result.push(timelines[i].id);
    }
    return result;
}

export default TimelineList;