import React from "react";
import * as Tone from "tone";

function Square({ value }) {
    function handleClick() {
      console.log("Clicked " + value);
      const synth = new Tone.Synth().toDestination();
      if (Tone.context.state != "running")
      {
        Tone.start();  // Браузеры блокируют автопроигрывание звука, так что включаем его, если он не включен
      }

      synth.triggerAttackRelease(value, "8n");
    }
  
    return <button className="square" onClick={handleClick}>{value}</button>;
  }
  
  export default function Timeline() {
    return (
      <>
        <div className="board-row">
          <Square value="C3" />
          <Square value="C#3" />
          <Square value="D3" />
        </div>
        <div className="board-row">
          <Square value="D#3" />
          <Square value="E3" />
          <Square value="F3" />
        </div>
        <div className="board-row">
          <Square value="F#3" />
          <Square value="G3" />
          <Square value="G#3" />
        </div>
      </>
    );
  }