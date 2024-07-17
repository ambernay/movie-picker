import { memo, useState } from 'react';
function DecadeSlider({ setStartDate, setEndDate, setRangeIsSelected, setIsValidRequest,
     sectionLabel, currentTranslation }) {

    const all = currentTranslation.all;

    const decadesObj = {
        "decades": [
            { "year": "pre-30s", "start": "1884-01-01", "end": "1929-12-31" },
            { "year": "1930s", "start": "1930-01-01", "end": "1939-12-31" },
            { "year": "1940s", "start": "1940-01-01", "end": "1949-12-31" },
            { "year": "1950s", "start": "1950-01-01", "end": "1959-12-31" },
            { "year": "1960s", "start": "1960-01-01", "end": "1969-12-31" },
            { "year": "1970s", "start": "1970-01-01", "end": "1979-12-31" },
            { "year": "1980s", "start": "1980-01-01", "end": "1989-12-31" },
            { "year": "1990s", "start": "1990-01-01", "end": "1999-12-31" },
            { "year": "2000s", "start": "2000-01-01", "end": "2009-12-31" },
            { "year": "2010s", "start": "2010-01-01", "end": "2019-12-31" },
            { "year": "2020s", "start": "2020-01-01", "end": "2029-12-31" },
            { "year": `${all}`, "start": "1884-01-01", "end": "2029-12-31" }
        ]
    };

    const startRangeYear = 1884;
    const currentYear = new Date().getFullYear();
    const currentDecade = Math.round(currentYear / 10) * 10;
    const endRangeYear = currentDecade + 9;
    const midRangeYear = Math.round((startRangeYear + endRangeYear) / 2);
    const [startRangeSlider, setStartRangeSlider] = useState(startRangeYear);
    const [endRangeSlider, setEndRangeSlider] = useState(currentDecade + 9);
   
    const handleChange = (e) => {
       
        setIsValidRequest(true);
        setStartRangeSlider(document.getElementById('startRange').value);
        setEndRangeSlider(document.getElementById('endRange').value);
        console.log(startRangeSlider, endRangeSlider);
        //  const selectedDecadeValue = `${startRangeSlider}-01-01`;
        setStartDate(startRangeSlider);
        setEndDate(endRangeSlider);
        setRangeIsSelected(true);
    }

    return (
        <fieldset className='decade-fieldset'>
            <legend id="decade">{sectionLabel}:</legend>
            <div className="radio-button-container decade-slider">
                <input min={startRangeYear} max={midRangeYear} type="range" 
                name={"decade"} className='decade-slider' id='startRange'
                defaultValue={startRangeYear} onChange={handleChange}></input>
                <input min={midRangeYear} max={endRangeYear} type="range" 
                name={"decade"} className='decade-slider' id='endRange'
                defaultValue={endRangeYear} onChange={handleChange}></input>
            </div>
            <div className='range-label-container'>
                <label htmlFor={startRangeSlider}>{startRangeSlider}</label>
                <span> - </span>
                <label htmlFor={endRangeSlider}>{endRangeSlider}</label>
            </div>

        </fieldset>
    )
}

export default memo(DecadeSlider);