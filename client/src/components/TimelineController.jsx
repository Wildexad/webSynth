import React from 'react';
import { useState } from "react";
import * as Tone from "tone";

import "../styles/Timeline.css";

import Timeline from "./Timeline";
import ControlButton from './ControlButton';
import TimelineList from './TimelineList';

const synth = new Tone.PolySynth(); // Создается синтезатор (В будущем будет выбираться извне)
synth.toDestination();

// Компонент контроллера таймлайнов
const TimelineController = () => {
    const [timelines, setTimelines] = useState([{cellValues: [], id: 0}]); // Состояние списка существующих таймлайнов
    const [activeTimeline, setActiveTimeline] = useState(timelines[0]); // Состояние активного таймлайна
    const [controlButtons, setControlButtons] = useState([]);
    const [notes, setNotes] = useState([]);
    const [cellValues, setCellValues] = useState([]);
    const [savedSong, setSavedSong] = useState([]);

    // Функция изменения текущего таймлайна
    const changeTimeline = (timeline) => {
        setActiveTimeline(timelines[timeline]);
    }

    // Функция создания нового таймлайна
    const createTimeline = (newTimeline) => {
        setTimelines([...timelines, newTimeline]);
        setControlButtons([...controlButtons, controlButtons.length]);
    }
  
    // Функция удаления таймлайна по id
    const removeTimeline = (timeline) => {
      setTimelines(timelines.filter(t => t.id !== timeline.id))
    }

    const playSong = () => {
        let delay = 0;

        for (let i = 0; i < notes.length; i++) {
            const now = Tone.now();
            
            // Добавление места между нотами
            if (notes[i - 1])
            {
                delay += (notes[i].order - 1 - notes[i - 1].order) * 0.4;
            }

            synth.triggerAttackRelease(notes[i].pitch, notes[i].duration, now + delay);
            
            delay += notes[i].timing;
        }
    }

    const resetSong = () => {
        setNotes([]);
    }

    const addNote = (newNote) => {
        const newNotes = [...notes, newNote];
        newNotes.sort((a, b) => {return a.order - b.order});
        setNotes(newNotes);
        console.log(`note ${newNote.pitch} added`);
    }

    const saveSong = () => {
        var songToSave = {
            author: "Vasya Pupkin",
            notes: notes,
            cells: cellValues
        };

        setSavedSong(songToSave);
        console.log(savedSong);
    }

    const loadSong = () => {
        setNotes(savedSong.notes);
        setCellValues(savedSong.cells);
    }

    const updateCellValues = (values) => {
        setCellValues(values);
    }

    const removeNote = (noteToRemove) => {
        // Убираем из списка нужную ноту по столбцу и колонке
        const newNotes = notes.filter(x => {
            if (x.order === noteToRemove.order && x.pitch === noteToRemove.pitch)
            {
                return false;
            }
            
            return true;
        });
        setNotes(newNotes);
        console.log(notes);
    }

    return (
        <div className="timeline">
            <ControlButton>
                Add timeline
            </ControlButton>
            <TimelineList
                totalTimelines={timelines.length}
                timeline={activeTimeline.id}
                changeTimeline={changeTimeline}
            />

            <Timeline addNote={addNote} removeNote={removeNote} updateCellValues={updateCellValues} />

            <div className="timeline_buttons">
                <ControlButton handleClick={playSong}>
                    Play
                </ControlButton>
                <ControlButton handleClick={resetSong}>
                    Reset
                </ControlButton>
                <ControlButton handleClick={saveSong}>
                    Save
                </ControlButton>
                <ControlButton handleClick={loadSong}>
                    Load
                </ControlButton>
            </div>
        </div>
    );
}

export default TimelineController;