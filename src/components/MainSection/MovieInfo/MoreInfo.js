import { memo } from 'react';
import { useState, useEffect } from 'react';

import { MovieInfoApiCall } from '../../MovieApiCache.js';

function MovieInfo({ infoState, movieID, movieTitle, currentTranslation }) {

    const [moreInfoData, setMoreInfoData] = useState({});
    const [fetchStatus, setFetchStatus] = useState('Loading...');

    useEffect (() => {
        MovieInfoApiCall(movieID).then(result => {
            const cast = result.cast.slice(0, 5);
            const directing = result.crew.filter((item) => item.job === 'Director');
            const screenWriting = result.crew.filter((item) => item.job === 'Screenplay')

            setMoreInfoData({Cast: [...cast], Directing: [...directing], Screenplay: [...screenWriting]});
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
                    {moreInfoData ? Object.keys(moreInfoData).map((key) => {
                        // create lists
                        const listKey = key + '/' + movieID;
                        
                        const legendTitle = key === 'Cast' ? capFirstChar(currentTranslation.more_info.cast)
                        : key === "Directing" ? capFirstChar(currentTranslation.more_info.directing)
                        : key === "Screenplay" ? capFirstChar(currentTranslation.more_info.screenplay)
                        : currentTranslation.status_messages.no_results;
                        
                        if (moreInfoData[key].length){ 
                            return (
                                <li className='option' key={listKey}>
                                    <fieldset className='provider-list-fieldsets'>
                                        
                                        <legend>{legendTitle}</legend>
                                        <ul className='provider-options-list-container'>
                                            {/* create list name items */}
                                            { moreInfoData[key].map((key) => {
                                                const listKey = movieID + '/' + key.job + key.name;
                                                
                                                return (
                                                    <li key={listKey}>
                                                        {key.name}
                                                    </li>
                                                )
                                            })
                                            }
                                        </ul>
                                    </fieldset>
                                </li>
                            )
                        }
                    }) :
                        <div className='icon-message-container'>
                            <h4>{fetchStatus}</h4>
                        </div>
                    }
                </ul>
            </div>
        </section>
    )
}

export default memo(MovieInfo);