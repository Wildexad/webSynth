import React, { useState } from "react";

import "./styles/main.css";
import "./styles/App.css";

import TimelineController from "./components/TimelineController";

const App = () => {

  return (
    <>
      <header className="app-header">webSynth</header>
      <main className="app">
        <h2>Таймлайн</h2>
        <TimelineController />
        <div className="synth-options">
          <h2>Инструменты</h2>
          <div className="instruments">
          </div>
          <h2>Настройки синтезатора</h2>
          <div className="synth_settings">
          </div>
        </div>
      </main>
    </>
  );
}

export default App;