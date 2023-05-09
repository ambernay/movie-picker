import { useEffect } from 'react';
import GalleryItems from './GalleryItems.js';

function Gallery({ setMoviesToDisplay, moviesToDisplay, isFormSubmitted, newURL } ) {

    const apiKey = 'api_key=0a093f521e98a991f4e4cc2a12460255';
    const baseURL = 'https://api.themoviedb.org/3';
    const defaultURL = 'https://api.themoviedb.org/3/trending/movie/day?' + apiKey;

    const url = isFormSubmitted ? newURL : defaultURL;
    // console.log(url);
    useEffect(() => {
        fetch(url)
            .then(results => {
                return results.json();
            })
            .then(data => {
                // console.log(data.results);
                setMoviesToDisplay(data.results);
                // console.log(moviesToDisplay);
            })
    }, [newURL]);

    return (
        <main>
            <div className='wrapper'>
                <div className="gallery-container">
                    <ul>
                        {moviesToDisplay.map((movie) => {
                            const imageURL = 'https://image.tmdb.org/t/p/w500';

                            const imagePath = movie.poster_path ? (imageURL + movie.poster_path) : "../assets/icons/tv-outline.svg";

                            if (moviesToDisplay.indexOf(movie) < 12){
                                return (
                                    <GalleryItems
                                        key={movie.id}
                                        movieTitle={movie.title}
                                        overview={
                                            movie.overview ||
                                            "No description available"}
                                        imagePath={imagePath}
                                    />
                                )
                            }
                        })}
                    </ul>
                </div>{/* gallery container */}
            </div>{/* wrapper */}
        </main>
    )
}

export default Gallery;