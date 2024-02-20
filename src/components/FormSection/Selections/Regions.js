import { useState, useEffect, memo } from 'react';

function Regions({ currentRegion, setCurrentRegion, screenSize }) {

    const [regionList, setRegionList] = useState([]);

    const regionAPI = "https://api.themoviedb.org/3/watch/providers/regions?api_key=0a093f521e98a991f4e4cc2a12460255&language=en-US";

    useEffect(() => {
        fetch(regionAPI)
            .then(results => {
                return results.json();
            })
            .then(data => {
                setRegionList(data.results);
            }).catch(() => {
                alert("Failed to fetch regions");
            })
    }, [setRegionList]);

    useEffect(() => {
        /* default is canada */
        document.querySelector("select").value = currentRegion;
    })

    const handleChange = (e) => {
        setCurrentRegion(e.target.value);
    }

    const chooseRegionName = screenSize !== 'narrowScreen' ? "english_name" : "iso_3166_1";

    return (
        <div className="dropdown-menu regions">
            <label className="sr-only" htmlFor="region">Choose Region:</label>
            <span className='hover-animation safari-only'>
                <select onChange={handleChange} name="region" id="region" tabIndex='0' size='1' onFocus={(e) => e.target.size = '2'} onBlur={(e) => e.target.size = '1'}>

                    {regionList.map((region) => {
                        return (
                            <option onClick={(e) => e.target.parentElement.blur()} key={region["iso_3166_1"]} id={region["iso_3166_1"]} value={region["iso_3166_1"]}>
                                {region[chooseRegionName]}
                            </option>
                        )
                    })}
                </select>
            </span>
        </div>
    )
}

export default memo(Regions);