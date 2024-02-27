import { memo } from 'react';
import { useState, useEffect } from 'react';
import Icons from '../Icons.js';

function MovieInfo({ overview, movieID, tvMovieToggle, currentRegion }) {

    const [infoState, setInfoState] = useState('overview');

    // region testing for providerIcons
    const [streamingOptions, setStreamingOptions] = useState([]);

    useEffect(() => {
        // there is no way to filter by region (https://www.themoviedb.org/talk/643dbcf75f4b7304e2fe7f2a)
        const getMovieStreamingOptions = `https://api.themoviedb.org/3/${tvMovieToggle}/${movieID}/watch/providers?api_key=0a093f521e98a991f4e4cc2a12460255`;

        fetch(getMovieStreamingOptions)
            .then(results => {
                return results.json();
            })
            .then(data => {
                setStreamingOptions(data.results[currentRegion[0]] ? data.results[currentRegion[0]] : { flatrate: 'N/A', rent: 'N/A', buy: 'N/A' });

            }).catch(() => {
                alert("Failed to fetch streaming options");
            })
    }, [setStreamingOptions, tvMovieToggle, currentRegion]);

    console.log(streamingOptions);

    // endregion testing for providerIcons

    const handleMovieInfo = () => {
        setInfoState('provider-info');
    }

    const handleMouseLeave = () => {
        // resets state to overview on mouseout
        setInfoState('overview');
        // blurs active element to allow hover out
        document.activeElement.blur();
    }

    return (
        <>
            <div className='overview' onMouseLeave={handleMouseLeave}>
                <div className={infoState === 'overview' ? 'movie-info' : 'hidden'}>
                    <div className='heading-container' onClick={handleMovieInfo}>
                        <h4>Overview</h4>
                        <figure className="eye-icon">
                            <Icons />
                            <figcaption className="sr-only">Eye icon: where to watch</figcaption>
                        </figure>
                    </div>
                    <p>{overview}</p>
                </div>
                <div className={infoState === 'provider-info' ? 'movie-info' : 'hidden'}>
                    <h4>Where to watch:</h4>
                    <ul className='options-list-container'>
                        <li className='option'>Buy:
                            <div className='option-icons'></div>
                        </li>
                        <li className='option'>Rent:
                            <div className='option-icons'></div>
                        </li>
                        <li className='option'>Stream:
                            <div className='option-icons'></div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default memo(MovieInfo);