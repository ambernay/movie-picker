import { memo } from 'react';
import { useState, useEffect } from 'react';
import { EyeIcon } from '../Icons.js';

function MovieInfo({ overview, movieTitle, movieID, tvMovieToggle, currentRegion }) {

    const [infoState, setInfoState] = useState('overview');
    const [viewingOptions, setviewingOptions] = useState([]);

    useEffect(() => {
        // there is no way to filter by region (https://www.themoviedb.org/talk/643dbcf75f4b7304e2fe7f2a)
        const getMovieviewingOptions = `https://api.themoviedb.org/3/${tvMovieToggle}/${movieID}/watch/providers?api_key=0a093f521e98a991f4e4cc2a12460255`;

        fetch(getMovieviewingOptions)
            .then(results => {
                return results.json();
            })
            .then(data => {
                setviewingOptions(data.results[currentRegion[0]] ? data.results[currentRegion[0]] : {});
            }).catch(() => {
                console.log("Failed to fetch streaming options");
            })
    }, [setviewingOptions, tvMovieToggle, movieID, currentRegion]);

    // console.log(viewingOptions);
    // viewingOptions.buy?.map(i => i.logo_path);

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
                            <EyeIcon />
                            <figcaption className="sr-only">Eye icon: where to watch</figcaption>
                        </figure>
                    </div>
                    <p>{overview}</p>
                </div>
                <div className={infoState === 'provider-info' ? 'movie-info' : 'hidden'}>
                    <h4>Where to watch <span>{movieTitle}</span>:</h4>

                    <ul className='viewing-options-list-container'>

                        {Object.keys(viewingOptions).map((key, i) => {
                            const imageURL = 'https://image.tmdb.org/t/p/w500';
                            const heading = key.charAt(0).toUpperCase() + key.slice(1) + ':';
                            {/* create lists */ }
                            if (key !== 'link') {
                                const optionKey = key + '/' + movieID;
                                return (
                                    <li className='option' key={optionKey}>{heading}
                                        <ul className='provider-options-list-container'>
                                            {/* create icons */}
                                            {viewingOptions[key]?.map((key, i) => {
                                                const iconKey = i + '/' + movieID + '/' + key.provider_id + key.logo_path;

                                                return (
                                                    <li key={iconKey}>
                                                        <img className='provider-icons' src={imageURL + key.logo_path} alt={key.provider_name} />
                                                    </li>
                                                )
                                            })
                                            }
                                        </ul>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default memo(MovieInfo);