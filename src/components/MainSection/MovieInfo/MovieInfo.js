import { memo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ProviderIconsList from './ProviderIconsList.js';
import MoreInfo from './MoreInfo.js';

import { EyeIcon, InfoIcon } from '../../Icons.js';

function MovieInfo({ movieTitle, overview, galleryPropsObj, currentRegion, 
    infoState, setInfoState }) {

    const { movieID, genreIds, releaseDate, character, crewCredits, 
        currentLanguage, currentTranslation, tvMovieToggle, 
        setUserSelections, setSearchState, personSearchState } = galleryPropsObj;
    
    const iconDescription = currentTranslation['sr-only'];

    function handleInfoState(iconState) {
        if (infoState !== iconState) {
            setInfoState(iconState);
        }else {
            setInfoState('overview');
        }
    }

    const ErrorFallback = ({error}) => {
        console.log(error);
        let errorStatus = `${currentTranslation.status_messages.no_results}`
        return (
            <div className='icon-message-container'>
                <h4>{errorStatus}</h4>
            </div>
        )
    }

    return (
        <>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div className='movie-info-container'>
                <div className={infoState === 'overview' ? 'overview' 
                : infoState === 'more-info' || 'provider-info' ? 'more-info' : 'hidden'}>
                    <section className='heading-container'>
                        <h4>{movieTitle}</h4>
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
                            galleryPropsObj={galleryPropsObj}
                        />
                        : null
                    }
                    <section className='info-icon-container'>
                        <button className= {`${infoState === 'more-info' ? 'button-down' : 'button-up'}`}>
                            <figure title={iconDescription.more_info} className="info-icon"
                            onClick={() => handleInfoState('more-info')}>
                                <InfoIcon />
                                <figcaption className="sr-only">{iconDescription.info_icon}</figcaption>
                            </figure>
                        </button>
                        <button className={`${infoState === 'provider-info' ? 'button-down' : 'button-up'}`}>
                            <figure title={iconDescription.viewing_options} className= "info-icon"
                            onClick={() => handleInfoState('provider-info')}>
                                <EyeIcon />
                                <figcaption className="sr-only">{iconDescription.eye_icon}</figcaption>
                            </figure>
                        </button>
                    </section>
                </div>
            </div>
        </ErrorBoundary>
        </>
    )
}

export default memo(MovieInfo);