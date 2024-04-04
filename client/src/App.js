import React from "react";

import Timeline from "./components/Timeline"
import PlayButton from "./components/PlayButton";
import ResetButton from "./components/ResetButton";

import * as Tone from "tone";

const synth = new Tone.Synth().toDestination();  // Создается синтезатор (В будущем будет выбираться извне)

var notes = [
  { pitch: "E4", timing: 0, duration: "4n" },
  { pitch: "D#4", timing: 0.4, duration: "4n" },
  { pitch: "E4", timing: 0.4, duration: "4n" },
  { pitch: "D#4", timing: 0.4, duration: "4n" },
  { pitch: "E4", timing: 0.4, duration: "4n" },
  { pitch: "B3", timing: 0.4, duration: "4n" },
  { pitch: "D4", timing: 0.4, duration: "4n" },
  { pitch: "C4", timing: 0.4, duration: "4n" },
  { pitch: "A3", timing: 0.4, duration: "2n" }
]

function playSong() {
  if (Tone.context.state !== "running")
  {
      Tone.start();  // Браузеры блокируют автопроигрывание звука, так что включаем его, если он не включен
  }

  let delay = Tone.now();
  for(let i = 0; i < notes.length; i++) {
      delay += notes[i].timing;
      synth.triggerAttackRelease(notes[i].pitch, notes[i].duration, delay);
  }
  
  console.log(notes);
}

function resetSong() {
  notes = [];
}

export default function App() {
  return (
    <>
      <header>webSynth</header>
      <div className="timeline">
        <Timeline notes={notes} />
        <PlayButton playSong={playSong} />
        <ResetButton resetSong={resetSong} />
      </div>
    </>

  );
}