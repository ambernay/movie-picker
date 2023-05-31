import { useState, useEffect } from 'react';

function Regions({ currentRegion, setCurrentRegion }) {

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

    const handleChange = (e) => {
        setCurrentRegion(e.target.value);
    }

    return (
        <div className="sort-menu">
            <label className="sr-only" htmlFor="region" >Sort by:</label>
            <span className='hover-animation'>
                <select onChange={handleChange} name="region" id="region" tabIndex='0'>

                    {regionList.map((region) => {
                        /* sets default to canada */
                        document.querySelector("select").value = currentRegion;
                        return (
                            <option key={region["iso_3166_1"]} id={region["iso_3166_1"]} value={region["iso_3166_1"]}>{region["english_name"]}</option>
                        )
                    })}
                </select>
            </span>
        </div>
    )
}

export default Regions;