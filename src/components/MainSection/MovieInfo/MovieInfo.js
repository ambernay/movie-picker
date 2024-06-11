import { memo } from 'react';

import ProviderIconsList from './ProviderIconsList.js';
import MoreInfo from './MoreInfo.js';

import { EyeIcon, InfoIcon } from '../../Icons.js';

function MovieInfo({ movieTitle, overview, tvMovieToggle, movieID, releaseDate, currentRegion, 
    infoState, setInfoState, currentTranslation }) {
    
    const iconDescription = currentTranslation['sr-only'];

    return (
        <>
            <div className='overview'>
                <div className={infoState === 'overview' ? 'movie-info' : 'hidden'}>
                    <section className='heading-container' onClick={() => setInfoState('provider-info')}>
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
                {infoState === 'more-info' ?
                    /* only renders and fetches icons onclick */
                    <MoreInfo
                        infoState={infoState}
                        movieID={movieID}
                        releaseDate={releaseDate}
                        movieTitle={movieTitle}
                        tvMovieToggle={tvMovieToggle}
                        currentTranslation={currentTranslation}
                    />
                    : null
                }
                <section className='info-icon-container' onClick={() => setInfoState('more-info')}>
                    <figure className="info-icon">
                        <InfoIcon />
                        <figcaption className="sr-only">{iconDescription.info_icon}</figcaption>
                    </figure>
                </section>
            </div>
        </>
    )
}

export default memo(MovieInfo);