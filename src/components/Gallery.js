import { useState, useEffect } from 'react';
import GalleryItems from './GalleryItems.js';

function Gallery({ setMoviesToDisplay, moviesToDisplay, isSubmitted, newURL } ) {

    const apiKey = 'api_key=0a093f521e98a991f4e4cc2a12460255';
    const baseURL = 'https://api.themoviedb.org/3';
    const defaultURL = 'https://api.themoviedb.org/3/trending/movie/day?' + apiKey;

    const url = isSubmitted ? newURL : defaultURL;

    useEffect(() => {
        fetch(url)
            .then(results => {
                return results.json();
            })
            .then(data => {
                console.log(data.results);
                setMoviesToDisplay(data.results);
            })
    }, []);

    return (
        <main>
            <div className='wrapper'>
                <div className="gallery-container">
                    <ul>
                        {moviesToDisplay.map((movie) => {
                            const imageURL = 'https://image.tmdb.org/t/p/w500';
                            {/* console.log(moviesToDisplay.indexOf(movie)); */}
                            if (moviesToDisplay.indexOf(movie) < 12){
                                return (
                                    <GalleryItems
                                        key={movie.id}
                                        movieTitle={movie.title}
                                        overview={movie.overview}
                                        imagePath={imageURL + movie.poster_path}
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