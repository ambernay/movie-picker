function FindMovieButton({ handleDropdown, arrowClass, tvMovieToggle }) {
    return (
        <button type='button' className="find-movie-button" onClick={handleDropdown} >
            <figure>
                <span className="hover-animation">
                    <h2>Find
                        <span> {tvMovieToggle === 'movie' ? ' Movies' : ' Shows'} </span>
                    </h2>
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className={"ionicon " + arrowClass} viewBox="0 0 512 512"><path d="M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z" /></svg>
                <figcaption className="sr-only">{arrowClass}</figcaption>
            </figure>
        </button>
    )
}

export default FindMovieButton;