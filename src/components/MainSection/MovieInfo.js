import { memo } from 'react';
import ProviderIconsList from './ProviderIconsList.js';
import { EyeIcon } from '../Icons.js';

function MovieInfo({ overview, movieTitle, movieID, tvMovieToggle, 
    currentRegion, infoState, setInfoState, currentTranslation, setPersonInfo }) {

    const iconDescription = currentTranslation['sr-only'];
    const knownForCredit = overview[0];

    const handleMovieInfo = (e) => {
        if (typeof(overview) === 'object') {setPersonInfo([e.target.closest('li').id, knownForCredit])}
        // only allows provider info if not a person (overview is available)
        if (typeof(overview) !== 'object') {setInfoState('provider-info')}
    }

    // console.log(overview[1]);
    
    return (
        <>
            <div className='overview'>
                <div className={infoState === 'overview' ? 'movie-info' : 'hidden'}>
                    <div className='heading-container' onClick={handleMovieInfo}>
                        <h4>{movieTitle}</h4>
                        <figure className="eye-icon">
                            <EyeIcon />
                            <figcaption className="sr-only">{iconDescription.eye_icon}</figcaption>
                        </figure>
                    </div>
                    {typeof(overview) === 'string' ?
                        <p>{overview}</p>
                        :
                        <fieldset className='known-for-fieldset'>
                            <legend>{knownForCredit}</legend>
                            <ul>
                                {overview[1]?.map((credit) => {
                                    return(
                                        <li>
                                            <img id={credit.id} src={`https://image.tmdb.org/t/p/w500${credit.poster_path}`} alt={credit.original_title} />
                                        </li>
                                    )
                                })}
                            </ul>
                        </fieldset>     
                    }
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
            </div>
        </>
    )
}

export default memo(MovieInfo);