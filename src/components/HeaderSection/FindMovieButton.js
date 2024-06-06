import { UpDownArrowIcon } from '../Icons'

function FindMovieButton({ handleDropdown, arrowClass, tvMovieToggle, currentTranslation, screenSize }) {
    const upArrow = currentTranslation['sr-only'].up_arrow;
    const downArrow = currentTranslation['sr-only'].down_arrow;
    const mediaType = tvMovieToggle === 'movie' ? currentTranslation.movies : currentTranslation.tv_series;
    const fullHeadingLength = (currentTranslation.find + currentTranslation[`${mediaType}`]).length;
   
    const capFirstChar = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <button type='button' className="find-movie-button" onClick={handleDropdown} >
            <span className="hover-animation find-movie-text">
                <h2>{(screenSize === 'midScreen' && fullHeadingLength <= 10) 
                    || (screenSize === 'wideScreen') ? 
                    capFirstChar(currentTranslation.find) 
                    : null}
                    <span> {capFirstChar(mediaType)} </span>
                </h2>
            </span>
            <figure>
                <UpDownArrowIcon
                    arrowClass={arrowClass}
                />
                <figcaption className="sr-only">{arrowClass === 'arrow-up' ? upArrow : downArrow}</figcaption>
            </figure>
        </button>
    )
}

export default FindMovieButton;