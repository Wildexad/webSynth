import React from "react";
import { useState } from "react";
import * as Tone from "tone";

import "../styles/main.css";

const synth = new Tone.Synth().toDestination();  // Создается синтезатор (В будущем будет выбираться извне)


function Square(props) {
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
        
        if (Tone.context.state !== "running")
        {
            Tone.start();  // Браузеры блокируют автопроигрывание звука, так что включаем его, если он не включен
        }

        synth.triggerAttackRelease(props.pitch, "8n");  // Проигрывание звука
    }
  
    return <button className="square" onClick={handleClick}>{value}</button>;
}
  


export default function Timeline(props) {
    const [notes, setNotes] = useState(props.notes);

    return (
        <>
            <div className="board-row">
                <h1>C3</h1>
                <Square pitch="C3" id='1' />
                <Square pitch="C3" id='2' />
                <Square pitch="C3" id='3' />
                <Square pitch="C3" id='4' />
                <Square pitch="C3" id='5' />
            </div>
            <div className="board-row">
                <h1>C#3</h1>
                <Square pitch="C#3" id='1' />
                <Square pitch="C#3" id='2' />
                <Square pitch="C#3" id='3' />
                <Square pitch="C#3" id='4' />
                <Square pitch="C#3" id='5' />
            </div>
            <div className="board-row">
                <h1>D3</h1>
                <Square pitch="D3" id='1' />
                <Square pitch="D3" id='2' />
                <Square pitch="D3" id='3' />
                <Square pitch="D3" id='4' />
                <Square pitch="D3" id='5' />
            </div>
        </>
    );
}