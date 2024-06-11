import { memo } from 'react';

import ProviderIconsList from './ProviderIconsList.js';
import MoreInfo from './MoreInfo.js';

import { EyeIcon, InfoIcon } from '../../Icons.js';

function MovieInfo({ movieTitle, overview, tvMovieToggle, movieID, releaseDate, currentRegion, 
    infoState, setInfoState, currentTranslation }) {
    
    const iconDescription = currentTranslation['sr-only'];

    return (
        <>
            <div className='movie-info-container'>
                <div className={infoState === 'overview' ? 'overview' 
                : infoState === 'more-info' || 'provider-info' ? 'more-info' : 'hidden'}>
                    <section className='heading-container' onClick={() => setInfoState('provider-info')}>
                        <h4>{movieTitle}</h4>
                        <figure className="eye-icon">
                            <EyeIcon />
                            <figcaption className="sr-only">{iconDescription.eye_icon}</figcaption>
                        </figure>
                    </section>
                    {infoState === 'overview' ?
                        <p className='movie-info-middle'>{overview}</p>
                        : null
                    }
                
                    {infoState === 'provider-info' ?
                        /* only renders and fetches icons onclick */
                        <ProviderIconsList
                            movieID={movieID}
                            tvMovieToggle={tvMovieToggle}
                            currentRegion={currentRegion}
                            currentTranslation={currentTranslation}
                        />
                        : null
                    }
                    {infoState === 'more-info' ?
                        /* only renders and fetches icons onclick */
                        <MoreInfo
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
            </div>
        </>
    )
}

export default memo(MovieInfo);