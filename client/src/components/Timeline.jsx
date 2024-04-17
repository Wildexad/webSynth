import React from "react";
import { useState } from "react";
import * as Tone from "tone";

import "../styles/Timeline.css";

import TimelineColumn from "./TimelineColumn";

// Компонент Таймлайна
const Timeline = ({ octave, cellValues, addNote, removeNote, updateCellValues, activeSynth }) => {

    const handleClick = (column, row) => {
        let note = { pitch: octave[row], duration: "8n", timing: 0.4, order: column, synth: activeSynth };
        const synth = new Tone.Synth();
        synth.set(activeSynth);
        synth.toDestination();

        // Добавление ноты в список нот, если она не активна, иначе удаляем
        if (!cellValues[column][row]) {
            addNote(note);
        }
        else {
            removeNote(note);
        }

        // Обновление ячейки таймлайна
        cellValues[column][row] = !cellValues[column][row];

        // Обновление ячеек таймлайна в контроллере
        updateCellValues(cellValues);

        // Однократное проигрывание выбранной ноты
        if (Tone.context.state !== "running") {
            Tone.start();  // Браузеры блокируют автопроигрывание звука, так что включаем его, если он не включен
        }
        synth.triggerAttackRelease(octave[row], "64n");  // Проигрывание звука

        return activeSynth.color;
    }

    return (
        <div className="timeline_container">
            <div className="timeline_column">
                {octave.map((note, index) =>
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