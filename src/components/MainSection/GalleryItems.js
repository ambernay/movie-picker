import { useState, useEffect } from 'react';
import MovieInfo from './MovieInfo.js';

function GalleryItems({ movieID, movieTitle, overview, imagePath, audienceRating, tabIndex, tvMovieToggle, currentRegion }) {

    console.log(currentRegion);

    let imageHeightClass = imagePath === "../assets/icons/tv-outline.svg" ? "placeholder-image" : '';

    let rating = audienceRating > 0 ? audienceRating : "N/A";

    let truncatedTitle = (movieTitle.length > 35) ? (movieTitle.slice(0, 35) + "...") : movieTitle;

    // useEffect(() => {
    //     const movieID = 346698;
    //     // there is no way to filter by region (https://www.themoviedb.org/talk/643dbcf75f4b7304e2fe7f2a)

    //     const getMovieStreamingOptions = `https://api.themoviedb.org/3/${tvMovieToggle}/${movieID}/watch/providers?api_key=0a093f521e98a991f4e4cc2a12460255`;

    //     fetch(getMovieStreamingOptions)
    //         .then(results => {
    //             return results.json();
    //         })
    //         .then(data => {
    //             setStreamingOptions(data.results);

    //         }).catch(() => {
    //             alert("Failed to fetch streaming options");
    //         })
    // }, [setStreamingOptions, tvMovieToggle]);

    // console.log(streamingOptions);

    return (
        // tab index default 0 and -1 when dropdown menu is open
        <li className="galleryItems safari-only" tabIndex={tabIndex} onClick={(e) => { e.stopPropagation() }}>
            <img className={imageHeightClass} src={imagePath} alt={movieTitle} />
            <div className="info-container">
                <h3>{truncatedTitle}</h3>
                <p className="rating">{rating}</p>
            </div>
            <MovieInfo
                overview={overview}
                movieID={movieID}
                tvMovieToggle={tvMovieToggle}
                currentRegion={currentRegion}
            />
        </li>
    )
}

export default GalleryItems;