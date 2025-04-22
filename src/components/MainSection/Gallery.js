import { useState, useEffect } from 'react';
import GalleryItems from './GalleryItems.js';
import LoadMore from './LoadMore.js';
import { MoviesApiCall } from '../MovieApiCache.js';
import { TransObj } from '../TranslationObjects.js';

function Gallery({ isTrending, userSelections, searchBarQuery, currentPage,
     setCurrentPage, isFormVisible, tvMovieToggle, currentRegion, 
     currentLanguage, searchState, setSearchState, isSearchbarOpen, setUserSelections }) {

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
    const tabIndex = isFormVisible ? '-1' : '0';

    useEffect(() => {
        if (!isSearchbarOpen && !isFormVisible) {
            setStatusMessage(loadingMessage);
            MoviesApiCall(currentPage, tvMovieToggle, isTrending, currentLanguage,
                userSelections, searchState).then(result => {
                    // list of user selections for 'no results' message
                    let messageArr = userSelections[2]?.join(' / ');
                    let mediaType = tvMovieToggle === 'movie' ? 'movies' : 'TV shows';
                    console.log(userSelections);
                if (result) {
                    setTotalPages(result?.totalPages);
                    setMoviesToDisplay(result?.movieResults);
                    // message for no results
                    if (result?.movieResults < 1) {setStatusMessage(`${noResults}:\n\n${messageArr}`)};
                }
                else {
                    // message for no results
                    if (isTrending){setStatusMessage(`${failedToLoad} ${trending} ${mediaType}`)}
                    else if (!isTrending){setStatusMessage(`${failedToLoad}:\n\n${messageArr}`)}
                }
            });
        }
    }, [isTrending, userSelections, searchBarQuery, currentPage, currentRegion,
         currentLanguage, tvMovieToggle, searchState, isFormVisible, isSearchbarOpen,
         setTotalPages, setMoviesToDisplay]);

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
                                const imagePath = movie.poster_path ? (imageURL + movie.poster_path) : "../assets/icons/tv-outline.svg";

                                return (
                                    <GalleryItems
                                        key={movie.id}
                                        tabIndex={tabIndex}
                                        movieTitle={movie.title || movie.name}
                                        overview={
                                            movie.overview ||
                                            "No description available"}
                                        imagePath={imagePath}
                                        audienceRating={(movie.vote_average)?.toFixed(1)}
                                        movieID={movie.id}
                                        releaseDate={movie.release_date ? movie.release_date : undefined}
                                        tvMovieToggle={tvMovieToggle}
                                        currentRegion={currentRegion}
                                        currentTranslation={currentTranslation}
                                        setSearchState={setSearchState}
                                        setUserSelections={setUserSelections}
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
                isFormVisible={isFormVisible}
            />
        </>
    )
}

export default Gallery;