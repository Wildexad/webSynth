import React from 'react';
import { useState } from "react";
import * as Tone from "tone";

import "../styles/Timeline.css";

import Timeline from "./Timeline";
import ControlButton from './ControlButton';
import TimelineList from './TimelineList';

const synth = new Tone.Synth().toDestination(); // Создается синтезатор (В будущем будет выбираться извне)

// Компонент контроллера таймлайнов
const TimelineController = () => {
    const [timelines, setTimelines] = useState([{cellValues: [], id: 0}]); // Состояние списка существующих таймлайнов
    const [activeTimeline, setActiveTimeline] = useState(timelines[0]); // Состояние активного таймлайна
    const [controlButtons, setControlButtons] = useState([]);
    const [notes, setNotes] = useState([
        // { pitch: "E4", duration: "4n", timing: 0 },
        // { pitch: "D#4", duration: "4n", timing: 0.4 },
        // { pitch: "E4", duration: "4n", timing: 0.4 },
        // { pitch: "D#4", duration: "4n", timing: 0.4 },
        // { pitch: "E4", duration: "4n", timing: 0.4 },
        // { pitch: "B3", duration: "4n", timing: 0.4 },
        // { pitch: "D4", duration: "4n", timing: 0.4 },
        // { pitch: "C4", duration: "4n", timing: 0.4 },
        // { pitch: "A3", duration: "2n", timing: 0.4 }
    ]);

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

    const playSongOld = () => {
        if (Tone.context.state !== "running") {
            Tone.start();  // Браузеры блокируют автопроигрывание звука, так что включаем его, если он не включен
        }
        let delay = Tone.now();
        for (let i = 0; i < notes.length; i++) {
            delay += notes[i].timing;

            if (notes[i - 1])  // Добавление места между нотами
            {
                delay += (notes[i].order - 1 - notes[i - 1].order) * 0.4;
            }
            synth.triggerAttackRelease(notes[i].pitch, notes[i].duration, Tone.now() + delay);
        }
        console.log(notes.map(x => x.pitch));
    }

    const playSong = () => {
        let delay = 0;

        notes.forEach(x => {
            const now = Tone.now();
            synth.triggerAttackRelease(x.pitch, x.duration, now + delay);
            delay += x.timing;
        })
    }

    const resetSong = () => {
        setNotes([]);
    }

    const addNote = (newNote) => {
        const newNotes = [...notes, newNote];
        newNotes.sort((a, b) => a.order.localeCompare(b.order));
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
            <Timeline addNote={addNote} />
            <div className="timeline_buttons">
                <ControlButton handleClick={playSong}>
                    Play
                </ControlButton>
                <ControlButton handleClick={resetSong}>
                    Reset
                </ControlButton>
            </div>
        </div>
    );
}

export default TimelineController;