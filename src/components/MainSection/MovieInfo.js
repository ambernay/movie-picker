import { memo } from 'react';

import ProviderIconsList from './ProviderIconsList.js';
import { EyeIcon, InfoIcon } from '../Icons.js';

function MovieInfo({ overview, movieTitle, movieID, tvMovieToggle, currentRegion, infoState, setInfoState, currentTranslation }) {

    const iconDescription = currentTranslation['sr-only'];

    const handleMovieInfo = () => {
        setInfoState('provider-info');
    }

    return (
        <>
            <div className='overview'>
                <div className={infoState === 'overview' ? 'movie-info' : 'hidden'}>
                    <section className='heading-container' onClick={handleMovieInfo}>
                        <h4>{movieTitle}</h4>
                        <figure className="eye-icon">
                            <EyeIcon />
                            <figcaption className="sr-only">{iconDescription.eye_icon}</figcaption>
                        </figure>
                    </section>
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
                        currentTranslation={currentTranslation}
                    />
                    : null
                }
                <section className='info-icon-container'>
                    <figure className="info-icon">
                        <InfoIcon />
                        {/* <figcaption className="sr-only">{iconDescription.eye_icon}</figcaption> */}
                    </figure>
                </section>
            </div>
        </>
    )
}

export default memo(MovieInfo);