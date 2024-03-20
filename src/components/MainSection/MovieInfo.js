import { memo } from 'react';

import ProviderIconsList from './ProviderIconsList.js';
import { EyeIcon } from '../Icons.js';

function MovieInfo({ overview, movieTitle, movieID, tvMovieToggle, currentRegion, infoState, setInfoState }) {

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
                {infoState === 'provider-info' ?
                    /* only renders and fetches icons onclick */
                    <ProviderIconsList
                        movieTitle={movieTitle}
                        movieID={movieID}
                        tvMovieToggle={tvMovieToggle}
                        currentRegion={currentRegion}
                        infoState={infoState}
                    />
                    : null
                }
            </div>
        </>
    )
}

export default memo(MovieInfo);