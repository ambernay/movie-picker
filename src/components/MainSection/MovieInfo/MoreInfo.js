import { memo } from 'react';
import { useState, useEffect } from 'react';
import { MovieInfoApiCall, GenreListApiCall } from '../../MovieApiCache.js';

function MoreInfo({ galleryPropsObj }) {

    const [moreInfoData, setMoreInfoData] = useState({});
    const [fetchStatus, setFetchStatus] = useState('Loading...');
    const [personSearchState, setPersonSearchState] = useState([]);

    const { movieID, genreIds, releaseDate, character, crewCredits, 
        currentLanguage, currentTranslation, tvMovieToggle, 
        setUserSelections, setSearchState } = galleryPropsObj;

    let genreNamesList = function (genreIds, genreApiList) {
        return (genreIds.map(key => genreApiList.find(item => item.id === key)))
    };

    const capFirstChar = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect (() => {
        MovieInfoApiCall(movieID, tvMovieToggle).then(result => {
            
            if (!result || Object.keys(result).length < 1) {
                setFetchStatus(`${currentTranslation.status_messages.no_results}`);
                return;
            }
            const cast = result?.cast?.slice(0, 5);
            const directing = result?.crew?.filter((item) => item.job === 'Director');
            const screenWriting = result?.crew?.filter((item) => item.job === 'Screenplay');
            
            const moreInfoObj = {}
        // #region for person search
            if (character){
                moreInfoObj.Character_Name = [character];
            }
            if (crewCredits){
                moreInfoObj.Crew_Credits = [crewCredits];
            }
        // #endregion for person search
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
            if(genreIds){
                moreInfoObj.Genre_Ids = genreNamesList;
            }
            
            setMoreInfoData(moreInfoObj);
            if (Object.keys(moreInfoObj).length < 1) setFetchStatus(`${currentTranslation.status_messages.no_results}`)
        });
    },[movieID, tvMovieToggle, currentTranslation, setMoreInfoData, setFetchStatus])

    // need to match genres id
    useEffect(() => {
        GenreListApiCall(tvMovieToggle, currentLanguage).then(result => {
            if (result) {
                genreNamesList = genreNamesList(genreIds, result);
            }
        });
    }, [tvMovieToggle, currentLanguage, genreIds]);

    function handlePersonClick(personId, personName) {
        const searchCacheKey = `${personName.split(' ').join('_')}/${personId}`;
        setSearchState('person');
        setPersonSearchState([capFirstChar(personName), personId]);
        setUserSelections([personId, searchCacheKey, [personId, capFirstChar(personName)]]);
        console.log(personId, personName);
    }

    // function findGenreNamesById(genreIds, genreApiList) {
    //     return (genreIds.map(key => genreApiList.find(item => item.id === key)))
    //     return (a.map(key => b.find(item => item.id === key)))

    // }

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
                : key === "Genre_Ids" ? "Genres"
                : key === "Character_Name" ? 'Character'
                : key === "Crew_Credits" ? 'Crew Credits'
                : key;
     
                return (
                    <li key={listKey}>
                        <fieldset className='movie-info-list-fieldsets'>
                            
                            <legend>{legendTitle}</legend>
                            <ul className='movie-info-list'>
                                {/* create list name items */}
                                { moreInfoData[key]?.map((key) => {
                                    
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
        </ul>
        </>
    )
}

export default memo(MoreInfo);