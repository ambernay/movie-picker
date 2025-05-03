import { memo , useState, use, Suspense } from 'react';
import { MovieInfoApiCall, GenreListApiCall } from '../../MovieApiCache.js';

function MoreInfo({ galleryPropsObj }) {

    const [fetchStatus, setFetchStatus] = useState('Loading...');
    
    const { movieID, mediaType, genreIds, releaseDate, character, crewCredits, 
        currentLanguage, currentTranslation, tvMovieToggle, 
        setUserSelections, setSearchState, personSearchState } = galleryPropsObj;

    let infoDataObj = {};
    const genres = use(GenreListApiCall(mediaType, currentLanguage));
    const movieInfo = use(MovieInfoApiCall(movieID, tvMovieToggle));
    
    const capFirstChar = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    // #region for populate info object
        // #region for person search
        if (character){
            infoDataObj.Character_Name = [character];
        }
        if (crewCredits){
            infoDataObj.Crew_Credits = crewCredits;
        }
        // #endregion for person search
        if (movieInfo) {
            const cast = movieInfo?.cast?.slice(0, 5);
            console.log(cast);
            const directing = movieInfo?.crew?.filter((item) => item.job === 'Director');
            const screenWriting = movieInfo?.crew?.filter((item) => item.job === 'Screenplay');
            
            if (cast && cast.length > 0) {
                infoDataObj.Cast = cast;
            }
            if (directing && directing.length > 0){
                infoDataObj.Directing = directing;
            }
            if (screenWriting && screenWriting.length > 0){
                infoDataObj.ScreenPlay = screenWriting;
            }
        }
        if (releaseDate){
            infoDataObj.Release_Date = [releaseDate];
        }
        if (genreIds && genres) {
            console.log(genreIds);
            let genreNamesArray = genreIds.map(key => genres.find(item => item.id === key))
            infoDataObj.Genre_Ids = genreNamesArray;
        }
        if (mediaType){
            const mediaToDisplay = mediaType === 'movie' 
            ? capFirstChar(currentTranslation.movie) : currentTranslation.tv;
            
            infoDataObj.Media_Type = [mediaToDisplay];
        }

        if (Object.keys(infoDataObj).length < 1) {
            setFetchStatus(`${currentTranslation.status_messages.no_results}`);
            return;
        }
    // #endregion for populate info object


    function handlePersonClick(personId, personName) {
        const searchCacheKey = `${personName.split(' ').join('_')}/${personId}`;
        setSearchState('person');
        setUserSelections([personId, searchCacheKey, [personId, capFirstChar(personName)]]);
    }
 
    return (
        <>
        <ul className='movie-info-list-container movie-info-middle'>
        <Suspense fallback={<h4>Loading...</h4>}>
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
                : key === "Genre_Ids" ? capFirstChar(currentTranslation.section_labels.genre)
                : key === "Media_Type" ? null
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
                                    ? (`${movieID}/${key.id}`).split(' ').join('_') 
                                    : (`${movieID}/${key}`).split(' ').join('_');
                                  
                                    return (
                                        <li key={listKey} id={listKey} 
                                        // checks if list item is person using key.gender
                                            onClick={() => {key.gender ? handlePersonClick(key.id, key.name) : null}}
                                        >
                                            {/* screen reader info for links */}
                                            {key.gender ? 
                                                <span className="sr-only">{`${currentTranslation.search} ${key.name}`}</span>
                                                : null
                                            }
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