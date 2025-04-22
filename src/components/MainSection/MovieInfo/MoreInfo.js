import { memo } from 'react';
import { useState, useEffect } from 'react';

import { MovieInfoApiCall } from '../../MovieApiCache.js';

function MovieInfo({ movieID, releaseDate, tvMovieToggle, currentTranslation,
    setSearchState, setUserSelections}) {

    const [moreInfoData, setMoreInfoData] = useState({});
    const [fetchStatus, setFetchStatus] = useState('Loading...');

    useEffect (() => {
        MovieInfoApiCall(movieID, tvMovieToggle).then(result => {
            
            if (!result || Object.keys(result).length < 1) {
                setFetchStatus(`${currentTranslation.status_messages.no_results}`);
                return;
            }

            const cast = result?.cast?.slice(0, 5);
            const directing = result?.crew?.filter((item) => item.job === 'Director');
            const screenWriting = result?.crew?.filter((item) => item.job === 'Screenplay')

            const moreInfoObj = {}
            if (cast && cast.length > 0) {
                moreInfoObj.Cast = cast;
            }
            if (directing && directing.length > 0){
                moreInfoObj.Directing = directing;
            }

            if (screenWriting && screenWriting.length > 0){
                moreInfoObj.ScreenPlay = screenWriting;
            }
            if (releaseDate){
                moreInfoObj.Release_Date = [releaseDate];
            }

            setMoreInfoData(moreInfoObj);
            if (Object.keys(moreInfoObj).length < 1) setFetchStatus(`${currentTranslation.status_messages.no_results}`)
        });
    },[setMoreInfoData])

    const capFirstChar = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function handlePersonClick(personId) {
        setSearchState('person');
        setUserSelections(880);
        console.log(typeof(`${personId}`));
    }

    return (
        <>
        <ul className='movie-info-list-container movie-info-middle'>
            
            {Object.keys(moreInfoData)?.length < 1 ? 
                <div className='icon-message-container'>
                    <h4>{fetchStatus}</h4>
                </div>
            : Object.keys(moreInfoData).map((key) => {
                // create lists
                const listKey = key + '/' + movieID;
                
                const legendTitle = key === 'Cast' ? capFirstChar(currentTranslation.movie_info.cast)
                : key === "Directing" ? capFirstChar(currentTranslation.movie_info.directing)
                : key === "ScreenPlay" ? capFirstChar(currentTranslation.movie_info.screenplay)
                : key === "Release_Date" ? capFirstChar(currentTranslation.movie_info.release_date)
                : key;
     
                return (
                    <li key={listKey}>
                        <fieldset className='movie-info-list-fieldsets'>
                            
                            <legend>{legendTitle}</legend>
                            <ul className='movie-info-list'>
                                {/* create list name items */}
                                { moreInfoData[key]?.map((key) => {
                                    const listKey = typeof(key) === typeof('release_date') 
                                    ?`${movieID}/${key}` 
                                    : `${movieID}/${key.credit_id}`;
                                    
                                    return (
                                        <li key={listKey} id={key.id} onClick={() => handlePersonClick(key.id)}>
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
        </>
    )
}

export default memo(MovieInfo);