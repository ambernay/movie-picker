import { memo } from 'react';
import { useState, useEffect } from 'react';
import ProviderIconsList from './ProviderIconsList.js';
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
                const emptyObject = {
                    buy_rent: [{ logo_path: 'N/A', provider_id: 'but/rent', provider_name: 'N/A' }],
                    stream: [{ logo_path: 'N/A', provider_id: 'stream', provider_name: 'N/A' }]
                }

                setviewingOptions(data.results[currentRegion[0]] ? data.results[currentRegion[0]] : emptyObject);
            }).catch(() => {
                console.log("Failed to fetch streaming options");
            })
    }, [setviewingOptions, tvMovieToggle, movieID, currentRegion]);

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
                    {(!Object.keys(viewingOptions).length > 0) ?
                        <div className='no-options'>
                            <h3>No viewing options for</h3>
                            <h3 className='no-options-movie-title'>{movieTitle}</h3>
                            <h3>in your region</h3>
                        </div>

                        : <ProviderIconsList
                            movieTitle={movieTitle}
                            movieID={movieID}
                            viewingOptions={viewingOptions}
                        />
                    }
                </div>
            </div>
        </>
    )
}

export default memo(MovieInfo);