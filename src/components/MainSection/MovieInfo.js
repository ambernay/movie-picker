import { memo } from 'react';
import { useState, useEffect } from 'react';
import ProviderIconsList from './ProviderIconsList.js';
import { ProviderIconsApiCall } from '../MovieApi.js';
import { EyeIcon } from '../Icons.js';

function MovieInfo({ overview, movieTitle, movieID, tvMovieToggle, currentRegion, infoState, setInfoState }) {

    const [viewingOptions, setViewingOptions] = useState({});

    useEffect(() => {
        ProviderIconsApiCall(tvMovieToggle, movieID, currentRegion).then(result => setViewingOptions(result));
        console.log(viewingOptions)
    }, [setViewingOptions, tvMovieToggle, movieID, currentRegion]);

    const handleMovieInfo = () => {
        setInfoState('provider-info');
    }

    return (
        <>
            <div className='overview'>
                <div className={infoState === 'overview' ? 'movie-info' : 'hidden'}>
                    <div className='heading-container' onClick={handleMovieInfo}>
                        <h4>{movieTitle}</h4>
                        <figure className="eye-icon">
                            <EyeIcon />
                            <figcaption className="sr-only">Eye icon: where to watch</figcaption>
                        </figure>
                    </div>
                    <p>{overview}</p>
                </div>
                <div className={infoState === 'provider-info' ? 'movie-info' : 'hidden'}>
                    {
                        <ProviderIconsList
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