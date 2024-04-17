import React from "react";
import { useState } from "react";

import "../styles/App.css";

import TimelineController from "../components/TimelineController";
import InstrumentList from "../components/InstrumentList";

// Компонент главной страницы
const Main = () => {
    // Список синтезаторов по умолчанию
    const defaultSynthList = [
        {
            'name': 'sine',
            'oscillator': { 'type': 'sine' }
        },
        {
            'name': 'square',
            'oscillator': { 'type': 'square' }
        },
        {
            'name': 'sawtooth',
            'oscillator': { 'type': 'sawtooth' }
        }
    ]

    // Опции музыки
    const [activeSynth, setActiveSynth] = useState(defaultSynthList[0]); // Состояние, определяющее используемый на данный момент синтезатор
    const [synthList, setSynthList] = useState(defaultSynthList); // Состояние, определяющее список доступных пользователю синтезаторов

    return (
        <main className="main">
            <TimelineController activeSynth={activeSynth} />
            <div className="synth-options">
                <div className="instruments">
                    <h2>Инструменты</h2>
                    <InstrumentList setActiveSynth={setActiveSynth} synthList={synthList} setSynthList={setSynthList} />
                </div>
                <div className="synth_settings">
                    <h2>Настройки синтезатора</h2>
                </div>
            </div>
        </main>
    )
}

export default Main;