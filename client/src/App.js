import React, { useState } from "react";
import * as Tone from "tone";

import "./styles/index.css";
import "./styles/main.css";
import "./styles/App.css";

import Timeline from "./components/Timeline"
import PlayButton from "./components/PlayButton";
import ResetButton from "./components/ResetButton";

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

const App = () => {
  const [activeTrack, setActiveTrack] = useState(1);
  const [trackList, setTrackList] = useState([]);

  return (
    <div className="app">
      <header>webSynth</header>
      <main>
        <h2>Таймлайн</h2>
        <div className="timeline">
          <Timeline />
        </div>
        <div className="timeline_buttons">
          <PlayButton playSong={playSong} />
          <ResetButton resetSong={resetSong} />
        </div>
        <div className="settings">
          <h2>Инструменты</h2>
          <div className="instruments">
          </div>
          <h2>Настройки синтезатора</h2>
          <div className="synth_settings">
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;