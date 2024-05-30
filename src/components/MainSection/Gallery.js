import { useState, useEffect } from 'react';
import GalleryItems from './GalleryItems.js';
import LoadMore from './LoadMore.js';
import { MoviesApiCall, SearchApiCall } from '../MovieApiCache.js';
import { TransObj } from '../TranslationObjects.js';

function Gallery({ isTrending, userSelections, searchBarQuery, currentPage,
     setCurrentPage, isDropdownVisible, tvMovieToggle, currentRegion, 
     currentLanguage, searchState, searchType }) {

    const capFirstChar = (string) => {return string.charAt(0).toUpperCase() + string.slice(1);}

    const currentTranslation = TransObj[`${currentLanguage[0]}`];
    const noResults = capFirstChar(currentTranslation.status_messages.no_results);
    const loadingMessage = capFirstChar(currentTranslation.status_messages.loading);
    const failedToLoad = capFirstChar(currentTranslation.status_messages.failed_to_load);
    const trending = capFirstChar(currentTranslation.trending);


    const [moviesToDisplay, setMoviesToDisplay] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [statusMessage, setStatusMessage] = useState(loadingMessage);
    
    // stops background scroll when using tab keys
    const tabIndex = isDropdownVisible ? '-1' : '0';

    useEffect(() => {
        if (searchType !== 'person'){
            console.log(searchState, 'gettingmovies');
            MoviesApiCall(currentPage, tvMovieToggle, isTrending, currentLanguage, userSelections, searchState).then(result => {
                setStatusMessage(loadingMessage);
                console.log(result);
                let mediaType = tvMovieToggle === 'movie' ? 'movies' : 'TV shows';
                // list of user selections for 'no results' message
                let messageArr = userSelections[2]?.join(' / ');
                setTotalPages(result.totalPages);
                setMoviesToDisplay(result.movieResults);
                // message for no results
                if (!result.movieResults && isTrending){setStatusMessage(`${failedToLoad} ${trending} ${mediaType}`)}
                else if (!result.movieResults && !isTrending){setStatusMessage(`${failedToLoad}:\n\n${messageArr}`)}
                else if (result.movieResults < 1) {setStatusMessage(`${noResults}:\n\n${messageArr}`)};
            });
        }
        else if (searchType === 'person') {
            console.log(searchState, 'running search');
            SearchApiCall(searchType, userSelections, currentPage, currentLanguage).then(result => {
                console.log(searchState, searchType);
                console.log(userSelections, result.results);
                setTotalPages(result.totalPages);
                setMoviesToDisplay(result.results);
            })
        }
    }, [isTrending, userSelections, searchBarQuery, currentPage, currentRegion, currentLanguage, tvMovieToggle, searchState, setTotalPages, setMoviesToDisplay]);

    return (
        <>
            <div className='wrapper main-wrapper'>
                {/* only renders on empty page */}
                {!moviesToDisplay || (moviesToDisplay.length < 1) ? (
                    <div className="message-container">
                        <h3>{statusMessage}</h3>
                    </div>
                ) :
                    <div className="gallery-container">
                        <ul className='gallery-list-container'>
                            {moviesToDisplay?.map((movie) => {
                                const imageURL = 'https://image.tmdb.org/t/p/w500';
                                /* if image not available, use icon */
                                const imagePath = (movie.poster_path || movie.profile_path) ? 
                                (imageURL + (movie.poster_path || movie.profile_path)) 
                                : "../assets/icons/tv-outline.svg";
                                console.log(movie.known_for);
                                
                                return (
                                    <GalleryItems
                                        key={movie.id}
                                        tabIndex={tabIndex}
                                        movieTitle={movie.title || movie.name}
                                        overview={
                                            movie.overview 
                                            || [movie.known_for_department, movie.known_for]
                                            || "No description available"
                                        }
                                        imagePath={imagePath}
                                        audienceRating={
                                            (movie.vote_average)?.toFixed(1) 
                                            || (movie.popularity)?.toFixed(1)
                                        }
                                        movieID={movie.id}
                                        tvMovieToggle={tvMovieToggle}
                                        currentRegion={currentRegion}
                                        currentTranslation={currentTranslation}
                                    />
                                )
                            })}
                        </ul>
                    </div>/* gallery container */
                }
            </div>{/* wrapper */}
            <LoadMore
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                moviesArrayLength={moviesToDisplay?.length}
                totalPages={totalPages}
                currentTranslation={currentTranslation}
            />
        </>
    )
}

export default Gallery;