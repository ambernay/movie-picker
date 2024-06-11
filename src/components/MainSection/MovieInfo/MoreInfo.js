import { memo } from 'react';
import { useState, useEffect } from 'react';

import { MovieInfoApiCall } from '../../MovieApiCache.js';

function MovieInfo({ infoState, movieID, releaseDate, movieTitle, tvMovieToggle, 
    currentTranslation }) {

    const [moreInfoData, setMoreInfoData] = useState({});
    const [fetchStatus, setFetchStatus] = useState('Loading...');

    useEffect (() => {
        MovieInfoApiCall(movieID, tvMovieToggle).then(result => {
            
            const cast = result.cast.slice(0, 5);
            const directing = result.crew.filter((item) => item.job === 'Director');
            const screenWriting = result.crew.filter((item) => item.job === 'Screenplay')

            const moreInfoObj = {
                ...(cast && cast.length > 0) && {Cast: [...cast]},
                ...(directing && directing.length > 0) && {Directing: [...directing]},
                ...(screenWriting && screenWriting.length > 0) && {Screenplay: [...screenWriting]},
                ...(releaseDate) && {Release_Date: [releaseDate]}
            }

            setMoreInfoData(moreInfoObj);
            if (Object.keys(moreInfoObj).length < 1) setFetchStatus(`${currentTranslation.status_messages.no_results}`)
            if (!result || result < 1) setFetchStatus(`${currentTranslation.status_messages.failed_to_load}`);
        });
    },[setMoreInfoData])

    const capFirstChar = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <section className={infoState === 'more-info' ? 'movie-info' : 'hidden'}>
            <div className='wheretowatch-container'>
                <h4 className='wheretowatch-heading'>{movieTitle}</h4>
                <ul className='viewing-options-list-container'>
                    
                    {Object.keys(moreInfoData).length < 1 ? 
                        <div className='icon-message-container'>
                            <h4>{fetchStatus}</h4>
                        </div>
                    : Object.keys(moreInfoData).map((key) => {
                        // create lists
                        const listKey = key + '/' + movieID;
                        
                        const legendTitle = key === 'Cast' ? capFirstChar(currentTranslation.more_info.cast)
                        : key === "Directing" ? capFirstChar(currentTranslation.more_info.directing)
                        : key === "Screenplay" ? capFirstChar(currentTranslation.more_info.screenplay)
                        : key === "Release_Date" ? capFirstChar(currentTranslation.more_info.release_date)
                        : currentTranslation.status_messages.no_results;
                        
                        return (
                            <li className='option' key={listKey}>
                                <fieldset className='provider-list-fieldsets'>
                                    
                                    <legend>{legendTitle}</legend>
                                    <ul className='provider-options-list-container'>
                                        {/* create list name items */}
                                        { moreInfoData[key].map((key) => {
                                            const listKey = typeof(key) === typeof('release_date') 
                                            ?`${movieID}/${key}` 
                                            : `${movieID}/${key.credit_id}`;
                                            
                                            return (
                                                <li key={listKey} id={key.id}>
                                                    {key.name || key}
                                                </li>
                                            )
                                        })
                                        }
                                    </ul>
                                </fieldset>
                            </li>
                        )
                    }) 
                    }
                </ul>
            </div>
        </section>
    )
}

export default memo(MovieInfo);