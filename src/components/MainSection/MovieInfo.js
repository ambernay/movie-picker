import { memo } from 'react';

import ProviderIconsList from './ProviderIconsList.js';
import { EyeIcon } from '../Icons.js';

function MovieInfo({ overview, movieTitle, movieID, tvMovieToggle, 
    currentRegion, infoState, setInfoState, currentTranslation }) {

    const iconDescription = currentTranslation['sr-only'];

    const handleMovieInfo = () => {
        setInfoState('provider-info');
    }
    // const popularCredits = movie.known_for?.map((movie) => {
    //     return(
    //         <ul>
    //             <li>movie.original_title</li>
    //         </ul>
    //         )
    // })
    const overviewInfo = () => {
        if (typeof(overview) === 'string') {console.log('string')}
        else {console.log('else')}
    }
    overviewInfo();
    console.log(typeof(overview));
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
                            <legend>{overview[0]}</legend>
                            <ul>
                                {overview[1]?.map((credit) => {
                                    return(<li>{credit.original_title}</li>)
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