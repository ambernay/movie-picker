import { useState, useEffect } from 'react';

function Regions({ region, setRegion }) {

    const [regionList, setRegionList] = useState([]);

    const regionAPI= "https://api.themoviedb.org/3/watch/providers/regions?api_key=0a093f521e98a991f4e4cc2a12460255&language=en-US";

    useEffect(() => {
        fetch(regionAPI)
            .then(results => {
                return results.json();
            })
            .then(data => {
                setRegionList(data.results);
            })
    }, [setRegionList]);

    const handleChange = (e) => {
        setRegion(e.target.value);
        console.log(document.querySelector("select").value);
    }

    return (
        <div className="sort-menu">
            <label className="sr-only" for="sort">Sort by:</label>

            <select onChange={handleChange} name="sort" id="sort">

                {regionList.map((region) => {
                    document.querySelector("select").value = region;
                    return (
                        <option key={region["iso_3166_1"]} id={region["iso_3166_1"]} value={region["iso_3166_1"]}>{region["english_name"]}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default Regions;