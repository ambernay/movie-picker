function Gallery({ movieData}) {
    return (
        <li>
            <img src={movieData.poster_path} alt={"alt"} />
            <h3>{movieData.title}</h3>
            <p>{movieData.overview}</p>
        </li>
    )
}

export default Gallery;