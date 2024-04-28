import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import Slider from '@mui/material/Slider';

import * as Tone from 'tone';
import InstrumentSlider from "./InstrumentSlider";

const InstrumentCreation = ({ synthList, setSynthList }) => {
    const [synthName, setSynthName] = useState(''); // Состояние названия нового синтезатора
    const [synthType, setSynthType] = useState('sine'); // Состояния вида осциллятора нового синтезатора
    const [synthColor, setSynthColor] = useState('#fff'); // Состояние цвета нового синтезатора
    
    // Envelope нового синтезатора
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

        const synth = new Tone.Synth();
        synth.set(newSynth);

        synth.envelope.set(newSynth.envelope);

        synth.toDestination();

        synth.triggerAttackRelease('B3', "64n");
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="synth-creation-form">
                <button type="button" onClick={testSound}>Протестировать звук</button>

                <button>Сохранить синтезатор</button>

                <div className="synth-options">
                    <div className="synth-meta">
                        <label>
                            Имя синтезатора:
                            <input type='text' name='synthName' onChange={(e) => {setSynthName(e.target.value)}} />
                        </label>
                        
                        <label>
                            Вид синтезатора:
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
                    
                    <div>
                        <label>
                            Attack: {attack}
                            <input type="range" min='0.0' max='2.0' defaultValue='0.0' step='0.1' onChange={(e) => {
                                setAttack(e.target.value);
                            }} />
                        </label>
                    </div>
                </div>
            </form>
        </>
    );
}

export default InstrumentCreation;