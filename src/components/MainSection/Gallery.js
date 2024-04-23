import { useState, useEffect } from 'react';
import GalleryItems from './GalleryItems.js';
import LoadMore from './LoadMore.js';
import { MoviesApiCall } from '../MovieApiCache.js';

function Gallery({ isTrending, userSelections, currentPage, setCurrentPage, isDropdownVisible, tvMovieToggle, currentRegion, currentActiveElement }) {

    const [moviesToDisplay, setMoviesToDisplay] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [statusMessage, setStatusMessage] = useState('Loading...');

    // stops background scroll when using tab keys
    const tabIndex = isDropdownVisible ? '-1' : '0';

    useEffect(() => {

        MoviesApiCall(currentPage, tvMovieToggle, isTrending, userSelections, setStatusMessage).then(result => {
            console.log(result);
            setTotalPages(result.totalPages);
            setMoviesToDisplay(result.movieResults);
            // message for no results
            if (result.movieResults < 1) { setStatusMessage('No results') };
        });

        // runs on url or currentPage change and form submission
    }, [isTrending, userSelections, currentPage, tvMovieToggle, setTotalPages, setMoviesToDisplay]);

    return (
        <>
            <div className='wrapper'>
                {/* only renders on empty page */}
                {!moviesToDisplay || (moviesToDisplay.length < 1) ? (
                    <div className="message-container">
                        <h3>{statusMessage}</h3>
                    </div>
                ) :
                    <div className="gallery-container">
                        <ul className='gallery-list-container'>
                            {moviesToDisplay.map((movie) => {
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
                                        audienceRating={(movie.vote_average).toFixed(1)}
                                        movieID={movie.id}
                                        tvMovieToggle={tvMovieToggle}
                                        currentRegion={currentRegion}
                                        currentActiveElement={currentActiveElement}
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
                moviesArrayLength={moviesToDisplay.length}
                totalPages={totalPages}
            />
        </>
    )
}

export default Gallery;