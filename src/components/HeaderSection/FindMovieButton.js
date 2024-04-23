import { UpDownArrowIcon } from '../Icons'

function FindMovieButton({ handleDropdown, arrowClass, tvMovieToggle }) {
    return (
        <button type='button' className="find-movie-button" onClick={handleDropdown} >
            <figure>
                <span className="hover-animation">
                    <h2>Find
                        <span> {tvMovieToggle === 'movie' ? ' Movies' : ' Shows'} </span>
                    </h2>
                </span>
                <UpDownArrowIcon
                    arrowClass={arrowClass}
                />
                <figcaption className="sr-only">{arrowClass}</figcaption>
            </figure>
        </button>
    )
}

export default FindMovieButton;