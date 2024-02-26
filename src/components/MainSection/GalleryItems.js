import { useState } from 'react';
import ProviderIcons from './ProviderIcons.js';
import Icons from '../Icons.js';

function GalleryItems({ movieTitle, overview, imagePath, audienceRating, tabIndex }) {

    const [infoState, setInfoState] = useState('overview');

    let imageHeightClass = imagePath === "../assets/icons/tv-outline.svg" ? "placeholder-image" : '';

    let rating = audienceRating > 0 ? audienceRating : "N/A";

    let truncatedTitle = (movieTitle.length > 35) ? (movieTitle.slice(0, 35) + "...") : movieTitle;

    const handleMovieInfo = () => {

        setInfoState('provider-info');

    }

    const handleMouseLeave = () => {
        // resets state to overview on mouseout
        setInfoState('overview');
        // blurs active element to allow hover out
        document.activeElement.blur();
    }

    return (
        // tab index default 0 and -1 when dropdown menu is open
        <li className="galleryItems safari-only" tabIndex={tabIndex} onClick={(e) => { e.stopPropagation() }}>
            <img className={imageHeightClass} src={imagePath} alt={movieTitle} />
            <div className="info-container">
                <h3>{truncatedTitle}</h3>
                <p className="rating">{rating}</p>
            </div>
            <div className='overview' onMouseLeave={handleMouseLeave}>
                <div className={infoState === 'overview' ? 'movie-info' : 'hidden'}>
                    <div className='heading-container' onClick={handleMovieInfo}>
                        <h4>Overview</h4>
                        <figure className="eye-icon">
                            <Icons />
                            <figcaption className="sr-only">Eye icon: where to watch</figcaption>
                        </figure>
                    </div>
                    <p>{overview}</p>
                </div>
                <ProviderIcons
                    infoState={infoState}
                />
            </div>

        </li>
    )
}

export default GalleryItems;