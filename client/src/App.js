import React, { useState } from "react";

import "./styles/main.css";
import "./styles/App.css";

import TimelineController from "./components/TimelineController";

const App = () => {

  return (
    <div className="app">
      <header className="App-header">webSynth</header>
      <main>
        <h2>Таймлайн</h2>
        <TimelineController />
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