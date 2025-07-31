import { memo, use } from 'react';
import { MovieInfoApiCall, GenreListApiCall } from '../../MovieApiCache.js';

function MoreInfo({ galleryPropsObj, movieInfoObj, capFirstChar }) {

    const { currentLanguage, currentTranslation, tvMovieToggle, setUserSelections, 
        setSearchState, personSearchState } = galleryPropsObj;

    const { id: movieID, media_type: mediaType, original_language: originalLanguage,
        origin_country: originCountryArr, genre_ids: genreIds, release_date: releaseDate, 
        first_air_date: airDate, character, job: crewCredits } = movieInfoObj

    let infoDataObj = {};
    const genres = use(GenreListApiCall(mediaType, currentLanguage));
    const movieInfo = use(MovieInfoApiCall(movieID, tvMovieToggle));
    
    // #region for populate info object
        // #region for person search
        if (character){
            //  array used for mapping
            infoDataObj.Character_Name = [character];
        }
        if (crewCredits){
            infoDataObj.Crew_Credits = crewCredits;
        }
        // #endregion for person search
        if (movieInfo) {
            const cast = movieInfo?.cast?.slice(0, 5);
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
        if (releaseDate || airDate){
            //  array used for mapping
            infoDataObj.Release_Date = [releaseDate || airDate];
        }
        if (genreIds && genres) {
            let genreNamesArray = genreIds.map(key => genres.find(item => item.id === key))
            infoDataObj.Genre_Ids = genreNamesArray;
        }
        if (originalLanguage) {
            //  array used for mapping
            infoDataObj.Languages = [originalLanguage.toUpperCase() ]; 
        }
        if (originCountryArr) {
            infoDataObj.Regions = originCountryArr; 
        }
    // #endregion for populate info object


    function handlePersonClick(personId, personName) {
        const searchCacheKey = `${personName.split(' ').join('_')}/${personId}`;
        setSearchState('person');
        setUserSelections([personId, searchCacheKey, [personId, capFirstChar(personName)]]);
    }

    const FailedFetchsMessage = () => {
        return(
            <div className='icon-message-container'>
                <h4>{`${currentTranslation.status_messages.no_results}`}</h4>
            </div>
        )
    }
 
    return (
        <>
        <ul className='movie-info-list-container movie-info-middle'>
            {Object.keys(infoDataObj)?.length < 1 ? 
                <FailedFetchsMessage/>
            : Object.keys(infoDataObj).map((key) => {
                // create lists
                const listKey = key + '/' + movieID;
                
                const legendTitle = key === 'Cast' ? capFirstChar(currentTranslation.movie_info.cast)
                : key === "Directing" ? capFirstChar(currentTranslation.movie_info.directing)
                : key === "ScreenPlay" ? capFirstChar(currentTranslation.movie_info.screenplay)
                : key === "Release_Date" ? capFirstChar(currentTranslation.movie_info.release_date)
                : key === "Genre_Ids" ? capFirstChar(currentTranslation.section_labels.genre)
                : key === "Languages" ? capFirstChar(currentTranslation.section_labels.languages)
                : key === "Regions" ? capFirstChar(currentTranslation.section_labels.regions)
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
                                    
                                    // typeof(key.gender) checks if list item is person - (typeof = num because 0 returns false)
                                    const isPerson = typeof(key.gender) === 'number';

                                    return (
                                        <li key={listKey} id={listKey} className={isPerson ? 'info-list-links' : null} 
                                            onClick={() => {isPerson ? handlePersonClick(key.id, key.name) : null}}
                                        >
                                            {/* screen reader info for links */}
                                            {isPerson ? 
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
        </ul>
        </>
    )
}

export default memo(MoreInfo);