import React from "react";
import { useState } from "react";
import * as Tone from "tone";

import "../styles/main.css";

var notes = [];

function Square({ pitch }) {
    const [value, setValue] = useState(null);
    
    function handleClick() {
        if (value !== 'X')
        {
            setValue('X');
        }
        else 
        {
            setValue('');
        }
        
        const synth = new Tone.Synth().toDestination();  // Создается синтезатор (В будущем будет выбираться извне)

        if (Tone.context.state !== "running")
        {
            Tone.start();  // Браузеры блокируют автопроигрывание звука, так что включаем его, если он не включен
        }

        synth.triggerAttackRelease(pitch, "8n");  // Проигрывание звука
    }
  
    return <button className="square" onClick={handleClick}>{value}</button>;
}
  


export default function Timeline() {
    return (
        <>
            <div className="board-row">
                <h1>C3</h1>
                <Square pitch="C3" />
                <Square pitch="C3" />
                <Square pitch="C3" />
                <Square pitch="C3" />
                <Square pitch="C3" />
            </div>
            <div className="board-row">
                <h1>C#3</h1>
                <Square pitch="C#3" />
                <Square pitch="C#3" />
                <Square pitch="C#3" />
                <Square pitch="C#3" />
                <Square pitch="C#3" />
            </div>
            <div className="board-row">
                <h1>D3</h1>
                <Square pitch="D3" />
                <Square pitch="D3" />
                <Square pitch="D3" />
                <Square pitch="D3" />
                <Square pitch="D3" />
            </div>

            <button>Проиграть песню</button>
        </>
    );
}