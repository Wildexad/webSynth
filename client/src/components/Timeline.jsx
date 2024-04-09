import React from "react";
import { useState } from "react";
import * as Tone from "tone";

import "../styles/Timeline.css";

import TimelineColumn from "./TimelineColumn";

const synth = new Tone.Synth().toDestination();  // Создается синтезатор (В будущем будет выбираться извне)

const Timeline = () => {
    const [notes, setNotes] = useState(['C4', 'C#4', 'D4', 'D#4']); // Состояние списка нот на таймлайне
    const [columnNumber, setColumnNumber] = useState(16); // Состояние, определяющее количество столбцов на таймлайне
    const [rowNumber, setRowNumber] = useState(notes.length); // Состояние, определяющее количество строк на таймлайне
    const columnArray = Array(rowNumber).fill(false); // Заполняем столбцы
    const columns = Array(columnNumber).fill().map(() => Array(rowNumber).fill(false)); // Заполняем строки
    const [cellValues, setCellValues] = useState(columns); // Состояние ячеек таймлайна

    const handleClick = (column, row) => {
        setCellValues(prevCellValues => {
            const newCellValues = [...prevCellValues];
            newCellValues[column][row] = !newCellValues[column][row];
            return newCellValues;
        });
        if (Tone.context.state !== "running") {
            Tone.start();  // Браузеры блокируют автопроигрывание звука, так что включаем его, если он не включен
        }
        synth.triggerAttackRelease(notes[row], "8n");  // Проигрывание звука
    }

    return (
        <div className="timeline_container">
            <div className="timeline_column">
                {notes.map((note, index) =>
                    <div className="timeline_note_cell" key={index}>{note}</div>
                )}
            </div>
            {cellValues.map((column, columnIndex) => (
                <TimelineColumn
                    key={columnIndex}
                    column={column}
                    columnIndex={columnIndex}
                    onCellClick={handleClick}
                />
            ))}
        </div>
    );
}

export default Timeline;