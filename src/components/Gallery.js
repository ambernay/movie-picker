import { useEffect } from 'react';
import GalleryItems from './GalleryItems.js';

function Gallery({ setMoviesToDisplay, moviesToDisplay, isFormSubmitted, newURL, currentPage } ) {

    const defaultURL = new URL('https://api.themoviedb.org/3/trending/movie/day');
    const apiKey = '0a093f521e98a991f4e4cc2a12460255';
    const params = new URLSearchParams({
        "api_key": apiKey,
        "page": currentPage
    });
    defaultURL.search = params;

    const url = isFormSubmitted ? newURL : defaultURL;

    useEffect(() => {
        fetch(url)
            .then(results => {
                return results.json();
            })
            .then(data => {
                setMoviesToDisplay(data.results);
            })
            // runs on url or currentPage change and form submission
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, isFormSubmitted, currentPage]);

    return (
        <>
            <div className='wrapper'>
                <div className="gallery-container">
                    <ul>
                        {moviesToDisplay.map((movie) => {
                            const imageURL = 'https://image.tmdb.org/t/p/w500';

                            const imagePath = movie.poster_path ? (imageURL + movie.poster_path) : "../assets/icons/tv-outline.svg";

                            return (
                                <GalleryItems
                                    key={movie.id}
                                    movieTitle={movie.title}
                                    overview={
                                        movie.overview ||
                                        "No description available"}
                                    imagePath={imagePath}
                                    audienceRating={(movie.vote_average).toFixed(1)}
                                />
                            )
                        })}
                    </ul>
                </div>{/* gallery container */}
            </div>{/* wrapper */}
        </>
    )
}

export default Gallery;