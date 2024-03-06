import { useState } from 'react';
import MovieInfo from './MovieInfo.js';

function GalleryItems({ movieID, movieTitle, overview, imagePath, audienceRating, tabIndex, tvMovieToggle, currentRegion }) {

    const [infoState, setInfoState] = useState('overview');

    let imageHeightClass = imagePath === "../assets/icons/tv-outline.svg" ? "placeholder-image" : '';

    let rating = audienceRating > 0 ? audienceRating : "N/A";

    let truncatedTitle = (movieTitle.length > 35) ? (movieTitle.slice(0, 35) + "...") : movieTitle;

    const handleMouseLeave = () => {
        // resets state to overview on mouseout
        setInfoState('overview');
        // blurs active element to allow hover out
        document.activeElement.blur();
    }

    return (
        // tab index default 0 and -1 when dropdown menu is open
        <li className="gallery-items safari-only" tabIndex={tabIndex} onClick={(e) => { e.stopPropagation() }} onMouseLeave={handleMouseLeave}>
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
                movieTitle={movieTitle}
                infoState={infoState}
                setInfoState={setInfoState}
            />
        </li>
    )
}

export default GalleryItems;