import React from "react";
import * as Tone from "tone";

const InstrumentList = ({ setActiveSynth, synthList }) => {
    return (
        <>
            <ul>
                {
                    synthList.map(synth => <li key={synth.name}>
                        <button onClick={() => {
                            // Изменение активного синтезатора на выбранный и однократное проирывание примера звука
                            setActiveSynth(synth)
                            console.log(synth);

                            // Однократное проигрывание ноты при выборе
                            const tempSynth = new Tone.PolySynth();
                            tempSynth.set(synth);
                            tempSynth.toDestination();

                            tempSynth.triggerAttackRelease('B3', "64n");
                        }}>
                            {synth.name}
                        </button>
                    </li>)
                }
            </ul>
        </>
    );
}

export default InstrumentList;