function GalleryItems({ movieTitle, overview, imagePath }) {
    return (
        <li>
            <img src={imagePath} alt={"alt"} />
            <div className="info-container">
                <h3>{movieTitle}</h3>
            </div>
            <div className="overview">
                <h4>Overview</h4>
                <p>{overview}</p>
            </div>
        </li>
    )
}

export default GalleryItems;