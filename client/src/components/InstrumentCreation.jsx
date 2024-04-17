import React from "react";

const InstrumentCreation = ({ synthList, setSynthList }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const newSynth = {
            'name': event.target['synthName'].value,
            'oscillator': { 'type': event.target['synthType'].value },
            'color': event.target['synthColor'].value
        };

        setSynthList([...synthList, newSynth]);

        console.log(`Сохранен синтезатор с именем ${event.target['synthName'].value} и типом ${event.target['synthType'].value}`);
    }
    
    return (
        <>
            <form onSubmit={handleSubmit} className="synth-creation-form">
                <label>
                    Имя синтезатора:
                    <input type='text' name='synthName' />
                </label>
                <label>
                    Вид синтезатора:
                    <input type='text' name='synthType' />
                </label>
                <label>
                    Цвет ноты:
                    <input type='text' name='synthColor' />
                </label>

                <input type="submit" />
            </form>
        </>
    );
}

export default InstrumentCreation;