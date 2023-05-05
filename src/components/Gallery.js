function Gallery({ movieData, imagePath }) {
    return (
        <li>
            <img src={imagePath} alt={"alt"} />
            <div className="info-container">
                <h3>{movieData.title}</h3>
            </div>
            <div className="overview">
                <h4>Overview</h4>
                <p>{movieData.overview}</p>
            </div>
        </li>
    )
}

export default Gallery;