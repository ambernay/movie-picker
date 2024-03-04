import MovieInfo from './MovieInfo.js';

function GalleryItems({ movieID, movieTitle, overview, imagePath, audienceRating, tabIndex, tvMovieToggle, currentRegion }) {


    let imageHeightClass = imagePath === "../assets/icons/tv-outline.svg" ? "placeholder-image" : '';

    let rating = audienceRating > 0 ? audienceRating : "N/A";

    let truncatedTitle = (movieTitle.length > 35) ? (movieTitle.slice(0, 35) + "...") : movieTitle;

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
                movieTitle={truncatedTitle}
            />
        </li>
    )
}

export default GalleryItems;