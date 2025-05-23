import { useState, useCallback } from 'react';
import MovieInfo from './MovieInfo/MovieInfo.js';
import { TvOutlineIcon } from '../Icons.js';

// (failed)net::ERR_CERT_COMMON_NAME_INVALID

function GalleryItems({  itemRef, galleryPropsObj, movieTitle, overview, imagePath, 
    audienceRating, tabIndex, currentRegion }) {

    const [infoState, setInfoState] = useState('hidden');

    let rating = audienceRating > 0 ? audienceRating : "N/A";

    // let truncatedTitle = (movieTitle.length > 35) ? (movieTitle.slice(0, 35) + "...") : movieTitle;

    const handleMouseLeave = () => {
        // blurs active element to allow hover out
        if (document.activeElement !== document.querySelector('.header-region')) { document.activeElement.blur(); }
    }

    // useCallback prevents component from re-rendering
    const ImageComponent = useCallback(() => {
        if (imagePath) {
            return (<img src={imagePath} alt={movieTitle} />)
        }
        else {
            return(
                <figure className='placeholder-image'>
                    <TvOutlineIcon />
                    <figcaption className="sr-only">{galleryPropsObj.currentTranslation['sr-only'].tv_icon}</figcaption>
                </figure>
            )
        }
    },[])
   
    return (
        // tab index default 0 and -1 when dropdown menu is open
        <li key={galleryPropsObj.movieID} ref={itemRef} id={galleryPropsObj.movieID} className="gallery-items safari-only" tabIndex={tabIndex} 
        onClick={(e) => { e.stopPropagation(); }} onMouseEnter={() => setInfoState('overview')} 
        onMouseLeave={handleMouseLeave} onBlur={handleMouseLeave}>
            <ImageComponent />
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