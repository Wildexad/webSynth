import React from "react";

const InstrumentList = ({ setActiveSynth, synthList }) => {
    return (
        <>
            <ul>
                {
                    synthList.map(synth => <li key={synth.name}>
                        <button onClick={() => {setActiveSynth(synth)}}>
                            {synth.name}
                        </button>
                    </li>)
                }
            </ul>
        </>
    );
}

export default InstrumentList;