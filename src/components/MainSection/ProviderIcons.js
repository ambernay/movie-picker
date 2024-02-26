import { useState, useEffect } from 'react';

function ProviderIcons({ tvMovieToggle, currentRegion, infoState }) {
    const [streamingOptions, setStreamingOptions] = useState([]);

    // useEffect(() => {
    //     const movieID = 346698;
    //     // there is no way to filter by region (https://www.themoviedb.org/talk/643dbcf75f4b7304e2fe7f2a)

    //     const getMovieStreamingOptions = `https://api.themoviedb.org/3/${tvMovieToggle}/${movieID}/watch/providers?api_key=0a093f521e98a991f4e4cc2a12460255`;

    //     fetch(getMovieStreamingOptions)
    //         .then(results => {
    //             return results.json();
    //         })
    //         .then(data => {
    //             setStreamingOptions(data.results);

    //         }).catch(() => {
    //             alert("Failed to fetch streaming options");
    //         })
    // }, [setStreamingOptions, tvMovieToggle]);

    // console.log(streamingOptions);

    return (
        <>
            <div className={infoState === 'provider-info' ? 'movie-info' : 'hidden'}>
                <h4>Where to watch:</h4>
            </div>
        </>
    )
}

export default ProviderIcons;