import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";

import * as Tone from 'tone';

const InstrumentCreation = ({ synthList, setSynthList }) => {
    const [synthName, setSynthName] = useState(''); // Состояние названия нового синтезатора
    const [synthType, setSynthType] = useState('sine'); // Состояния вида осциллятора нового синтезатора
    const [synthColor, setSynthColor] = useState('#fff'); // Состояние цвета нового синтезатора

    const [noteLength, setNoteLength] = useState('8'); // Длительность ноты (пока только для теста)

    // Состояния ADSR-огибающей (envelope) нового синтезатора
    const [attack, setAttack]= useState(0.0);
    const [decay, setDecay] = useState(0.0);
    const [sustain, setSustain] = useState(1.0);
    const [release, setRelease] = useState(0.7)

    // Функция по сохранению нового синтезатора
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const newSynth = {
            'name': synthName,
            'oscillator': { 'type': event.target['synthType'].value },
            'color': synthColor,
            'envelope': {
                'attack': attack,
                'decay': decay,
                'sustain': sustain,
                'release': release
            }
        };

        setSynthList([...synthList, newSynth]);
    }
    
    // Функция по однократному проигрыванию звука для тестирования нового синтезатора
    const testSound = () => {
        const newSynth = {
            'name': synthName,
            'oscillator': { 'type': synthType },
            'color': synthColor,
            'envelope': {
                'attack': attack,
                'decay': decay,
                'sustain': sustain,
                'release': release
            }
        };

        const synth = new Tone.Synth(); // СОздание синтезатора
        synth.set(newSynth); // Присваивание значений проверяемого синтезатора

        synth.envelope.set(newSynth.envelope); // Добавление значений огибающей

        synth.toDestination(); // Подключение синтезатора к выходу

        synth.triggerAttackRelease('B3', noteLength + 'n'); // Одноократное проигрывание ноты
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="synth-creation-form">
                <button type="button" onClick={testSound}>Протестировать звук</button>

                <button>Сохранить синтезатор</button>

                {/* Базовые настройки */}
                <div className="synth-options">
                    <div className="synth-meta">
                        <label>
                            Имя синтезатора:
                            <input type='text' name='synthName' onChange={(e) => {setSynthName(e.target.value)}} />
                        </label>
                        
                        <label>
                            Вид осциллятора:
                            <select type='text' name='synthType' onChange={(e) => {setSynthType(e.target.value)}}>
                                <option value='sine'>Синусоид</option>
                                <option value='square'>Квадрат</option>
                                <option value='sawtooth'>Пиловидный</option>
                            </select>
                        </label>
                        
                        <label className="synth-color">
                            <div className="synth-color-selection">
                                <p>Цвет ноты:</p>
                                <div style={{backgroundColor: synthColor}} className="synth-color-preview" />
                            </div>
                                <HexColorPicker color={synthColor} onChange={setSynthColor} />
                        </label>
                    </div>
                    
                    {/* Настройки ADSR-огибающей */}
                    <div className="synth-meta">
                        <label>
                            <p>Attack: {attack}</p>
                            <input type="range" min='0.0' max='2.0' defaultValue='0.0' step='0.1' onChange={(e) => {
                                setAttack(e.target.value);
                            }} />
                        </label>
                        <label>
                            <p>Decay: {decay}</p>
                            <input type="range" min='0.0' max='2.0' defaultValue='0.0' step='0.1' onChange={(e) => {
                                setDecay(e.target.value);
                            }} />
                        </label>
                        <label>
                            <p>Sustain: {sustain}</p>
                            <input type="range" min='0.0' max='1.0' defaultValue='1.0' step='0.1' onChange={(e) => {
                                setSustain(e.target.value);
                            }} />
                        </label>
                        <label>
                            <p>Release: {release}</p>
                            <input type="range" min='0.1' max='2.0' defaultValue='0.7' step='0.1' onChange={(e) => {
                                setRelease(e.target.value);
                            }} />
                        </label>
                    </div>

                    {/* Дополнительные настройки */}
                    <div className="synth-meta">
                        <label>
                            <p>Длительность: {'1/' + noteLength}</p>
                            <input type="range" min='1' max='64' defaultValue='8' step='1' onChange={(e) => {
                                setNoteLength(e.target.value);
                            }} />
                        </label>
                    </div>
                </div>
            </form>
        </>
    );
}

export default InstrumentCreation;