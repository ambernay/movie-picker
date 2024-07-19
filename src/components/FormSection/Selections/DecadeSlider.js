import { memo, useState } from 'react';
function DecadeSlider({ setStartDate, setEndDate, setRangeIsSelected, setIsValidRequest,
     sectionLabel }) {

    const startRangeYear = 1884;
    const currentYear = new Date().getFullYear();
    const endRangeYear = currentYear + 5;

    const [startRangeSlider, setStartRangeSlider] = useState(startRangeYear);
    const [endRangeSlider, setEndRangeSlider] = useState(endRangeYear);
   
    const handleChange = (e) => {
       
        setIsValidRequest(true);

        setStartRangeSlider(Math.min(
            document.getElementById('startRange').value,
            document.getElementById('endRange').value
            ));
    
        setEndRangeSlider(Math.max(
            document.getElementById('startRange').value,
            document.getElementById('endRange').value
            ));
       
        setStartDate(Math.min(startRangeSlider, endRangeSlider));
        setEndDate(Math.max(startRangeSlider, endRangeSlider));
        setRangeIsSelected(true);
    }

    return (
        <fieldset className='decade-fieldset'>
            <legend id="decade">{sectionLabel}:</legend>
            <div className="decade-slider-container">
                <input min={startRangeYear} max={endRangeYear} type="range" 
                name={"decade"} className='decade-slider' id='slider-timeline'></input>

                <input min={startRangeYear} max={endRangeYear} type="range" 
                name={"decade"} className='decade-slider' id='startRange'
                defaultValue={startRangeYear} onChange={handleChange}></input>
                
                <input min={startRangeYear} max={endRangeYear} type="range" 
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