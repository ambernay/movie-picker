import { memo, Suspense } from 'react';
import ProviderIconsList from './ViewingOptions.js';
import MoreInfo from './MoreInfo.js';

import { EyeIcon, InfoIcon, TvIcon, FilmIcon } from '../../Icons.js';

function MovieInfo({ galleryPropsObj, movieInfoObj, infoState, setInfoState }) {

    const { currentTranslation, tvMovieToggle } = galleryPropsObj;

    const { id: movieID, title: movieTitle, name: movieName, 
        media_type: mediaType, overview } = movieInfoObj
    
    let iconDescription = currentTranslation['sr-only'];

    const capFirstChar = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const noResults = capFirstChar(currentTranslation.status_messages.no_results);

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

    const IconComponent = ({ mediaType }) => {
        const IconName = mediaType === 'movie' ? FilmIcon : TvIcon;
        const tooltip = mediaType === 'movie' ? currentTranslation.movie 
        : currentTranslation.tv;
        
        iconDescription = mediaType === 'movie' ? iconDescription.film_icon 
        : iconDescription.tv_icon;
        
        return (
            <figure title={tooltip} className="info-icon">
                <IconName />
                <figcaption className="sr-only">{iconDescription}</figcaption>
            </figure>
        )
    }
    
    const InfoComponent = () => {
        if (infoState === 'overview') { return <p className='movie-info-middle'>{overview || noResults}</p>}
        else if (infoState === 'provider-info') {
            return (
                /* only renders and fetches icons onclick */
                <Suspense fallback={<LoadingStatusMessage />}>
                    <ProviderIconsList
                        movieID={movieID}
                        galleryPropsObj={galleryPropsObj}
                        capFirstChar={capFirstChar}
                        LoadingStatusMessage={LoadingStatusMessage}
                    />
                </Suspense>
            )
        }
        else if (infoState === 'more-info') {
            return (
                <Suspense fallback={<LoadingStatusMessage />}>
                    <MoreInfo
                        galleryPropsObj={galleryPropsObj}
                        movieInfoObj={movieInfoObj}
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
                        <h4>{movieTitle || movieName}</h4>
                        <div className="info-heading-icon">
                            <IconComponent mediaType={mediaType || tvMovieToggle}/>
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