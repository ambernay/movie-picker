function GalleryItems({ movieTitle, overview, imagePath, audienceRating }) {

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    return (
        <li>
            <img src={imagePath} alt={movieTitle} />
            <div className="info-container">
                <h3>{movieTitle}</h3>
                <p className="rating">{audienceRating}</p>
            </div>
            <div className="overview">
                <h4>Overview</h4>
                <p>{overview}</p>
            </div>
        </li>
    )
}

export default GalleryItems;