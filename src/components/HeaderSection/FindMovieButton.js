import { UpDownArrowIcon } from '../Icons'

function FindMovieButton({ handleDropdown, arrowClass, tvMovieToggle, currentTranslation }) {
    
    const upArrow = currentTranslation['sr-only'].up_arrow;
    const downArrow = currentTranslation['sr-only'].down_arrow;

    const capFirstChar = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
   
    return (
        <button type='button' className="find-movie-button" onClick={handleDropdown} >
            <figure>
                <span className="hover-animation">
                    <h2>
                        <span> {tvMovieToggle === 'movie' ? ` ${capFirstChar(currentTranslation.movies)}` : ` ${capFirstChar(currentTranslation.tv_shows)}`} </span>
                    </h2>
                </span>
                <UpDownArrowIcon
                    arrowClass={arrowClass}
                />
                <figcaption className="sr-only">{arrowClass === 'arrow-up' ? upArrow : downArrow}</figcaption>
            </figure>
        </button>
    )
}

export default FindMovieButton;