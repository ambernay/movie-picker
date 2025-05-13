import { UpDownArrowIcon } from '../Icons'

function FindMovieButton({ handleDropdown, arrowClass, tvMovieToggle, 
    currentTranslation, screenSize, wasFormButtonClicked }) {
    
    const upArrow = currentTranslation['sr-only'].up_arrow;
    const downArrow = currentTranslation['sr-only'].down_arrow;
    const mediaType = tvMovieToggle === 'movie' ? currentTranslation.movies : currentTranslation.tv_series;
    const buttonHeading = `${currentTranslation.find} ${mediaType}`;
    const fullHeadingLength = buttonHeading.length;
    const animationClass = !JSON.parse(localStorage.getItem('did-open-form')) 
        ? 'fade-bounce' : null;
    
    const capFirstChar = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <button type='button' className= "find-movie-button"
            title={buttonHeading} onClick={handleDropdown} 
        >
            <span className="find-movie-text">
                <h2>{(screenSize === 'midScreen' && fullHeadingLength <= 10) 
                    || (screenSize === 'wideScreen') ? 
                    capFirstChar(currentTranslation.find) 
                    : null}
                    <span> {capFirstChar(mediaType)} </span>
                </h2>
            </span>
            <figure className={animationClass}>
                <UpDownArrowIcon
                    arrowClass={arrowClass}
                />
                <figcaption className="sr-only">{arrowClass === 'arrow-up' ? upArrow : downArrow}</figcaption>
            </figure>
        </button>
    )
}

export default FindMovieButton;