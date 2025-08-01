import { useState, useCallback } from 'react';
import MovieInfoContainer from './MovieInfo/MovieInfoContainer.js';
import { TvOutlineIcon } from '../Icons.js';

// (failed)net::ERR_CERT_COMMON_NAME_INVALID

function GalleryItems({  itemRef, tabIndex, currentRegion, 
    galleryPropsObj, movieInfoObj}) {
        
    const [infoState, setInfoState] = useState('hidden');

    const { id: movieID, title: movieTitle, name: movieName,
        poster_path: posterPath, vote_average: audienceRating } = movieInfoObj

    const imageURL = 'https://image.tmdb.org/t/p/w500';
    /* if image not available, use icon */
    const imagePath = posterPath ? (imageURL + posterPath) : null;
        
    let rating = audienceRating?.toFixed(1) > 0 ? audienceRating?.toFixed(1) : "N/A";
       
    // let truncatedTitle = (movieTitle.length > 35) ? (movieTitle.slice(0, 35) + "...") : movieTitle;

    const handleMouseLeave = () => {
        // blurs active element to allow hover out
        if (document.activeElement !== document.querySelector('.header-region')) { document.activeElement.blur(); }
    }

    // useCallback prevents component from re-rendering
    const ImageComponent = useCallback(() => {
        if (imagePath) {
            return (<img src={imagePath} alt={movieTitle || movieName} />)
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
        <li key={movieID} ref={itemRef} id={movieID} className="gallery-items safari-only" tabIndex={tabIndex} 
        onClick={(e) => { e.stopPropagation(); }} onMouseEnter={() => setInfoState('overview')} 
        onMouseLeave={handleMouseLeave} onBlur={handleMouseLeave} >
            <ImageComponent />
            <div className="info-container">
                <h3>{movieTitle || movieName}</h3>
                <p className="rating">{rating}</p>
            </div>
            <MovieInfoContainer
                galleryPropsObj={galleryPropsObj}
                movieInfoObj={movieInfoObj}
                currentRegion={currentRegion}
                infoState={infoState}
                setInfoState={setInfoState}
            />
        </li>
    )
}

export default GalleryItems;