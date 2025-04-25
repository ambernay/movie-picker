import { useState } from 'react';
import MovieInfo from './MovieInfo/MovieInfo.js';

function GalleryItems({ galleryPropsObj, movieTitle, overview, imagePath, 
    audienceRating, tabIndex, currentRegion }) {

    const [infoState, setInfoState] = useState('hidden');

    let imageHeightClass = imagePath === "../assets/icons/tv-outline.svg" ? "placeholder-image" : '';

    let rating = audienceRating > 0 ? audienceRating : "N/A";

    let truncatedTitle = (movieTitle.length > 35) ? (movieTitle.slice(0, 35) + "...") : movieTitle;

    const handleMouseLeave = () => {
        // blurs active element to allow hover out
        if (document.activeElement !== document.querySelector('.header-region')) { document.activeElement.blur(); }
    }
   
    return (
        // tab index default 0 and -1 when dropdown menu is open
        <li key={galleryPropsObj.movieID} className="gallery-items safari-only" tabIndex={tabIndex} 
        onClick={(e) => { e.stopPropagation(); }} onMouseEnter={() => setInfoState('overview')} 
        onMouseLeave={handleMouseLeave} onBlur={handleMouseLeave}>
            <img className={imageHeightClass} src={imagePath} alt={movieTitle} />
            <div className="info-container">
                <h3>{movieTitle}</h3>
                <p className="rating">{rating}</p>
            </div>
            <MovieInfo
                overview={overview}
                galleryPropsObj={galleryPropsObj}
                currentRegion={currentRegion}
                movieTitle={movieTitle}
                infoState={infoState}
                setInfoState={setInfoState}
            />
        </li>
    )
}

export default GalleryItems;