import { memo } from 'react';
import { useState, useEffect, use, Suspense } from 'react';
import { MovieInfoApiCall, GenreListApiCall } from '../../MovieApiCache.js';
import { TransObj } from '../../TranslationObjects.js';

function MoreInfo({ galleryPropsObj }) {

    // const [infoDataStateObj, setinfoStateDataObj] = useState({});
    const [fetchStatus, setFetchStatus] = useState('Loading...');
    // const [personSearchState, setPersonSearchState] = useState([]);

    const { movieID, genreIds, releaseDate, character, crewCredits, 
        currentLanguage, currentTranslation, tvMovieToggle, 
        setUserSelections, setSearchState, personSearchState } = galleryPropsObj;

    let infoDataObj = {};
    // const genres = use(GenreListApiCall(tvMovieToggle, currentLanguage));
    const movieInfo = use(MovieInfoApiCall(movieID, tvMovieToggle));
    // console.log(movieInfo);
    
    const capFirstChar = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // console.log(capFirstChar(currentTranslation.section_labels.genre))

    useEffect (() => {
        // #region for person search
        if (character){
            infoDataObj.Character_Name = [character];
        }
        if (crewCredits){
            infoDataObj.Crew_Credits = [crewCredits];
        }
        // #endregion for person search
        if (releaseDate){
            infoDataObj.Release_Date = [releaseDate];
        }

        // if (movieInfo) {
        //     const cast = movieInfo?.cast?.slice(0, 5);
        //     const directing = movieInfo?.crew?.filter((item) => item.job === 'Director');
        //     const screenWriting = movieInfo?.crew?.filter((item) => item.job === 'Screenplay');
            
        //     if (cast && cast.length > 0) {
        //         infoDataObj.Cast = cast;
        //     }
        //     if (directing && directing.length > 0){
        //         infoDataObj.Directing = directing;
        //     }
        //     if (screenWriting && screenWriting.length > 0){
        //         infoDataObj.ScreenPlay = screenWriting;
        //     }
        // }
        if (genreIds && genres) {    
            let genreNamesArray = genreIds.map(key => genres.find(item => item.id === key))
            infoDataObj.Genre_Ids = genreNamesArray;
        }

        if (Object.keys(infoDataObj).length < 1) {
            setFetchStatus(`${currentTranslation.status_messages.no_results}`);
            return;
        }
    },[setFetchStatus])

    function handlePersonClick(personId, personName) {
        const searchCacheKey = `${personName.split(' ').join('_')}/${personId}`;
        setSearchState('person');
        // setPersonSearchState([capFirstChar(personName), personId])
        setUserSelections([personId, searchCacheKey, [personId, capFirstChar(personName)]]);
        // console.log(personSearchState);
    }   

    return (
        <>
        <ul className='movie-info-list-container movie-info-middle'>
        <Suspense fallback={<h2>Loading...</h2>}>
            {Object.keys(infoDataObj)?.length < 1 ? 
                <div className='icon-message-container'>
                    <h4>{fetchStatus}</h4>
                </div>
            : Object.keys(infoDataObj).map((key) => {
                // create lists
                const listKey = key + '/' + movieID;
                
                const legendTitle = key === 'Cast' ? capFirstChar(currentTranslation.movie_info.cast)
                : key === "Directing" ? capFirstChar(currentTranslation.movie_info.directing)
                : key === "ScreenPlay" ? capFirstChar(currentTranslation.movie_info.screenplay)
                : key === "Release_Date" ? capFirstChar(currentTranslation.movie_info.release_date)
                : key === "Genre_Ids" ? 'Genre'
                : key === "Character_Name" ? `${personSearchState[1]} as:`
                : key === "Crew_Credits" ? `${personSearchState[1]} - Crew Credits:`
                : key;
     
                return (
                    <li key={listKey}>
                        <fieldset className='movie-info-list-fieldsets'>
                            
                            <legend>{legendTitle}</legend>
                            <ul className='movie-info-list'>
                                {/* create list name items */}
                                { infoDataObj[key]?.map((key) => {
                             
                                    const listKey = typeof(key) === typeof({}) 
                                    ?`${movieID}/${key.id}` : `${movieID}/${key}`;
                                    
                                    return (
                                        <li key={listKey} id={key.id} onClick={() => handlePersonClick(key.id, key.name)}>
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
        </Suspense>
        </ul>
        </>
    )
}

export default memo(MoreInfo);