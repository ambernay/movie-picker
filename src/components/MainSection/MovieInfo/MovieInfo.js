import { memo, Suspense } from 'react';
import ProviderIconsList from './ProviderIconsList.js';
import MoreInfo from './MoreInfo.js';

import { EyeIcon, InfoIcon, TvIcon } from '../../Icons.js';

function MovieInfo({ movieTitle, overview, galleryPropsObj, currentRegion, 
    infoState, setInfoState }) {

    const { movieID, mediaType, originalLanguage, originCountryArr, 
        genreIds, releaseDate, character, crewCredits, currentLanguage, 
        currentTranslation, tvMovieToggle, setUserSelections, 
        setSearchState, personSearchState } = galleryPropsObj;
    
    const iconDescription = currentTranslation['sr-only'];

    const capFirstChar = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function handleInfoState(iconState) {
        if (infoState !== iconState) {
            setInfoState(iconState);
        }else {
            setInfoState('overview');
        }
    }

    const LoadingStatusMessage = () => {
        return(
            <div className='icon-message-container'>
                <h4>{`${capFirstChar(currentTranslation.status_messages.loading)}...`}</h4>
            </div>
        )
    }
    
    const InfoComponent = () => {
        if (infoState === 'overview') { return <p className='movie-info-middle'>{overview}</p>}
        else if (infoState === 'provider-info') {
            return (
                /* only renders and fetches icons onclick */
                <Suspense fallback={<LoadingStatusMessage />}>
                    <ProviderIconsList
                        movieID={movieID}
                        tvMovieToggle={tvMovieToggle}
                        currentRegion={currentRegion}
                        currentTranslation={currentTranslation}
                        capFirstChar={capFirstChar}
                    />
                </Suspense>
            )
        }
        else if (infoState === 'more-info') {
            return (
                <Suspense fallback={<LoadingStatusMessage />}>
                    <MoreInfo
                        galleryPropsObj={galleryPropsObj}
                        capFirstChar={capFirstChar}
                    />
                </Suspense>
            )
        }
    }

    return (
        <>
            <div className='movie-info-container'>
                <div className={infoState === 'overview' ? 'overview' 
                : infoState === 'more-info' || 'provider-info' ? 'more-info' : 'hidden'}>
                    <section className='heading-container'>
                        <h4>{movieTitle}</h4>
                        <div className="info-heading-icon">
                            <figure title={iconDescription.more_info} className="info-icon">
                                <TvIcon />
                                <figcaption className="sr-only">{iconDescription.info_icon}</figcaption>
                            </figure>
                        </div>
                    </section>
                    <InfoComponent/>
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
        </>
    )
}

export default memo(MovieInfo);