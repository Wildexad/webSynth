import React from "react";
import { useState } from "react";
import * as Tone from "tone";

import "../styles/Timeline.css";

import TimelineColumn from "./TimelineColumn";

const synth = new Tone.Synth().toDestination();  // Создается синтезатор (В будущем будет выбираться извне)

/* использование сиквенсов tone.js
const synth = new Tone.Synth().toDestination();
const seq = new Tone.Sequence((time, note) => {
    synth.triggerAttackRelease(note, 0.1, time);
}, ['C4', ['E4', 'D4', 'E4'], 'G4', ['A4', 'G4']]).start(0);
Tone.Transport.start();
*/

/* использование лупов tone.js
const synthA = new Tone.FMSynth().toDestination();
const loopA = new Tone.Loop(time => {
	synthA.triggerAttackRelease("C2", "8n", time);
}, "4n").start(0);
Tone.Transport.start()
*/

// Компонент Таймлайна
const Timeline = (props) => {
    const [notes, setNotes] = useState(['B2', 'C3', 'C#3', 'D3', 'D#3', 'E3']); // Состояние списка нот на таймлайне
    const [columnNumber, setColumnNumber] = useState(16); // Состояние, определяющее количество столбцов на таймлайне
    const [rowNumber, setRowNumber] = useState(notes.length); // Состояние, определяющее количество строк на таймлайне
    const columns = Array(columnNumber).fill().map(() => Array(rowNumber).fill(false)); // Заполнение массива ячеек значениями
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