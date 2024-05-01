
import { memo } from 'react';
function DecadeButtons({ setStartDate, setEndDate, setDecade, setIsValidRequest }) {

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
            { "year": "all", "start": "1884-01-01", "end": "2029-12-31" }
        ]
    };

    const handleChange = (e) => {
        const selectedDecadeValue = e.target.value.split(',');
        setStartDate(selectedDecadeValue[0]);
        setEndDate(selectedDecadeValue[1]);
        setDecade(e.target);
        setIsValidRequest(true);
    }

    return (
        <fieldset className='decade-fieldset'>
            <legend id="decade">Decade:</legend>
            {decadesObj.decades.map((decade) => {
                return (
                    <div className="radio-button-container decade-buttons" key={decade["year"]}>
                        <input onChange={handleChange} type="radio" id={decade["year"]} name={"decade"} value={[decade["start"], decade["end"]]}></input>
                        <label htmlFor={decade["year"]}>{decade["year"]}</label>
                    </div>
                )
            })}
        </fieldset>
    )
}

export default memo(DecadeButtons);