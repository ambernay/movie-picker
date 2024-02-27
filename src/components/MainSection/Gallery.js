import { useState, useEffect } from 'react';
import GalleryItems from './GalleryItems.js';
import LoadMore from './LoadMore.js';

function Gallery({ isTrending, newURL, currentPage, setCurrentPage, isDropdownVisible, tvMovieToggle, currentRegion }) {

    const [moviesToDisplay, setMoviesToDisplay] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [statusMessage, setStatusMessage] = useState('Loading...');

    // stops background scroll when using tab keys
    const tabIndex = isDropdownVisible ? '-1' : '0';

    useEffect(() => {
        const defaultURL = new URL('https://api.themoviedb.org/3/trending/' + tvMovieToggle + '/day');
        const apiKey = '0a093f521e98a991f4e4cc2a12460255';

        // use default url on load or if trending selected else use newURL passed in from Form
        const url = isTrending ? defaultURL : newURL;

        // default trending url for landing page
        const params = new URLSearchParams({
            "api_key": apiKey,
            "language": "en-US",
            "page": currentPage
        });

        defaultURL.search = params;

        fetch(url)
            .then(results => {
                return results.json();
            })
            .then(data => {
                setMoviesToDisplay(data.results);
                setTotalPages(data.total_pages);

                // message for no results
                if (data.results < 1) { setStatusMessage('No results') };
            }).catch(() => {
                setStatusMessage("Failed to fetch trending");
            })

        // runs on url or currentPage change and form submission
    }, [isTrending, newURL, currentPage, tvMovieToggle, setTotalPages, setMoviesToDisplay]);

    return (
        <>
            <div className='wrapper'>

                {/* only renders on empty page */}
                {(moviesToDisplay.length < 1) ? (
                    <div className="message-container">
                        <h3>{statusMessage}</h3>
                    </div>
                ) : null
                }
                <div className="gallery-container">
                    <ul>
                        {moviesToDisplay.map((movie) => {
                            const imageURL = 'https://image.tmdb.org/t/p/w500';
                            {/* if image not available, use icon */ }
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
                                />
                            )
                        })}
                    </ul>
                </div>{/* gallery container */}
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